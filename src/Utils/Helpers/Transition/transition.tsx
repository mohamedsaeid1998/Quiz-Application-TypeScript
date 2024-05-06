//@ts-nocheck
import { motion } from "framer-motion"

const transition = (OgComponent) => {
  const opacityAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 0 },
    exit: { opacity: 1 }
  }
  const RotateAnimation = {
    initial: { rotateY: 90 },
    animate: { rotateY: 0 },
    exit: { rotateY: -90 }
  }
  const ScaleAnimation = {
    initial: { scale: 0.7 },
    animate: { scale: 1 },
    exit: { scale: 0.7 }
  }
  const WidthAnimation = {
    initial: { width: 0 },
    animate: { width: "100%" },
    exit: { width: "100%", x: window.innerWidth }
  }

  return () => (
    <>
      <OgComponent />
      < motion.div
        className="slide-in"
        variants={opacityAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ ease: "easeInOut", duration: 0.5 }}
      // initial={{ scaleY: 0 }}
      // animate={{ scaleY: 0 }}
      // exit={{ scaleY: 1 }}
      // transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* < motion.div
        className="slide-out"
        // variants={opacityAnimation}
        // initial="initial"
        // animate="animate"
        // exit="exit"
        // initial={{ opacity: 1 }}
        // animate={{ opacity: 0 }}
        // exit={{ opacity: 0 }}
        // transition={{ ease: "easeInOut", duration: 0.5 }}
      // initial={{ scaleY: 1 }}
      // animate={{ scaleY: 0 }}
      // exit={{ scaleY: 0 }}
      // transition={{ delay:0.3,duration: 1, ease: [0.22, 1, 0.36, 1] }}
      /> */}
    </>
  )
}

export default transition;