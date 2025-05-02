import React from "react";
import { useNavigate } from "react-router-dom";
import { sessionState } from "../states/session_state";
import "../styles/sign.css"

function Login() {
  const navigate = useNavigate();
  const setSession = sessionState((state) => state.setSession);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response;
    let body;

    if (!data.ok) {
      body = await data.text();
      alert(body);
    } else {
      body = await data.json();
      setSession(body);
      navigate("/dashboard");
    }
  };
  return (
    <div className="container">
      <h1>Connexion à un compte</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
