import React from "react";
import { sessionState } from "../states/session_state";

const User = ({ user, setUsers }) => {
  const session = sessionState((state) => state.session);

  function handleDeleteUser(userId) {
    fetch(`http://localhost:3000/deleteUser/${userId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        setUsers((prevUsers) => prevUsers.filter((item) => item.Id !== userId));
        alert(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
      });
  }

  return (
    <li key={user.Id}>
      <p>Nom : {user.LastName}</p>
      <p>Prénom : {user.FirstName}</p>
      <p>Date de naissance : {new Date(user.Birthdate).toLocaleDateString()}</p>
      <p>Email : {user.Email}</p>
      <p>Code postal : {user.PostalCode}</p>
      <p>Adresse postale : {user.PostalAddress}</p>
      <p>Téléphone : {user.Phone}</p>
      <p>Zone scolaire : {user.SchoolArea}</p>
      <p>Rôle : {user.Role}</p>
      {session?.isAbonne && <p>Statut : {user.Status}</p>}
      {session.role === "admin" && (
        <button onClick={() => handleDeleteUser(user.Id)}>Supprimer</button>
      )}
    </li>
  );
};

export default User;
