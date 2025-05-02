import React, { useEffect } from "react";
import Navbar from "./Navbar.jsx";
import Search from "./search.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./footer.jsx";
import { sessionState } from "../states/session_state.jsx";
import { getSession } from "../services/get_session.jsx";

const Layout = () => {
  const setSession = sessionState((state) => state.setSession);

  useEffect(() => {
    getSession()
      .then((data) => {
        setSession(data);
      })
      .catch((e) => {
        setSession(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Search />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
