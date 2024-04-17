import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '@/Components'
import { AuthInput } from '../AuthInputs/AuthInputs'
import { IFormLogin } from '@/InterFaces/AuthInterFaces'
import { UseFormSetValue } from 'react-hook-form'
interface IProps {
  setValue: UseFormSetValue<IFormLogin>
}

const TestCode = ({ setValue }: IProps) => {
  
  const handleTestCode = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (testCode === "3c6v9b") {
      setShow(true)
      toast.success("Choose account Kind", {
        autoClose: 2000,
        theme: "colored",
      });


    } else {
      setShow(false)
      toast.error("Wrong Code", {
        autoClose: 2000,
        theme: "colored",
      })
    }

  }
  const [radioCheckedAdmin, setRadioCheckedAdmin] = useState(false);
  const [radioCheckedUser, setRadioCheckedUser] = useState(false);

  useEffect(() => {
    if (radioCheckedAdmin) {
      setValue("email", "msmma19998@gmail.com")
      setValue("password", "01021754177@Aa")
    }
    if (radioCheckedUser) {
      setValue("email", "m_smma71@yahoo.com")
      setValue("password", "01021754177@Aa")
    }

  }, [radioCheckedAdmin, radioCheckedUser])


  const [testCode, setTestCode] = useState("")
  const [show, setShow] = useState(false)


  const handleRadioChangeAdmin = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioCheckedAdmin(e.target.checked);
  };

  const handleRadioChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioCheckedUser(e.target.checked);
  };
  return <>
    <form className="flex flex-col lg:flex-row justify-center mt-2 ">
      <div className='flex items-center space-x-5 justify-center'>
        <AuthInput
          className='w-32'
          type="password"
          placeholder="test Code"
          onChange={(e) => {
            setTestCode(e.target.value)
          }}
        />
        <Button
          className='mt-2'
          onClick={handleTestCode}
        >
          Submit
        </Button>
      </div>
      <div
        className={`${show ? "show" : "hide"} flex  space-x-3 justify-center items-center`}>
        <div className="flex space-x-2  items-center mt-2 ">
          <label htmlFor="admin" >Admin</label>
          <input type="radio" name="check " id="admin"
            checked={radioCheckedAdmin}
            onChange={handleRadioChangeAdmin}
            className="radioInput" />
        </div>
        <div className="flex space-x-2  items-center  mt-2 ">
          <label htmlFor="user">User</label>
          <input type="radio" name="check " id="user"
            checked={radioCheckedUser}
            onChange={handleRadioChangeUser}
            className="radioInput" />
        </div>
      </div>
    </form>
  </>
}

export default TestCode