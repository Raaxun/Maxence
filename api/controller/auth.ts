import type { Request, Response } from "express";
import { verifLogin, verifRegister } from "../validator/auth_validator.ts";
import { db } from "../database/connection.ts";
import type { RegsterPayload } from "../validator/auth_validator.ts";
import bcrypt from "bcrypt";
import { verifAbonnement } from "./abonnement.ts";

export const hashValue = async (str: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(str, salt);
  return hash;
};
export const authController = () => {
  const verifyHashValue = async (str: string, hashed: string): Promise<boolean> => {
    const verif = await bcrypt.compare(str, hashed);
    return verif;
  };

  async function regsiter(req: Request, res: Response) {
    const body = req.body as RegsterPayload;

    try {
      verifRegister({ ...body });
      const hashedPassword = await hashValue(body.password);

      db.query(
        "INSERT INTO User (LastName, FirstName, Password, Birthdate, Email, PostalCode, PostalAddress, Phone, SchoolArea) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [body.nom, body.prenom, hashedPassword, body.naissance, body.email, body.codePostal, body.adressePostale, body.telephone, body.aggloEcole],
        (err, res) => {
          console.log(err);

          if (err?.code === "ER_DUP_ENTRY") {
            throw new Error("Email existe deja");
          }
        }
      );
    } catch (e) {
      if (e instanceof Error) {
        res.status(400).send(e.message);
      } else {
        res.status(500).send("Erreur serveur");
      }
    }
  }

  async function login(req: Request, res: Response) {
    try {
      const { email, password } = verifLogin(req.body.email, req.body.password);
      db.query("SELECT Id, Email, Role, Password FROM User WHERE email = ?", [email], async (err, rows: any) => {
        if (err || rows.length === 0) {
          return res.status(401).send("Mauvaise email");
        } else {
          let payload = rows[0];

          const isSamePassword = await verifyHashValue(password, payload.Password);

          if (!isSamePassword) {
            return res.status(401).send("Mauvaise mot de passe");
          }

          const isAbonne = !!(await verifAbonnement({
            email: payload.Email,
            role: payload.Role,
            id: payload.Id,
          }));
          const data = {
            email: payload.Email,
            role: payload.Role,
            id: payload.Id,
            isAbonne,
          };

          req.session.user = data

          res.status(200).send(data);
        }
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  function logout(req: Request, res: Response) {
    if (!req.session.user) {
      res.status(401).send("Not logged in").redirect("/login");
    } else {
      req.session.destroy(() => {});
      res!.status(200).redirect("/login");
    }
  }

  function session(req: Request, res: Response) {
    if (req.session.user) {
      res.status(200).json(req.session.user);
    }
  }

  return { regsiter, login, logout, session };
};
