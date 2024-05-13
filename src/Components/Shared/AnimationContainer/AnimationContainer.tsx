import { opacityAnimation } from '@/Utils/Helpers/FramerVariables/FramerVariables';
import { motion } from 'framer-motion';
interface IProps {
  children: React.ReactNode
}

const AnimationContainer = ({ children }: IProps) => {
  return <>
    <motion.div
      variants={opacityAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ ease: "easeInOut", duration: 0.5 }} >
      {children}
    </motion.div>
  </>
}

export default AnimationContainer