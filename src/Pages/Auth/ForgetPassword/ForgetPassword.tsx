import { AuthBackground, Button } from '@/Components'
import { AuthInput } from '@/Components/Shared/AuthInputs/AuthInputs'
import { IFormForget } from '@/InterFaces/AuthInterFaces'
import { useForgetMutation } from '@/Redux/Services/Authentication/AuthSlice'
import { renderErrors } from '@/Utils/Helpers/ErrorMessage/ErrorMessage'
import { emailValidation } from '@/Utils/Validation'
import { Check, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import './ForgetPassword.module.scss'

const ForgetPassword = () => {

  const [submitForget, { isLoading }] = useForgetMutation()
  const { register, handleSubmit, formState: { errors } } = useForm<IFormForget>()
  const navigate = useNavigate()

  const handleForget = async (data: IFormForget) => {
    const response = await submitForget(data);
    if ('data' in response && response.data.message === "Reset password email sent") {
      navigate('/reset-password')
    }
  }

  return <>
    <AuthBackground header={"Forget Password"}>
      <form onSubmit={handleSubmit(handleForget)}>
        <AuthInput  {...register("email", emailValidation)} className='mt-12' lable='Email address' type='email' placeholder='Type your email' icon={<Mail />} />
        {renderErrors(errors?.email?.message)}

        <Button isLoading={isLoading} rounded={"lg"} className='gap-3 mt-14 group' >Send email  <Check className='bg-black group-hover:bg-white rounded-full p-1 text-2xl text-white group-hover:text-black transition duration-200' size={20} strokeWidth={5} /></Button>
        <span className='block text-end mt-20'>Login ? <Link to={'/'} className='text-mainColor underline'>click here</Link> </span>
      </form>
    </AuthBackground>
  </>
}

export default ForgetPassword