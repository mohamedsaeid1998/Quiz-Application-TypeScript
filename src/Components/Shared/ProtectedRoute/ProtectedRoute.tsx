
import "./ProtectedRoute.module.scss";
import { Navigate } from "react-router-dom";
import CookieServices from "@/Services/CookieServices/CookieServices";

interface prop {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: prop) => {
  if (!CookieServices.get("token")) {
    return <Navigate to='/' />
  } else {
    return children;
  }
};

export default ProtectedRoute;
