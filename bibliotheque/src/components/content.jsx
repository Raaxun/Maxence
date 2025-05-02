import React from "react";
import { sessionState } from "../states/session_state";

const Content = ({ values, setData }) => {
  const session = sessionState((state) => state.session);

  function handleReservation(contentId) {
    fetch("http://localhost:3000/emprunt", {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contentId: contentId,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        setData((prev) => {
          return prev.filter((item) => item.Id !== contentId);
        });
        alert(data);
      });
  }

  function destroyCatalog(contentId) {
    fetch(`http://localhost:3000/deleteCatalog/${contentId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        setData((prev) => {
          return prev.filter((item) => item.Id !== contentId);
        });
        alert(data);
      });
  }

  return (
    <li key={values.Id}>
      <p>Nom : {values.Name}</p>
      <span>Prix : {values.Price} €</span>
      <div>Date de publication {new Date(values.PublicationDate).toLocaleDateString()}</div>
      <p>Type : {values.supportName}</p>
      <p>Etat général : {values.Status}</p>
      {session?.isAbonne ? (
        <>
          <p>Etat : {values.Status}</p>
          <button onClick={() => handleReservation(values.Id)}>Louer</button>
        </>
      ) : null}
      {session.role === "admin" ? (
        <>
          <button onClick={() => destroyCatalog(values.Id)}>Supprimer</button>
        </>
      ) : null}
    </li>
  );
};

export default Content;
