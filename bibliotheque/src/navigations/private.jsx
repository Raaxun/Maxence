import { Navigate, Outlet } from "react-router-dom";
import { sessionState } from "../states/session_state";

const PrivateRoute = () => {
  const session = sessionState((state) => state.session);

  if (session === false) return <Navigate to="/login" />;
  return session !== null ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
