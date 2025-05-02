import { hashValue } from "../../controller/auth.ts";
import { db } from "../connection.ts";

const dropTablesQuery = `
    DROP TABLE IF EXISTS book, borrow, cd, dvd_bluray, owns, periodical, subscription, user, content, support;
`;

db.query(dropTablesQuery, (err, results) => {
  if (err) {
    console.error("Erreur lors de la suppression des tables:", err);
  } else {
    console.log("Tables supprimées avec succès");
    createTables();
  }
});

function createTables() {
  const createUserTableQuery = `
    CREATE TABLE user (
      Id INT AUTO_INCREMENT,
      LastName VARCHAR(50) NOT NULL,
      FirstName VARCHAR(50) NOT NULL,
      Password VARCHAR(100) NOT NULL,
      Birthdate DATE NOT NULL,
      Email VARCHAR(100) NOT NULL,
      PostalCode VARCHAR(50) NOT NULL,
      PostalAddress VARCHAR(50) NOT NULL,
      Phone VARCHAR(10) NOT NULL,
      SchoolArea VARCHAR(50),
      Role ENUM('admin', 'client') DEFAULT 'client',
      PRIMARY KEY(Id),
      UNIQUE(Email),
      UNIQUE(Phone)
    );
  `;

  const createSubscriptionTableQuery = `
    CREATE TABLE subscription (
      Id INT AUTO_INCREMENT,
      Price DECIMAL(15,2) NOT NULL,
      Name VARCHAR(50) NOT NULL,
      PRIMARY KEY(Id),
      UNIQUE(Name)
    );
  `;

  const createSupportTableQuery = `
    CREATE TABLE support (
      Id INT AUTO_INCREMENT,
      Name VARCHAR(50) NOT NULL,
      PRIMARY KEY(Id)
    );
  `;

  const createContentTableQuery = `
    CREATE TABLE content (
      Id INT AUTO_INCREMENT,
      Name VARCHAR(50) NOT NULL,
      PublicationDate DATE NOT NULL,
      Price DECIMAL(15,2) NOT NULL,
      Status VARCHAR(50) NOT NULL,
      SupportId INT NOT NULL,
      CodeBiblio VARCHAR(13) NOT NULL,
      CodeBase VARCHAR(20) NOT NULL,
      UNIQUE(CodeBiblio),
      PRIMARY KEY(Id),
      FOREIGN KEY(SupportId) REFERENCES Support(Id) ON DELETE CASCADE
    );
  `;

  const createCDTableQuery = `
    CREATE TABLE cd (
      Id INT AUTO_INCREMENT,
      TotalDuration INT NOT NULL,
      TrackCount INT NOT NULL,
      Description VARCHAR(255) NOT NULL,
      ContentId INT NOT NULL,
      PRIMARY KEY(Id),
      UNIQUE(ContentId),
      FOREIGN KEY(ContentId) REFERENCES Content(Id) ON DELETE CASCADE
    );
  `;

  const createBookTableQuery = `
    CREATE TABLE book (
      Id INT AUTO_INCREMENT,
      Summary VARCHAR(255) NOT NULL,
      PageCount SMALLINT NOT NULL,
      ContentId INT NOT NULL,
      PRIMARY KEY(Id),
      UNIQUE(ContentId),
      FOREIGN KEY(ContentId) REFERENCES Content(Id) ON DELETE CASCADE
    );
  `;

  const createPeriodicalTableQuery = `
    CREATE TABLE periodical (
      Id INT AUTO_INCREMENT,
      Description VARCHAR(255) NOT NULL,
      Title VARCHAR(50) NOT NULL,
      ContentId INT NOT NULL,
      PRIMARY KEY(Id),
      UNIQUE(ContentId),
      FOREIGN KEY(ContentId) REFERENCES Content(Id) ON DELETE CASCADE
    );
  `;

  const createDVDTableQuery = `
    CREATE TABLE dvd_bluray (
      Id INT AUTO_INCREMENT,
      Duration SMALLINT NOT NULL,
      Format VARCHAR(50) NOT NULL,
      Summary VARCHAR(255) NOT NULL,
      ContentId INT NOT NULL,
      PRIMARY KEY(Id),
      UNIQUE(ContentId),
      FOREIGN KEY(ContentId) REFERENCES Content(Id) ON DELETE CASCADE
    );
  `;

  const createOwnsTableQuery = `
    CREATE TABLE owns (
      UserId INT,
      SubscriptionId INT,
      SubscriptionDate DATE,
      PRIMARY KEY(UserId, SubscriptionId),
      FOREIGN KEY(UserId) REFERENCES User(Id) ON DELETE CASCADE,
      FOREIGN KEY(SubscriptionId) REFERENCES Subscription(Id) ON DELETE CASCADE
    );
  `;

  const createBorrowTableQuery = `
    CREATE TABLE borrow (
      UserId INT,
      ContentId INT,
      BorrowDate DATE,
      Returned BOOLEAN,
      PRIMARY KEY(UserId, ContentId),
      FOREIGN KEY(UserId) REFERENCES User(Id) ON DELETE CASCADE,
      FOREIGN KEY(ContentId) REFERENCES Content(Id) ON DELETE CASCADE
    );
  `;

  const queries = [
    createUserTableQuery,
    createSubscriptionTableQuery,
    createSupportTableQuery,
    createContentTableQuery,
    createCDTableQuery,
    createBookTableQuery,
    createPeriodicalTableQuery,
    createDVDTableQuery,
    createOwnsTableQuery,
    createBorrowTableQuery,
  ];

  queries.forEach((query) => {
    db.query(query, (err, results) => {
      if (err) {
        console.error("Erreur lors de la création des tables:", err);
      } else {
        console.log("Table créée avec succès");
        if (query === createBorrowTableQuery) {
          createDefaultUsers();
        }
      }
    });
  });
}

