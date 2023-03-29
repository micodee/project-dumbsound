import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRouteAdmin(props) {
  return props.IsRole === "admin" ? <Outlet /> : <Navigate to="/" />;
}
