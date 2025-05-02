import { useEffect, useState } from "react";
import styles from "../styles/forms.module.css";
import User from "../components/user";

function AboAdmin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    void fetch("http://localhost:3000/aboAdmin", {
      credentials: "include",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      });
  }, []);

  return (
    <div>
      {users.length > 0 ? (
        <ul className={styles.wrapper}>
          {users.map((user) => (
            <User key={user.Id} user={user} setUsers={setUsers} />
          ))}
        </ul>
      ) : (
        <p>Pas d'utilisateurs</p>
      )}
    </div>
  );
}

export default AboAdmin;
