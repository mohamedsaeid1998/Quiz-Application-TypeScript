import { Button } from "@/Components";
import useToggle from "@/Hooks/useToggle";
import { IFormChangePass } from "@/InterFaces/AuthInterFaces";
import { useChangePasswordMutation } from "@/Redux/Services/Authentication/AuthSlice";
import CookieServices from "@/Services/CookieServices/CookieServices";
import { renderErrors } from "@/Utils/Helpers/ErrorMessage/ErrorMessage";
import { passRegValidation } from "@/Utils/Validation";
import { motion } from "framer-motion";
import {
  Check,
  FileText,
  GraduationCap,
  Home,
  LayoutList,
  Menu as List,
  LockKeyholeOpen,
  LogOut,
  MessageCircleQuestion,
  Users2,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ConfirmPasswordInput, PasswordInput } from "../AuthInputs/AuthInputs";
import { AddModel } from "../Models/Models";

interface IProps {
  toggleSidebar: () => void;
}

interface IMenu {
  style: string;
  path?: React.ReactElement;
  icon: React.ReactNode;
  body: string;
  onClick?: () => void;
}

export default function SideBar({ toggleSidebar }: IProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    trigger,
  } = useForm<IFormChangePass>();

  const [iscollapsed, toggleCollapsed] = useToggle();

  const { pathname } = useLocation();
  const handleToggle = () => {
    toggleCollapsed();
    toggleSidebar();
  };

  const navigate = useNavigate();
  const logout = () => {
    CookieServices.remove("role");
    CookieServices.remove("token");
    navigate("/");
  };

  const [isOpen, toggle] = useToggle();

  function openModal() {
    toggle();
  }

  function closeModal() {
    toggle();
  }

  const [submitChange, { isLoading }] = useChangePasswordMutation();

  const handleChangePassword = async (data: IFormChangePass) => {

    const response = await submitChange(data);
    if (
      "data" in response &&
      response.data.message === "Record updated successfully"
    ) {
      reset();
      closeModal();
    }
  };

  const sidebarInstructorItems: IMenu[] = [
    {
      style: `${
        pathname === "/dashboard/home" ? "bg-secondColor " : ""
      } border-b border-black  link`,
      path: <Link to="/dashboard/home" />,
      icon: <Users2 size={"35px"} className="bg-secondColor p-1" />,
      body: "dashboard",
    },
    {
      style: `${
        pathname === "/dashboard/groups" ? "bg-secondColor" : ""
      } border-b border-black  link`,
      path: <Link to="/dashboard/groups" />,
      icon: <Home size={"35px"} className="bg-secondColor p-1" />,
      body: "groups",
    },
    {
      style: `${
        pathname === "/dashboard/student" ? "bg-secondColor" : ""
      } border-b border-black  link`,
      path: <Link to="/dashboard/student" />,
      icon: <GraduationCap size={"35px"} className="bg-secondColor p-1" />,
      body: "students",
    },
    {
      style: `${
        pathname?.includes("quiz") ? "bg-secondColor" : ""
      } border-b border-black  link`,
      path: <Link to="/dashboard/quiz" />,
      icon: <LayoutList size={"35px"} className="bg-secondColor p-1" />,
      body: "quizzes",
    },
    {
      style: `${
        pathname === "/dashboard/questions" ? "bg-secondColor" : ""
      } border-b border-black  link`,
      path: <Link to="/dashboard/questions" />,
      icon: (
        <MessageCircleQuestion size={"35px"} className="bg-secondColor p-1" />
      ),
      body: "questions",
    },
    {
      style: `${
        pathname?.includes("results") ? "bg-secondColor" : ""
      } border-b border-black  link`,
      path: <Link to="/dashboard/results" />,
      icon: <FileText size={"35px"} className="bg-secondColor p-1" />,
      body: "results",
    },
    {
      style: `border-b border-black link`,
      icon: <LockKeyholeOpen size={"35px"} className="bg-secondColor p-1" />,
      body: "changePassword",
      onClick: openModal,
    },
    {
      style: `border-b border-black link`,
      icon: <LogOut size={"35px"} className="bg-secondColor p-1" />,
      body: "logout",
      onClick: logout,
    },
  ];

  const sidebarStudentItems: IMenu[] = [
    {
      style: `${
        pathname?.includes("quiz") || pathname?.includes("exam")
          ? "bg-secondColor"
          : ""
      } border-b border-black  link`,
      path: <Link to="/dashboard/quiz" />,
      icon: <LayoutList size={"35px"} className="bg-secondColor p-1" />,
      body: "quizzes",
    },
    {
      style: `${
        pathname === "/dashboard/results" ? "bg-secondColor" : ""
      } border-b border-black  link`,
      path: <Link to="/dashboard/results" />,
      icon: <FileText size={"35px"} className="bg-secondColor p-1" />,
      body: "results",
    },
    {
      style: `border-b border-black link`,
      icon: <LockKeyholeOpen size={"35px"} className="bg-secondColor p-1" />,
      body: "changePassword",
      onClick: openModal,
    },
    {
      style: `border-b border-black link`,
      icon: <LogOut size={"35px"} className="bg-secondColor p-1" />,
      body: "logout",
      onClick: logout,
    },
  ];

  const MotionMenuItems = motion(MenuItem);

  useEffect(() => {
    if (watch("confirmPassword")) {
      trigger("confirmPassword");
    }
  }, [watch("password_new")]);
  return (
    <>
      <AddModel title="Change Password" {...{ isOpen, closeModal }}>
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <PasswordInput
            containerStyle="border-2 border-black text-black"
            slotProps={{
              inputProps: { className: "text-black" },
              lableProps: { className: "text-black mt-3" },
              iconProps: { className: "text-black" },
            }}
            {...register("password", passRegValidation)}
            lable="Old Password"
            placeholder="Type your old password"
          />
          {renderErrors(errors?.password?.message)}

          <ConfirmPasswordInput
            containerStyle="border-2 border-black"
            slotProps={{
              inputProps: { className: "text-black" },
              lableProps: { className: "text-black mt-3" },
              iconProps: { className: "text-black" },
            }}
            {...register("password_new", {
              required: "New Password is required!!",
            })}
            lable="New Password"
            placeholder="Type your new password"
          />
          {renderErrors(errors?.password_new?.message)}

          <ConfirmPasswordInput
            containerStyle="border-2 border-black"
            slotProps={{
              inputProps: { className: "text-black" },
              lableProps: { className: "text-black mt-3" },
              iconProps: { className: "text-black" },
            }}
            {...register("confirmPassword", {
              required: "Confirm New Password is required!!",
              validate: (value) =>
                value === watch("password_new")
                  ? true
                  : "Passwords do not match!!",
            })}
            lable="Confirm New Password"
            placeholder="Type your confirm new password"
          />
          {renderErrors(errors?.confirmPassword?.message)}
          <div className="flex justify-center">
            <Button
              isLoading={isLoading}
              rounded={"lg"}
              className="gap-2 mt-4"
              variant={"ghost"}
            >
              Change
              <Check
                className="rounded-full p-1 text-2xl "
                size={22}
                strokeWidth={5}
              />
            </Button>
          </div>
        </form>
      </AddModel>
      <Sidebar
        collapsed={iscollapsed}
        className="h-screen side fixed hidden lg:block"
      >
        <Menu>
          <MenuItem
            className="border-b border-black h-16"
            onClick={handleToggle}
            icon={<List size={"30px"} />}
          ></MenuItem>

          {CookieServices.get("role").role === "Instructor" ? (
            <>
              {sidebarInstructorItems?.map(
                ({ style, path, icon, body, onClick }: IMenu, idx) => (
                  <MotionMenuItems
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    key={idx}
                    className={`${style}`}
                    onClick={onClick}
                    component={path}
                    icon={icon}
                  >
                    {t(body)}
                  </MotionMenuItems>
                )
              )}
            </>
          ) : (
            <>
              {sidebarStudentItems?.map(
                ({ style, path, icon, body, onClick }: IMenu, idx) => (
                  <MotionMenuItems
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    key={idx}
                    className={`${style}`}
                    onClick={onClick}
                    component={path}
                    icon={icon}
                  >
                    {t(body)}
                  </MotionMenuItems>
                )
              )}
            </>
          )}
        </Menu>
      </Sidebar>
    </>
  );
}
