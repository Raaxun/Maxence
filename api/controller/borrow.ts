import type { Request, Response } from "express";
import { db } from "../database/connection.ts";
import { verifAbonnement } from "./abonnement.ts";

export function borrowController() {
  function getDatePlus14Days() {
    const currentDate = new Date(); // Obtenez la date actuelle
    const futureDate = new Date(currentDate); // Créez une copie de la date actuelle
    futureDate.setDate(currentDate.getDate() + 14); // Ajoutez 14 jours
    return futureDate;
  }

  async function reservation(req: Request, res: Response) {
    const session = req.session;
    const body = req.body;

    const isAbonne = (await verifAbonnement(session.user)) as boolean | Date;
    let date: Date = new Date();

    if (typeof isAbonne === "object") {
      if ((isAbonne as Date) > getDatePlus14Days()) {
        date = getDatePlus14Days();
      } else {
        date = isAbonne;
      }
    } else if (isAbonne === true) {
      date = getDatePlus14Days();
    } else {
      res.status(400).send("Achat non autorisé");
    }

    db.query("INSERT INTO borrow(UserId, ContentId, BorrowDate) VALUES (?, ?, ?)", [session.user?.id, body.contentId, date], (err, rows) => {
      if (err) {
        console.log(err);

        res.status(500).send("Erreur lors de l'emprunt");
      } else {
        res.status(200).send("Emprunt effectué avec succès");
      }
    });
  }

  function getBorrowedContent(req: Request, res: Response) {
    const session = req.session.user;
    db.query(
      `SELECT *, support.Name AS SupportName 
      FROM borrow 
      INNER JOIN content ON borrow.ContentId = content.Id 
      INNER JOIN support ON content.SupportId = support.Id 
      WHERE borrow.UserId = ?`,
      [session.id],
      (err, rows: any) => {
        if (err) {
          res.status(500).send("Erreur lors de la récupération des contenus empruntés");
        } else {
          res.status(200).json(rows);
        }
      }
    );
  }

  function deleteBorrowedContent(req: Request, res: Response) {
    const session = req.session.user;
    const contentId = req.params.id;

    db.query("UPDATE borrow SET Returned = 1 WHERE ContentId = " + contentId, [session.id, contentId], (err) => {
      if (err) {
        res.status(500).send("Erreur lors de la suppression de l'emprunt");
      } else {
        res.status(200).send("Emprunt rendus avec succès");
      }
    });
  }

  function getReturnedBorrowedContent(req: Request, res: Response) {
    const session = req.session.user;
    db.query(
      `SELECT *, support.Name AS SupportName
      FROM borrow
      INNER JOIN content ON borrow.ContentId = content.Id
      INNER JOIN support ON content.SupportId = support.Id
      AND borrow.Returned = 1`,
      [session.id],
      (err, rows: any) => {
        if (err) {
          res.status(500).send("Erreur lors de la récupération des contenus empruntés");
        } else {
          res.status(200).json(rows);
        }
      }
    );
  }

  function updateReturnedBorrowedContent(req: Request, res: Response) {
    const body = req.body as {
      etat: string;
      id: number;
    };

    db.query("UPDATE content SET Status = ? WHERE Id = ?", [body.etat, body.id], (err) => {
      if (err) {
        res.status(500).send("Erreur lors de la suppression de l'emprunt");
      } else {
        db.query("DELETE FROM borrow WHERE `ContentId` = ?", [body.id], (err, rows) => {
          if (err) {
            res.status(500).send("Erreur lors de la suppression de l'emprunt");
          } else {
            res.status(200).send("Emprunt rendus avec succès");
          }
        });
      }
    });
  }

  return {
    reservation,
    getBorrowedContent,
    updateReturnedBorrowedContent,
    deleteBorrowedContent,
    getReturnedBorrowedContent,
  };
}
