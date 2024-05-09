import { AuthBackground, Button, TestCode } from '@/Components'
import { AuthInput, PasswordInput } from '@/Components/Shared/AuthInputs/AuthInputs'
import { IFormLogin } from '@/InterFaces/AuthInterFaces'
import { useLoginMutation } from '@/Redux/Services/Authentication/AuthSlice'
import { renderErrors } from '@/Utils/Helpers/ErrorMessage/ErrorMessage'
import { emailValidation, passLoginValidation } from '@/Utils/Validation'
import { Check, KeyRound, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import './Login.module.scss'
import CookieServices from '@/Services/CookieServices/CookieServices'

const Login = () => {

  const [submitLogin, { isLoading }] = useLoginMutation()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormLogin>()
  const navigate = useNavigate()

  const handleLogin = async (data: IFormLogin) => {
    const response = await submitLogin(data);
    if ('data' in response && response.data.message === "Login Success") {
      CookieServices.get("role").role === "Instructor" ? navigate('/dashboard/home') : navigate('/dashboard/quiz')
    }
  }

  return <>
    <AuthBackground header={"Continue your learning journey with QuizWiz !"}>
      <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col '>

        <AuthInput {...register("email", emailValidation)} lable='Registered email address' type='email' placeholder='Type your email' icon={<Mail />} />
        {renderErrors(errors?.email?.message)}

        <PasswordInput className='mt-3' {...register("password", passLoginValidation)} lable='Password' placeholder='Type your password' icon={<KeyRound />} />
        {renderErrors(errors?.password?.message)}

        <div className='flex flex-col space-y-5 sm:space-y-0 sm:flex-row  justify-between items-center mt-5 '>

          <Button isLoading={isLoading} rounded={'lg'} className='gap-3 group '>Sign in <Check className='bg-black group-hover:bg-white rounded-full p-1 text-2xl text-white group-hover:text-black transition duration-200' size={20} strokeWidth={5} /></Button>

          <span>Forgot password ? <Link to={'./forget-password'} className='text-mainColor underline'>click here</Link> </span>

        </div>

      </form>
      <TestCode {...{ setValue }} />
    </AuthBackground >
  </>
}

export default Login
