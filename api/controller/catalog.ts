import type { Request, Response } from "express";
import {
  verifCD,
  verifDVD,
  verifLivre,
  verifPeriodique,
} from "../validator/catalogu_validator.ts";
import type {
  CdPayload,
  DVDPayload,
  LivrePayload,
  PeriodiquePayload,
} from "../validator/catalogu_validator.ts";
import { db } from "../database/connection.ts";
import { verifAbonnement } from "./abonnement.ts";

export function catalogController() {
  function cd(req: Request, res: Response) {
    const body = req.body as CdPayload;

    try {
      verifCD({ ...body });
      const SupportId = 1; //car les CD auront l'ID 1

      db.query(
        "INSERT INTO content (Name, PublicationDate, Price, Status, SupportId, CodeBiblio, CodeBase) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          body.nomCD,
          body.dateCD,
          body.priceCD,
          body.etatCD,
          SupportId,
          body.codeBarreBiblioCD,
          body.codeBarreBaseCD,
        ],
        (err, insert: any) => {
          //probleme avec contentId qui est auto increment je ne sais pas comment typer insertId
          if (err) {
            if (err.code == "ER_DUP_ENTRY") {
              res.status(400).send("Le code biblio existe deja");
              return;
            } else {
              res.status(400).send("Erreur lors de l'insertion dans Content");
              return;
            }
          }
          const contentId = insert.insertId;

          db.query(
            "INSERT INTO cd (TotalDuration, TrackCount, Description, ContentId) VALUES (?, ?, ?, ?)",
            [body.dureeCD, body.nbPisteCD, body.describCD, contentId],
            (err, response) => {
              if (err) {
                res.status(400).send("Erreur lors de l'insertion dans CD");
                return;
              }

              res.status(200).send("CD inséré avec succès");
            }
          );
        }
      );
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  function dvdBluray(req: Request, res: Response) {
    const body = req.body as DVDPayload;

    try {
      verifDVD({ ...body });
      const SupportId = 2; //car les DVD auront l'ID 2

      db.query(
        "INSERT INTO content (Name, PublicationDate, Price, Status, SupportId, CodeBiblio, CodeBase) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          body.nomDVD,
          body.dateDVD,
          body.priceDVD,
          body.etatDVD,
          SupportId,
          body.codeBarreBiblioDVD,
          body.codeBarreBaseDVD,
        ],
        (err, insert: any) => {
          if (err) {
            if (err.code == "ER_DUP_ENTRY") {
              res.status(400).send("Le code biblio existe deja");
              return;
            } else {
              res.status(400).send("Erreur lors de l'insertion dans Content");
              return;
            }
          }
          const contentId = insert.insertId;

          db.query(
            "INSERT INTO dvd_bluray (Duration, Format, Summary, ContentId) VALUES (?, ?, ?, ?)",
            [body.dureeDVD, body.formatDVD, body.resumeDVD, contentId],
            (err, response) => {
              if (err) {
                res
                  .status(400)
                  .send("Erreur lors de l'insertion dans dvdBluray");
                return;
              }
              res.status(200).send("dvdBluray inséré avec succès");
            }
          );
        }
      );
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  function livre(req: Request, res: Response) {
    const body = req.body as LivrePayload;

    try {
      verifLivre({ ...body });
      const SupportId = 3; //car les livre auront l'ID 3

      db.query(
        "INSERT INTO content (Name, PublicationDate, Price, Status, SupportId, CodeBiblio, CodeBase) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          body.nomLivre,
          body.dateLivre,
          body.priceLivre,
          body.etatLivre,
          SupportId,
          body.codeBarreBiblioLivre,
          body.codeBarreBaseLivre,
        ],
        (err, insert: any) => {
          if (err) {
            if (err.code == "ER_DUP_ENTRY") {
              res.status(400).send("Le code biblio existe deja");
              return;
            } else {
              res.status(400).send("Erreur lors de l'insertion dans Content");
              return;
            }
          }
          const contentId = insert.insertId;

          db.query(
            "INSERT INTO book (PageCount, Summary, ContentId) VALUES (?, ?, ?)",
            [body.nbPageLivre, body.resumeLivre, contentId],
            (err, response) => {
              if (err) {
                res.status(400).send("Erreur lors de l'insertion dans livre");
                return;
              }
              res.status(200).send("livre inséré avec succès");
            }
          );
        }
      );
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  function periodique(req: Request, res: Response) {
    const body = req.body as PeriodiquePayload;

    try {
      verifPeriodique({ ...body });
      const SupportId = 4; //car les periodique auront l'ID 4

      db.query(
        "INSERT INTO content (Name, PublicationDate, Price, Status, SupportId, CodeBiblio, CodeBase) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          body.nomPeriodique,
          body.datePeriodique,
          body.pricePeriodique,
          body.etatPeriodique,
          SupportId,
          body.codeBarreBiblioPeriodique,
          body.codeBarreBasePeriodique,
        ],
        (err, insert: any) => {
          if (err) {
            if (err.code == "ER_DUP_ENTRY") {
              res.status(400).send("Le code biblio existe deja");
              return;
            } else {
              res.status(400).send("Erreur lors de l'insertion dans Content");
              return;
            }
          }
          const contentId = insert.insertId;

          db.query(
            "INSERT INTO periodical (Title, Description, ContentId) VALUES (?, ?, ?)",
            [body.titrePeriodique, body.resumePeriodique, contentId],
            (err, response) => {
              if (err) {
                res
                  .status(400)
                  .send("Erreur lors de l'insertion dans periodique");
                return;
              }
              res.status(200).send("periodique inséré avec succès");
            }
          );
        }
      );
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  function getall(req: Request, res: Response) {
    try {
      db.query(
        "SELECT content.*, support.Name AS supportName FROM content INNER JOIN support ON content.SupportId = support.Id LEFT JOIN borrow ON content.Id = borrow.ContentId WHERE borrow.ContentId IS NULL",
        (err, rows: any) => {
          if (err) {
            res.status(500).send("Erreur affichage catalogye");
            return;
          }
          if (rows.length === 0) {
            res.status(404).send("Aucun contenu trouvé");
            return;
          }

          res.status(200).json(rows);
        }
      );
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  function deleteCatalog(req: Request, res: Response) {
    const contentId = req.params.id; 
  
    try {
      db.query(
        "DELETE FROM `content` WHERE `id` = ?",
        [contentId],
        (err, rows: any) => {
          if (err) {
            res.status(400).send("Erreur lors de la suppression du contenu");
            return;
          }
          res.status(200).send("Suppression reussis");
        }
      );
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  return {
    cd,
    dvdBluray,
    livre,
    periodique,
    getall,
    deleteCatalog,
  };
}
