//@ts-nocheck
import { Button } from "@/Components";
import { IFormChangePass } from "@/InterFaces/AuthInterFaces";
import { useChangePasswordMutation } from "@/Redux/Services/Authentication/AuthSlice";
import CookieServices from "@/Services/CookieServices/CookieServices";
import { renderErrors } from "@/Utils/Helpers/ErrorMessage/ErrorMessage";
import { passRegValidation } from "@/Utils/Validation";
import {
  Check,
  FileText,
  GraduationCap,
  Home,
  LayoutList,
  LockKeyholeOpen,
  LogOut,
  MessageCircleQuestion,
  Plus,
  Users2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ConfirmPasswordInput, PasswordInput } from "../AuthInputs/AuthInputs";
import { AddModel } from "../Models/Models";
import useToggle from "@/Hooks/useToggle";
import { useEffect } from "react";

interface IProps {
  active: boolean;
  toggleActive: () => void;
}

const ToggleMenu = ({ active, toggleActive }: IProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    trigger,
  } = useForm<IFormChangePass>({ mode: "onChange" });

  const navigate = useNavigate();
  const logout = () => {
    CookieServices.remove("role");
    CookieServices.remove("token");
    navigate("/");
  };

  const [isOpen, toggle] = useToggle();

  function openModal() {
    toggle(true);
  }

  function closeModal() {
    toggle(false);
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

  const InstructorMenu = [
    {
      color: { "--i": 0, "--clr": "#ff2972" },
      path: "/dashboard/home",
      icon: <Users2 className={` ${active ? "z-20" : "hidden"}`} />,
    },
    {
      color: { "--i": 1, "--clr": "#fee800" },
      path: "/dashboard/groups",
      icon: <Home className={` ${active ? "z-20" : "hidden"}`} />,
    },
    {
      color: { "--i": 2, "--clr": "#04fc43" },
      path: "/dashboard/student",
      icon: <GraduationCap className={` ${active ? "z-20" : "hidden"}`} />,
    },
    {
      color: { "--i": 3, "--clr": "#fe00f1" },
      path: "/dashboard/quiz",
      icon: <LayoutList className={` ${active ? "z-20" : "hidden"}`} />,
    },
    {
      color: { "--i": 4, "--clr": "#00b0fe" },
      path: "/dashboard/questions",
      icon: (
        <MessageCircleQuestion className={` ${active ? "z-20" : "hidden"} `} />
      ),
    },
    {
      color: { "--i": 5, "--clr": "#fea600" },
      path: "/dashboard/results",
      icon: <FileText className={` ${active ? "z-20" : "hidden"}`} />,
    },
    {
      color: { "--i": 6, "--clr": "#a529ff" },
      path: "#",
      icon: <LockKeyholeOpen className={` ${active ? "z-20" : "hidden"}`} />,
      onClick: openModal,
    },
    {
      color: { "--i": 7, "--clr": "#01bdab" },
      path: "#",
      icon: <LogOut className={` ${active ? "z-20" : "hidden"}`} />,
      onClick: logout,
    },
  ];

  const StudentMenu = [
    {
      color: { "--i": 0, "--clr": "#00b0fe" },
      path: "/dashboard/quiz",
      icon: (
        <MessageCircleQuestion className={` ${active ? "z-20" : "hidden"} `} />
      ),
    },
    {
      color: { "--i": 2, "--clr": "#fea600" },
      path: "/dashboard/results",
      icon: <FileText className={` ${active ? "z-20" : "hidden"}`} />,
    },
    {
      color: { "--i": 4, "--clr": "#a529ff" },
      path: "#",
      icon: <LockKeyholeOpen className={` ${active ? "z-20" : "hidden"}`} />,
      onClick: openModal,
    },
    {
      color: { "--i": 6, "--clr": "#01bdab" },
      path: "#",
      icon: <LogOut className={` ${active ? "z-20" : "hidden"}`} />,
      onClick: logout,
    },
  ];
  useEffect(() => {
    if (watch("confirmPassword")) trigger("confirmPassword");
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
                  : "password is don't match",
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

      <ul className={`menu  ${active ? "active" : ""} `}>
        <div onClick={toggleActive} className="menuToggle">
          <Plus />
        </div>

        {CookieServices.get("role").role === "Instructor" ? (
          <>
            {InstructorMenu.map(({ color, path, icon, onClick }, idx) => (
              <li key={idx} style={color}>
                <Link onClick={onClick} to={path}>
                  {icon}
                </Link>
              </li>
            ))}
          </>
        ) : (
          <>
            {StudentMenu?.map(({ color, path, icon, onClick }, idx) => (
              <li key={idx} style={color}>
                <Link onClick={onClick} to={path}>
                  {icon}
                </Link>
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default ToggleMenu;
