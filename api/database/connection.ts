import mysql from "mysql2";
import dotenv from 'dotenv';
dotenv.config();

interface ConnectionOptions {
  host: string;
  user: string;
  port: number;
  password: string;
  database: string;
}

// Utiliser les variables d'environnement pour créer les options de connexion
const connectionOptions: ConnectionOptions = {
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  port: parseInt(process.env.DB_PORT!, 10),
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_DATABASE!,
};


// Créer la connexion
export const db = mysql.createConnection({
  ...connectionOptions,
  keepAliveInitialDelay: 10000,
  enableKeepAlive: true
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
  } else {
    console.log("Connecté à la base de données");
  }
});

db.on('error', (e) => {
  console.log("Erreur de base de données:", e);
});
