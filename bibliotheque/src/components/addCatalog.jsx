import React, { useEffect, useState } from "react";
import AddCD from "./form/addCD";
import AddDVD from "./form/addDvdBluRay";
import AddLivre from "./form/addLivre";
import AddPeriodique from "./form/addPeriodique";
import styles from "../styles/add_catalog.module.css";

const AddCatalog = () => {
  const [label, setLabel] = useState("CD");

  const [data, setData] = useState();

  function handleSubmit(e, href) {
    e.preventDefault();

    void fetch(`http://localhost:3000${href}`, {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
      });
  }

  useEffect(() => {
    setData([]);
  }, [label]);

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const choiceCatalog = [
    {
      component: <AddCD handleChange={handleChange} handleSubmit={handleSubmit} />,
      label: "CD",
    },
    {
      component: <AddDVD handleChange={handleChange} handleSubmit={handleSubmit} />,
      label: "DVD",
    },
    {
      component: <AddLivre handleChange={handleChange} handleSubmit={handleSubmit} />,
      label: "Livre",
    },
    {
      component: <AddPeriodique handleChange={handleChange} handleSubmit={handleSubmit} />,
      label: "Periodique",
    },
  ];

  const handleClick = (value) => {
    setLabel(value);
  };

  return (
    <div className={styles.wrapper}>
      <p>Ajouter :</p>
      <ul className="navbar-nav">
        {choiceCatalog.map((value) => {
          return (
            <li key={value.label}>
              <button className={value.label === label ? "active" : ""} onClick={() => handleClick(value.label)}>
                {value.label}
              </button>
            </li>
          );
        })}
      </ul>

      <div className={styles.form_container}>
        {choiceCatalog.map((value) => {
          return label == value.label ? value.component : null;
        })}
      </div>
    </div>
  );
};

export default AddCatalog;
