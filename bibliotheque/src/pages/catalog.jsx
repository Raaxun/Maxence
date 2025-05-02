import { useEffect, useState } from "react";
import styles from "../styles/forms.module.css";
import Content from "../components/content";

function Catalog() {
  const [data, setData] = useState([]);

  useEffect(() => {
    void fetch("http://localhost:3000/catalog", {
      credentials: "include",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        <ul className={styles.wrapper}>
          {data.map((values) => (
            <Content key={values.Id} values={values} setData={setData} />
          ))}
        </ul>
      ) : (
        <p>Pas de contenus</p>
      )}
    </div>
  );
}

export default Catalog;
