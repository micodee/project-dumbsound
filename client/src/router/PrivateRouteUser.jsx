import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRouteUser(props) {
  return props.IsRole === "user" ? <Outlet /> : <Navigate to="/" />;
}
