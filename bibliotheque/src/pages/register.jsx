import React, { useState } from "react";
import "../styles/sign.css";

function Register() {
  const [data, setData] = useState();

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = JSON.stringify(data);

    await fetch("http://localhost:3000/register", {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: payload,
    });
  };

  return (
    <div className="container">
      <h1>Création d'un compte</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nom">Nom</label>
        <input onChange={handleChange} type="text" id="nom" name="nom" />

        <label htmlFor="prenom">Prénom</label>
        <input onChange={handleChange} type="text" id="prenom" name="prenom" />

        <label htmlFor="naissance">Date de naissance</label>
        <input onChange={handleChange} type="date" id="naissance" name="naissance" />

        <label htmlFor="adressePostale">Adresse Postale</label>
        <input onChange={handleChange} type="text" id="adressePostale" name="adressePostale" />

        <label htmlFor="codePostal">Code Postal</label>
        <input onChange={handleChange} type="text" id="codePostal" name="codePostal" />

        <label htmlFor="telephone">Numéro de téléphone</label>
        <input onChange={handleChange} type="tel" id="telephone" name="telephone" />

        <label htmlFor="aggloEcole">Agglomération école</label>
        <input onChange={handleChange} type="text" id="aggloEcole" name="aggloEcole" />

        <label htmlFor="email">Email</label>
        <input onChange={handleChange} type="email" id="email" name="email" />

        <label htmlFor="password">Mot de passe</label>
        <input onChange={handleChange} type="password" id="password" name="password" />

        <label htmlFor="confirmPassword">Vérification mot de passe</label>
        <input onChange={handleChange} type="password" id="confirmPassword" name="confirmPassword" />

        <button type="submit">Créer votre compte</button>
      </form>
    </div>
  );
}

export default Register;
