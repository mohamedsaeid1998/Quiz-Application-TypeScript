import { studentLogo } from "@/Assets/Images"
import { letterAnimation, letterAnimationTwo, titleAnimation } from "@/Utils/Helpers/FramerVariables/FramerVariables"
import { motion } from "framer-motion"
import { Eye } from "lucide-react"
import { useState } from "react"

interface IPropsAnimatedName {
  title: string
  openDetailsModel: (_id: string) => void
  _id: string
}

interface IPropsAnimatedWord {
  title: string
  animation: {
    rest: {
      y: number;
    };
    hover: {
      y: number;
      transition?: {
        duration: number;
        ease: number[];
        type: string;
      };
    };
  }
  isHovered: boolean
}


const StudentCard = ({ title, openDetailsModel, _id }: IPropsAnimatedName) => {

  const [isHovered, setIsHovered] = useState(false)
  return <>
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, color: "green" }}
      transition={{ type: "spring", stiffness: 300 }} className="flex items-center justify-between shadow-md p-3 rounded-md">
      <img className='bg-secondColor w-8 rounded-md' src={studentLogo} alt="studentLogo" />
      <div className='relative flex overflow-hidden flex-col '>
        <motion.div

          className='relative overflow-hidden'>
          <AnimatedWord title={title} animation={letterAnimation} isHovered={isHovered} />
          <div className='absolute top-0'>
            <AnimatedWord title={title} animation={letterAnimationTwo} isHovered={isHovered} />
          </div>
        </motion.div>
      </div>
      <Eye onClick={() => openDetailsModel(_id)} className='cursor-pointer' color='green' />
    </motion.div >
  </>
}

export default StudentCard


const AnimatedWord = ({ title, animation, isHovered }: IPropsAnimatedWord) => {
  return <>
    <motion.span
      variants={titleAnimation}
      initial="rest"
      animate={isHovered ? "hover" : "rest"}
      className='relative whitespace-nowrap'>
      {title.split("").map((character, i) =>
        character === " " ?
          <span key={i}>&nbsp;</span>
          : <motion.span
            variants={animation}
            className='relative inline-block whitespace-nowrap'>
            {character}
          </motion.span>
      )}
    </motion.span>
  </>
}
