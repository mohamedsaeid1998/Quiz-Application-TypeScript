import { AuthBackground, Button } from '@/Components'
import { AuthInput, ConfirmPasswordInput, PasswordInput } from '@/Components/Shared/AuthInputs/AuthInputs'
import { IFormResetPass } from '@/InterFaces/AuthInterFaces'
import { useResetPasswordMutation } from '@/Redux/Services/Authentication/AuthSlice'
import { renderErrors } from '@/Utils/Helpers/ErrorMessage/ErrorMessage'
import { emailValidation, otpValidation, passRegValidation } from '@/Utils/Validation'
import { Check, KeyRound, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import './ResetPassword.module.scss'
import transition from '@/Utils/Helpers/Transition/transition'
interface IProps {

}

const ResetPassword = ({ }: IProps) => {

  const [submitResetPass, { isLoading }] = useResetPasswordMutation()
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<IFormResetPass>()
  const navigate = useNavigate()

  const handleResetPass = async (data: IFormResetPass) => {
    const response = await submitResetPass(data)
    if ('data' in response && response.data.message === "Record updated successfully") {
      navigate('/')
    }
  }

  return <>
    <AuthBackground header={"Reset Password"}>
      <form onSubmit={handleSubmit(handleResetPass)}>

        <AuthInput className='mt-3'  {...register("email", emailValidation)} lable='Your email address' type='email' placeholder='Type your email' icon={<Mail />} />
        {renderErrors(errors?.email?.message)}

        <AuthInput className='mt-3' {...register("otp", otpValidation)} lable='Type your otp' type='text' placeholder='Type your OTP' icon={<Mail />} />
        {renderErrors(errors?.otp?.message)}

        <PasswordInput className='mt-3' {...register("password", passRegValidation)} lable='Password' type='password' placeholder='Type your password' icon={<KeyRound />} />
        {renderErrors(errors?.password?.message)}

        <ConfirmPasswordInput className='mt-3'  {...register("confirmPassword", {
          required: "Confirm Password is required!!",
          validate: (value) =>
            value === getValues("password") || "password is don't match"
        })} lable='Confirm Password' type='password' placeholder='Type your Confirm Password' icon={<KeyRound />} />
        {renderErrors(errors?.confirmPassword?.message)}

        <div className='flex flex-col space-y-5 sm:space-y-0 sm:flex-row  justify-between items-center mt-5'>

          <Button isLoading={isLoading} rounded={'lg'} className='gap-3 group'>Reset <Check className='bg-black group-hover:bg-white rounded-full p-1 text-2xl text-white group-hover:text-black transition duration-200' size={20} strokeWidth={5} /></Button>

          <span>Login ? <Link to={'/'} className='text-mainColor underline'>click here</Link> </span>
        </div>

      </form>
    </AuthBackground>
  </>
}

export default ResetPassword 
