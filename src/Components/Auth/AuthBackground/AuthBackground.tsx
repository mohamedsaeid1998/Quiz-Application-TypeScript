import { UserPlus, UserRound } from 'lucide-react';
import './AuthBackground.module.scss'
import { Link, useLocation } from 'react-router-dom';
import { authBackground } from '@/Assets/Images';
import { motion } from 'framer-motion';
import { opacityAnimation } from '@/Utils/Helpers/FramerVariables/FramerVariables';

interface IProps {
  header: String
  children: React.ReactNode
}

const AuthBackground = ({ header, children }: IProps) => {
  const { pathname } = useLocation()

  return <>
    <main
      className='bg-mainBg text-white min-h-screen p-5 sm:p-8 flex justify-between space-x-10'>
      <motion.div
        variants={opacityAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className='leftContent w-[100%] md:w-[50%] h-full'>
        <h1 className='text-5xl'>QuizWiz</h1>
        <div className='m-auto justify-center items-center '>
          <p className='pt-8 pb-8 text-mainColor text-3xl font-bold'>{header}</p>
          {pathname === "/" || pathname === "/register" ? <div className='flex space-x-12 mb-6'>
            <Link to={"/"} className={`flex flex-col justify-center items-center w-44 h-32 font-bold bg-subBg  rounded-2xl ${pathname === "/" ? "border-[6px] border-mainColor" : ""}`}>
              <UserRound size={65} color={`${pathname === "/" ? "#C5D86D" : "white"}`} />
              Sign in
            </Link>
            <Link to={"/register"} className={`flex flex-col justify-center items-center w-44 h-32 font-bold bg-subBg rounded-2xl ${pathname === "/register" ? "border-[6px] border-mainColor" : ""}`}>
              <UserPlus size={65} color={`${pathname === "/register" ? "#C5D86D" : "white"}`} style={{ marginLeft: "15px" }} />
              Sign up
            </Link>

          </div>
            :
            ""}

          {children}
        </div>
      </motion.div>

      <div className="hidden md:flex rightContent w-[50%] relative bg-secondColor rounded-3xl justify-center   ">
        <img className=' absolute inset-0 w-full h-full p-12 ' src={authBackground} alt="authBackground" />
      </div>

    </main>
  </>
}

export default AuthBackground