async function createDefaultUsers() {
  const hasPassword = await hashValue("123456789");

  const adminUserQuery = `
    INSERT INTO user (LastName, FirstName, Password, Birthdate, Email, PostalCode, PostalAddress, Phone, Role)
    VALUES ('Admin', 'Admin', '${hasPassword}', '1990-01-01', 'admin@example.com', '75000', '123 Admin St', '0123456789', 'admin');
  `;

  const clientUserQuery = `
    INSERT INTO user (LastName, FirstName, Password, Birthdate, Email, PostalCode, PostalAddress, Phone, Role)
    VALUES ('Client', 'Client', '${hasPassword}', '1995-01-01', 'client@example.com', '75001', '123 Client St', '0987654321', 'client');
  `;

  const youngUserQuery = `
  INSERT INTO user (LastName, FirstName, Password, Birthdate, Email, PostalCode, PostalAddress, Phone, Role)
  VALUES ('Jeune', 'Vraiment', '${hasPassword}', '2024-01-01', 'young@example.com', '75001', '123 Client St', '0987654324', 'client');
`;

  const localUserQuery = `
   INSERT INTO user (LastName, FirstName, Password, Birthdate, Email, PostalCode, PostalAddress, Phone, Role)
   VALUES ('Montpellierain', 'jsp ecrire', '${hasPassword}', '2024-01-01', 'mpt@example.com', '34000', '123 Client St', '0987654821', 'client');
   `;

  const studentUserQuery = `
   INSERT INTO user (LastName, FirstName, Password, Birthdate, Email, PostalCode, PostalAddress, Phone, Role, SchoolArea)
   VALUES ('etudiant', 'Bac-1', '${hasPassword}', '2010-01-01', 'student@example.com', '58950', '123 Client St', '0287654321', 'client', '34000');
   `;

  const supportQuery = `INSERT INTO support (Id, Name) VALUES (1,'CD'), (2,'DVD'), (3,'livre'), (4,'periodique');`;

  const subscriptionQuery = `INSERT INTO subscription (Id, Price, Name) VALUES (1, 10.50, 'Mensuel' ),(2, 22, 'Annuel');`;

  const queries = [adminUserQuery, clientUserQuery, youngUserQuery, localUserQuery, studentUserQuery, subscriptionQuery, supportQuery];

  queries.forEach((query) => {
    db.query(query, (err, results) => {
      if (err) {
        console.error("Erreur lors de la création des utilisateurs par défaut:", err);
      } else {
        console.log("Utilisateur par défaut créé avec succès");
        if (query === supportQuery) {
          process.exit(0);
        }
      }
    });
  });
}
