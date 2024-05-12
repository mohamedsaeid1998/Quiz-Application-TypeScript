import { Button } from "@/Components";
import { IFormChangePass } from "@/InterFaces/AuthInterFaces";
import { useChangePasswordMutation } from "@/Redux/Services/Authentication/AuthSlice";
import CookieServices from "@/Services/CookieServices/CookieServices";
import { renderErrors } from "@/Utils/Helpers/ErrorMessage/ErrorMessage";
import { passRegValidation } from "@/Utils/Validation";
import { Check, FileText, GraduationCap, Home, KeyRound, LayoutList, Menu as List, LockKeyholeOpen, LogOut, MessageCircleQuestion, Users2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ConfirmPasswordInput, PasswordInput } from "../AuthInputs/AuthInputs";
import { AddModel } from "../Models/Models";
import { motion } from "framer-motion";

interface IProps {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
  isSidebarOpen: boolean
}

interface IMenu {
  style: string
  path?: React.ReactElement;
  icon: React.ReactNode
  body: string
  onClick?: () => void
}

export default function SideBar({ isSidebarOpen, setSidebarOpen }: IProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm<IFormChangePass>()

  const [iscollapsed, setIscollapsed] = useState(false)

  const { pathname } = useLocation()
  const handleToggle = () => {
    setIscollapsed(!iscollapsed)
    setSidebarOpen(!isSidebarOpen)
  }

  const navigate = useNavigate()
  const logout = () => {
    CookieServices.remove("role")
    CookieServices.remove("token")
    navigate('/')
  }

  const [isOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const [submitChange, { isLoading }] = useChangePasswordMutation()

  const handleChangePassword = async (data: IFormChangePass) => {
    const response = await submitChange(data)
    if ('data' in response && response.data.message === "Record updated successfully") {
      reset()
      closeModal()
    }
  }

  const sidebarInstructorItems: IMenu[] = [
    { style: `${pathname === "/dashboard/home" ? 'bg-secondColor ' : ""} border-b border-black  link`, path: <Link to="/dashboard/home" />, icon: <Users2 size={'35px'} className="bg-secondColor p-1" />, body: "dashboard" },
    { style: `${pathname === "/dashboard/groups" ? 'bg-secondColor' : ""} border-b border-black  link`, path: <Link to='/dashboard/groups' />, icon: <Home size={'35px'} className="bg-secondColor p-1" />, body: "groups" },
    { style: `${pathname === "/dashboard/student" ? 'bg-secondColor' : ""} border-b border-black  link`, path: <Link to='/dashboard/student' />, icon: <GraduationCap size={'35px'} className="bg-secondColor p-1" />, body: "students" },
    { style: `${pathname?.includes("quiz") ? 'bg-secondColor' : ""} border-b border-black  link`, path: <Link to='/dashboard/quiz' />, icon: <LayoutList size={'35px'} className="bg-secondColor p-1" />, body: "quizzes" },
    { style: `${pathname === "/dashboard/questions" ? 'bg-secondColor' : ""} border-b border-black  link`, path: <Link to='/dashboard/questions' />, icon: <MessageCircleQuestion size={'35px'} className="bg-secondColor p-1" />, body: "questions" },
    { style: `${pathname?.includes("results") ? 'bg-secondColor' : ""} border-b border-black  link`, path: <Link to='/dashboard/results' />, icon: <FileText size={'35px'} className="bg-secondColor p-1" />, body: "results" },
    { style: `border-b border-black link`, icon: <LockKeyholeOpen size={'35px'} className="bg-secondColor p-1" />, body: "changePassword", onClick: openModal },
    { style: `border-b border-black link`, icon: <LogOut size={'35px'} className="bg-secondColor p-1" />, body: "logout", onClick: logout },
  ]

  const sidebarStudentItems: IMenu[] = [
    { style: `${pathname?.includes("quiz") || pathname?.includes("exam") ? 'bg-secondColor' : ""} border-b border-black  link`, path: <Link to='/dashboard/quiz' />, icon: <LayoutList size={'35px'} className="bg-secondColor p-1" />, body: "quizzes" },
    { style: `${pathname === "/dashboard/results" ? 'bg-secondColor' : ""} border-b border-black  link`, path: <Link to='/dashboard/results' />, icon: <FileText size={'35px'} className="bg-secondColor p-1" />, body: "results" },
    { style: `border-b border-black link`, icon: <LockKeyholeOpen size={'35px'} className="bg-secondColor p-1" />, body: "changePassword", onClick: openModal },
    { style: `border-b border-black link`, icon: <LogOut size={'35px'} className="bg-secondColor p-1" />, body: "logout", onClick: logout },
  ]

  const MotionMenuItems = motion(MenuItem)

  return (
    <>
      <AddModel title="Change Password"  {...{ setIsOpen, isOpen, closeModal }}>
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <PasswordInput containerStyle='border-2 border-black text-black' textColor="text-black" {...register("password", passRegValidation)} lable='Old Password' placeholder='Type your old password' icon={<KeyRound color="black" />} />
          {renderErrors(errors?.password?.message)}

          <ConfirmPasswordInput containerStyle='border-2 border-black' textColor="text-black" {...register("password_new", { required: "New Password is required!!" })} lable='New Password' placeholder='Type your new password' icon={< KeyRound color="black" />} />
          {renderErrors(errors?.password_new?.message)}

          <ConfirmPasswordInput containerStyle='border-2 border-black' textColor="text-black" {...register("confirmPassword", {
            required: "Confirm New Password is required!!",
            validate: (value) =>
              value === getValues("password_new") || "password is don't match"
          })} lable='Confirm New Password' placeholder='Type your confirm new password' icon={<KeyRound color="black" />} />
          {renderErrors(errors?.confirmPassword?.message)}
          <div className="flex justify-center">
            <Button isLoading={isLoading} rounded={'lg'} className='gap-2 mt-4' variant={"ghost"}>Change<Check className='rounded-full p-1 text-2xl ' size={22} strokeWidth={5} /></Button>
          </div>

        </form>
      </AddModel>
      <Sidebar collapsed={iscollapsed} className='h-screen side fixed hidden lg:block'>
        <Menu  >
          <MenuItem className='border-b border-black h-16' onClick={handleToggle} icon={<List size={'30px'} />} ></MenuItem>

          {CookieServices.get("role").role === "Instructor" ? <>
            {sidebarInstructorItems?.map(({ style, path, icon, body, onClick }: IMenu, idx) => <MotionMenuItems whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }} key={idx} className={`${style}`} onClick={onClick} component={path} icon={icon} >{t(body)}</MotionMenuItems>)}
          </> :
            <>
              {sidebarStudentItems?.map(({ style, path, icon, body, onClick }: IMenu, idx) => <MotionMenuItems whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} key={idx} className={`${style}`} onClick={onClick} component={path} icon={icon} >{t(body)}</MotionMenuItems>)}
            </>
          }

        </Menu>
      </Sidebar >
    </>
  );
}
