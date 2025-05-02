import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout.jsx";
import Homepage from "./pages/homepage.jsx";
import Login from "./pages/login.jsx";
import Catalog from "./pages/catalog.jsx";
import About from "./pages/about.jsx";
import Service from "./pages/service.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Register from "./pages/register.jsx";
import PrivateRoute from "./navigations/private.jsx";
import AboAdmin from "./pages/aboAdmin.jsx";

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route element={<PrivateRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/aboAdmin" element={<AboAdmin />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
