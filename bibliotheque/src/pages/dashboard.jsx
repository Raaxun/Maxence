import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/logout";
import { sessionState } from "../states/session_state";
import AddCatalog from "../components/addCatalog";
import Abonnement from "../components/abonnement";
import styles from "../styles/dashboard.module.css";
import ReturnedBorrow from "../components/returned_borrow";

const Dashboard = () => {
  const setSession = sessionState((state) => state.setSession);
  const session = sessionState((state) => state.session);

  const navigate = useNavigate();

  return (
    <main className={styles.wrapper}>
      <h1>Dashboard</h1>
      <button onClick={() => logout(navigate, setSession)}>Se deconecter</button>

      <div className={styles.profile}>
        {session?.role == "admin" ? (
          <>
            <ReturnedBorrow />
            <AddCatalog />
          </>
        ) : (
          <Abonnement isAbonne={session?.isAbonne} />
        )}
      </div>
    </main>
  );
};

export default Dashboard;
