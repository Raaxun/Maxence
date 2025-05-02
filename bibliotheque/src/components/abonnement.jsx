import React, { useEffect } from "react";
import styles from "../styles/dashboard.module.css";

const Abonnement = ({ isAbonne }) => {
  const [borrows, setBorrows] = React.useState([]);

  function createSubscription(str) {
    void fetch("http://localhost:3000/subscription", {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: str }),
    })
      .then((r) => r.text())
      .then((data) => {
        alert(data);
      });
  }

  useEffect(() => {
    fetch("http://localhost:3000/borrow", {
      credentials: "include",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setBorrows(data);
      });
  }, []);

  function handleReturn(contentId) {
    fetch("http://localhost:3000/borrow/" + contentId, {
      method: "DELETE",
      credentials: "include",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.text())
      .then((data) => {
        alert(data);
        setBorrows((prev) => {
          return prev.filter((item) => item.ContentId !== contentId);
        });
      });
  }

  return isAbonne ? (
    <div className={styles.abonnement}>
      <p>Vous êtes abonné</p>

      {borrows.length > 0 ? (
        <ul className="borrowed">
          {borrows.map((borrow) =>
            borrow.Returned ? null : (
              <li key={borrow.Id}>
                <p>Nome : {borrow.Name}</p>
                <p>Etat : {borrow.Status}</p>
                <span>Prix : {borrow.Price}</span>
                <p>à rendre le : {new Date(borrow.BorrowDate).toLocaleDateString()}</p>
                <button onClick={() => handleReturn(borrow.ContentId)}>Rendre le {borrow.SupportName}</button>
              </li>
            )
          )}
        </ul>
      ) : (
        <p>Vous n'avez pas d'emprunts en cours</p>
      )}
    </div>
  ) : (
    <>
      <div>Voulez vous vous aboonez ?</div>
      <button onClick={() => createSubscription("mensuel")}>Mensuel</button>
      <button onClick={() => createSubscription("annuel")}>Annuel</button>
    </>
  );
};

export default Abonnement;
