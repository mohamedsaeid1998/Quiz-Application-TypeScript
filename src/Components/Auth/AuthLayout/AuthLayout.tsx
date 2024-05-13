import { AnimatePresence } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import './AuthLayout.module.scss'

const AuthLayout = () => {

  return <>
    <AnimatePresence mode='wait' >
      <Outlet />
    </AnimatePresence>
  </>
}

export default AuthLayout