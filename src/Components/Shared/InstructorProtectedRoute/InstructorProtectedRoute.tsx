import CookieServices from "@/Services/CookieServices/CookieServices";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: React.ReactNode
}

const InstructorProtectedRoute = ({ children }: IProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    const userRole = CookieServices.get("role").role;
    if (userRole === "Student") {
      navigate(-1);
    }
  }, [navigate]);

  return children;
};

export default InstructorProtectedRoute;