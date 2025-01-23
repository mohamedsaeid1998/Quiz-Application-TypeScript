import { MouseEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/Components";
import { AuthInput } from "../AuthInputs/AuthInputs";
import { IFormLogin } from "@/InterFaces/AuthInterFaces";
import { UseFormSetValue } from "react-hook-form";
import useToggle from "@/Hooks/useToggle";
interface IProps {
  setValue: UseFormSetValue<IFormLogin>;
}

const TestCode = ({ setValue }: IProps) => {
  const handleTestCode = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (testCode === "3c6v9b") {
      toggleShow();
      toast.success("Choose account Kind", {
        autoClose: 2000,
        theme: "colored",
      });
    } else {
      toggleShow();
      toast.error("Wrong Code", {
        autoClose: 2000,
        theme: "colored",
      });
    }
  };
  const [radioCheckedAdmin, setRadioCheckedAdmin] = useState<boolean>(false);
  const [radioCheckedUser, setRadioCheckedUser] = useState<boolean>(false);

  const [testCode, setTestCode] = useState("");
  const [show, toggleShow] = useToggle();

  const handleRadioChangeAdmin = (e: MouseEvent<HTMLInputElement>) => {
    setRadioCheckedAdmin(e.currentTarget.checked);
    setValue("email", "msmma19998@gmail.com");
    setValue("password", "01021754177@Aa");
  };

  const handleRadioChangeUser = (e: MouseEvent<HTMLInputElement>) => {
    setRadioCheckedUser(e.currentTarget.checked);
    setValue("email", "m_smma71@yahoo.com");
    setValue("password", "01021754177@Aa");
  };
  return (
    <>
      <form className="flex flex-col justify-center mt-2 lg:flex-row ">
        <div className="flex items-center justify-center space-x-5">
          <AuthInput
            slotProps={{ divProps: { className: "w-32" } }}
            type="password"
            placeholder="test Code"
            onChange={(e) => {
              setTestCode(e.target.value);
            }}
          />
          <Button className="mt-2" onClick={handleTestCode}>
            Submit
          </Button>
        </div>
        <div
          className={`${
            show ? "flex items-center gap-[10px] ml-[10px]" : "hidden"
          } space-x-3 justify-center`}
        >
          <div className="flex items-center mt-2 space-x-2 ">
            <label htmlFor="admin">Instructor</label>
            <input
              type="radio"
              name="check"
              id="admin"
              defaultValue={radioCheckedAdmin ? "true" : "false"}
              onClick={(e) => handleRadioChangeAdmin(e)}
              className="radioInput"
            />
          </div>
          <div className="flex items-center mt-2 space-x-2 ">
            <label htmlFor="user">Student</label>
            <input
              type="radio"
              name="check"
              id="user"
              defaultValue={radioCheckedUser ? "true" : "false"}
              onClick={(e) => handleRadioChangeUser(e)}
              className="radioInput"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default TestCode;
