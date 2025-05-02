import { authController } from "./controller/auth.ts";
import type { Express } from "express";
import { catalogController } from "./controller/catalog.ts";
import { abonnementController } from "./controller/abonnement.ts";
import { borrowController } from "./controller/borrow.ts";

export default function (app: Express) {
  app.post("/login", authController().login);

  app.post("/register", authController().regsiter);

  app.get("/logout", authController().logout);

  app.post("/session", authController().session);

  app.post("/cd", catalogController().cd);

  app.post("/dvdBluray", catalogController().dvdBluray);

  app.post("/livre", catalogController().livre);

  app.post("/periodique", catalogController().periodique);

  app.get("/isAbonne", abonnementController().getAbonement);

  app.post("/subscription", abonnementController().createSubscription);

  app.get("/catalog", catalogController().getall);

  app.post("/emprunt", borrowController().reservation);

  app.get("/borrow", borrowController().getBorrowedContent);

  app.delete("/borrow/:id", borrowController().deleteBorrowedContent);

  app.get("/returned_borrow", borrowController().getReturnedBorrowedContent);

  app.put("/returned_borrow", borrowController().updateReturnedBorrowedContent);

  app.get("/aboAdmin",abonnementController().getAllAbo);

  app.delete("/deleteCatalog/:id", catalogController().deleteCatalog);

  app.delete("/deleteUser/:id", abonnementController().deleteAbo);



  //marche pas

  
  // app.delete("/delete",abonnementController().deleteAbonne);

  // app.get("/putAbonne",abonnementController().getAbonne);

  // app.put("/putAbonne",abonnementController().updateAbonne);

  
}
