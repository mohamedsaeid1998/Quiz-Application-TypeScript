import { AuthBackground, Button } from '@/Components'
import { AuthInput, PasswordInput, SelectInput } from '@/Components/Shared/AuthInputs/AuthInputs'
import { IFormRegister } from '@/InterFaces/AuthInterFaces'
import { useRegisterMutation } from '@/Redux/Services/Authentication/AuthSlice'
import { renderErrors } from '@/Utils/Helpers/ErrorMessage/ErrorMessage'
import { emailValidation, fieldValidation, passRegValidation } from '@/Utils/Validation'
import { BookUser, Check, KeyRound, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './Register.module.scss'

const Register = () => {
  const [submitRegister, { isLoading }] = useRegisterMutation()
  const { register, handleSubmit, formState: { errors } } = useForm<IFormRegister>()
  const navigate = useNavigate()

  const handleRegister = async (data: IFormRegister) => {
    const response = await submitRegister(data)
    if ('data' in response && response.data.message === "Record created successfully") {
      navigate('/')
    }
  }

  return <>
    <AuthBackground header={"Create your account and start using QuizWiz !"}>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className='flex flex-col items-center w-full lg:flex-row lg:space-x-5'>

          <div className='w-full'>
            <AuthInput className='w-full' {...register("first_name", fieldValidation)} lable='Your first name' type='text' placeholder='Type your first name' icon={<BookUser />} />
            {renderErrors(errors?.first_name?.message)}
          </div>

          <div className='w-full mt-3 lg:mt-0'>
            <AuthInput className='w-full' {...register("last_name", fieldValidation)} lable='Your last name' type='text' placeholder='Type your last name' icon={<BookUser />} />
            {renderErrors(errors?.last_name?.message)}
          </div>

        </div>
        <AuthInput className='mt-3' {...register("email", emailValidation)} lable='Your email address' type='email' placeholder='Type your email' icon={<Mail />} />
        {renderErrors(errors?.email?.message)}

        <SelectInput className='mt-3' {...register("role", fieldValidation)} lable='Your Role' categories={["Select your role", "Instructor", "Student"]} icon={<Mail />} />
        {renderErrors(errors?.role?.message)}

        <PasswordInput className='mt-3' {...register("password", passRegValidation)} lable='Password' type='password' placeholder='Type your password' icon={<KeyRound />} />
        {renderErrors(errors?.password?.message)}

        <div className='mt-5'>
          <Button isLoading={isLoading} rounded={'lg'} className='gap-3 group'>Sign up <Check className='p-1 text-2xl text-white transition duration-200 bg-black rounded-full group-hover:bg-white group-hover:text-black' size={20} strokeWidth={5} /></Button>
        </div>

      </form>
    </AuthBackground>
  </>
}

export default Register