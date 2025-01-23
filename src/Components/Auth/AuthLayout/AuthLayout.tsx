import { AnimatePresence } from "framer-motion";
import { Outlet, useNavigate } from "react-router-dom";
import "./AuthLayout.module.scss";
import { useEffect, useState } from "react";
import CookieServices from "@/Services/CookieServices/CookieServices";
import { Loader } from "lucide-react";

const AuthLayout = () => {
  const navigate = useNavigate();
//@ts-ignore
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = CookieServices.get("token");
    if (token) return true;
    return false;
  });

  useEffect(() => {
    if (isAuthenticated && CookieServices.get("role").role === "Instructor") {
      navigate("/dashboard/home");
    } else if (
      isAuthenticated &&
      CookieServices.get("role").role === "Student"
    ) {
      navigate("/dashboard/quiz");
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated && (
        <div className="w-screen h-screen flex items-center justify-center">
          <Loader className="animate-spin" size={200} color="#C5D86D" />
        </div>
      )}
      {!isAuthenticated && (
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      )}
    </>
  );
};

export default AuthLayout;
