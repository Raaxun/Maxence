import type { Request, Response } from "express";
import { db } from "../database/connection.ts";

export async function verifAbonnement(session:any) {
  const verif = new Promise((resolve, reject) => {
    return db.query(
      "SELECT Birthdate, SchoolArea, PostalCode FROM user WHERE id = ?",
      [session.id],
      (err, rows) => {
        if (err) {
          reject("Erreur lors de la connexion");
        }

        const data = rows[0];

        const today = new Date();
        const birthDate = new Date(data.Birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (
          age <= 12 ||
          (age <= 18 && data.SchoolArea === "34000") ||
          data.PostalCode === "34000"
        ) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  });
  const responseVerif = await verif;

  const isAbonne = new Promise((resolve, reject) => {
    !responseVerif
      ? db.query(
          "SELECT * FROM owns WHERE UserId = ?",
          [session.id],
          (err, rows: any) => {
            if (err || rows.length === 0) {
              resolve(false);
            } else {
              if (new Date(rows[0].SubscriptionDate) < new Date()) {
                resolve(false);
              } else {
                resolve(new Date(rows[0].SubscriptionDate));
              }
            }
          }
        )
      : resolve(true);
  });

  return await isAbonne;
}


export function abonnementController() {
  
  async function getAbonement(req: Request, res: Response) {
    const session = req.session.user;
    try {
      const isAbonne = !!(await verifAbonnement(session));
      
      res.status(200).json({ isAbonne });
    } catch (e) {
      res.status(400).send("erreur");
    }
  }

  function createSubscription(req: Request, res: Response) {
    const body = req.body.data as "mensuel" | "annuel";
    const session = req.session.user;
    const subscription = body == "annuel" ? 2 : 1;
    try {
      if (body === "annuel" || body === "mensuel") {
        const date = new Date();
        subscription === 1
          ? date.setMonth(new Date().getMonth() + 1)
          : date.setFullYear(new Date().getFullYear() + 1);

        db.query(
          "INSERT INTO owns (UserId, SubscriptionId, SubscriptionDate) VALUES (?, ?, ?)",
          [session.id, subscription, date],
          (err, rows: any) => {
            if (err) {
              res.status(500).send("erreur");
            } else {
              res.status(200).send(`Abonement ${body} réussit`);
            }
          }
        );
      } else {
        res.status(500).send("erreur");
      }
    } catch (error) {
      res.status(500).send("erreur");
    }
  }

  function getAllAbo(req: Request, res: Response) {
    try {
      db.query(
        "SELECT `Id`, `LastName`, `FirstName`, `Birthdate`, `Email`, `PostalCode`, `PostalAddress`, `Phone`, `SchoolArea`, `Role` FROM `user` WHERE 1",
        (err, rows: any) => {
          if (err) {
            res.status(500).send("Erreur affichage abo");
            return;
          }
          if (rows.length === 0) {
            res.status(404).send("Aucun abonner trouvé");
            return;
          }

          res.status(200).json(rows);
        }
      );
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  function getAbonne(req: Request, res: Response) {
    const session = req.session.user;
  
    db.query(
      `SELECT Id, LastName, FirstName, Password, Birthdate, Email, PostalCode, PostalAddress, Phone, SchoolArea, Role
       FROM users
       WHERE userId = ?`, // Remplacez 'users' par le nom de votre table utilisateurs
      [session.id],
      (err, rows: any) => {
        if (err) {
          console.error("Erreur lors de la récupération des utilisateurs:", err);
          res.status(500).send("Erreur lors de la récupération des utilisateurs");
        } else {
          res.status(200).json(rows);
        }
      }
    );
  }

    //marche pas

  function deleteAbo(req: Request, res: Response) {
    const contentId = req.params.id; 
  
    try {
      db.query(
        "DELETE FROM `user` WHERE `id` = ?",
        [contentId],
        (err, rows: any) => {
          if (err) {
            res.status(400).send("Erreur lors de la suppression du compte");
            return;
          }
          res.status(200).send("Suppression reussis");
        }
      );
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  interface UserData {
    Id: number;
    LastName: string;
    FirstName: string;
    Password: string;
    Birthdate: string;
    Email: string;
    PostalCode: string;
    PostalAddress: string;
    Phone: string;
    SchoolArea: string;
    Role: string;
  }
  
  function updateAbonne(req: Request, res: Response) {
    const body = req.body as UserData;
  
    // Vérifiez que tous les champs nécessaires sont présents
    if (!body.Id || !body.LastName || !body.FirstName || !body.Email || !body.Role) {
      return res.status(400).send("Données incomplètes");
    }
  
    db.query(
      `UPDATE users
       SET LastName = ?, FirstName = ?, Password = ?, Birthdate = ?, Email = ?, PostalCode = ?, PostalAddress = ?, Phone = ?, SchoolArea = ?, Role = ?
       WHERE Id = ?`,
      [body.LastName, body.FirstName, body.Password, body.Birthdate, body.Email, body.PostalCode, body.PostalAddress, body.Phone, body.SchoolArea, body.Role, body.Id],
      (err) => {
        if (err) {
          console.error("Erreur lors de la mise à jour de l'utilisateur:", err);
          res.status(500).send("Erreur lors de la mise à jour de l'utilisateur");
        } else {
          res.status(200).send("Utilisateur mis à jour avec succès");
        }
      }
    );
  }

  return { getAbonement, createSubscription, getAllAbo, deleteAbo, getAbonne, updateAbonne };
}
