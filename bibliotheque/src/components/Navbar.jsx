import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { sessionState } from "../states/session_state";

const Navbar = () => {
  const session = sessionState((state) => state.session);

  let navItems = [
    { icon: "fas fa-tachometer-alt", label: "Accueil", path: "/" },
    { icon: "far fa-address-book", label: "Catalogue", path: "/catalog" },
    { icon: "far fa-calendar-alt", label: "Services", path: "/service" },
    { icon: "far fa-chart-bar", label: "À propos", path: "/about" },
  ];

  const verifSession = () => {
    if (session) {
      if (session.role === "admin") {
        return (navItems = [
          ...navItems,
          { icon: "far fa-chart-bar", label: "Mon compte", path: "/dashboard" },
          { icon: "far fa-chart-bar", label: "Créer un compte", path: "/register" },
          { icon: "far fa-chart-bar", label: "Gerer les abonné", path: "/aboAdmin" },
        ]);
      }
      return (navItems = [...navItems, { icon: "far fa-chart-bar", label: "Mon compte", path: "/dashboard" }]);
    } else {
      return (navItems = [...navItems, { icon: "far fa-calendar-alt", label: "Connecxion", path: "/login" }]);
    }
  };

  const pathName = window.location.pathname;
  const initialItem = navItems.findIndex((item) => item.path === pathName);
  const [activeItem, setActiveItem] = useState(initialItem);

  verifSession();
  useEffect(() => {
    const handleResize = () => {
      adjustSelector();
    };

    window.addEventListener("resize", handleResize);
    adjustSelector();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeItem, pathName]);

  const adjustSelector = () => {
    if (activeItem !== null) {
      const activeElement = document.querySelector(`.nav-item.active`);
      if (activeElement) {
        const parentRect = activeElement.offsetParent.getBoundingClientRect();
        const { top, left, height, width } = activeElement.getBoundingClientRect();
        const selector = document.querySelector(".hori-selector");
        selector.style.top = `${top - parentRect.top}px`;
        selector.style.left = `${left - parentRect.left}px`;
        selector.style.height = `${height}px`;
        selector.style.width = `${width}px`;
      }
    }
  };

  const handleItemClick = (index) => {
    setActiveItem(index);
    adjustSelector();
  };

  const handleToggleClick = () => {
    const collapse = document.querySelector(".navbar-collapse");
    collapse.classList.toggle("show");
    adjustSelector();
  };

  return (
    <nav className="navbar navbar-expand-custom navbar-mainbg">
      <a className="navbar-brand navbar-logo" href="#">
        Bibliotheque de Montpellier
      </a>
      <button
        className="navbar-toggler"
        type="button"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={handleToggleClick}
      >
        <i className="fas fa-bars text-white"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <div className="hori-selector">
            <div className="left"></div>
            <div className="right"></div>
          </div>
          {navItems.map((item, id) => (
            <li className={`nav-item ${activeItem === id ? "active" : ""}`} key={item.label} onClick={() => handleItemClick(id)}>
              <Link className="nav-link" to={item.path}>
                <i className={item.icon}></i>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
