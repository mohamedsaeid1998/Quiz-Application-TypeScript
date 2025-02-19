import { AuthBackground, Button } from "@/Components";
import {
  AuthInput,
  ConfirmPasswordInput,
  PasswordInput,
} from "@/Components/Shared/AuthInputs/AuthInputs";
import { IFormResetPass } from "@/InterFaces/AuthInterFaces";
import { useResetPasswordMutation } from "@/Redux/Services/Authentication/AuthSlice";
import { renderErrors } from "@/Utils/Helpers/ErrorMessage/ErrorMessage";
import {
  emailValidation,
  otpValidation,
  passRegValidation,
} from "@/Utils/Validation";
import { Check, KeyRound, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.module.scss";

const ResetPassword = () => {
  const [submitResetPass, { isLoading }] = useResetPasswordMutation();
  const { state: emailAddress } = useLocation();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormResetPass>({
    defaultValues: {
      email: emailAddress,
    },
  });
  const navigate = useNavigate();

  const handleResetPass = async (data: IFormResetPass) => {
    const response = await submitResetPass(data);
    if (
      "data" in response &&
      response.data.message === "Record updated successfully"
    ) {
      navigate("/", { state: { emailAddress, emailPassword: data.password } });
    }
  };

  return (
    <>
      <AuthBackground header={"Reset Password"}>
        <form onSubmit={handleSubmit(handleResetPass)}>
          <AuthInput
            disabled={emailAddress ? true : false}
            slotProps={{
              divProps: {
                className: "mt-5",
              },
              inputProps: {
                className: ` ${
                  emailAddress && "opacity-40 cursor-not-allowed"
                }`,
              },
            }}
            {...register("email", emailValidation)}
            lable="Your email address"
            type="email"
            placeholder="Type your email"
            icon={<Mail />}
          />
          {renderErrors(errors?.email?.message)}

          <AuthInput
            slotProps={{ divProps: { className: "mt-3" } }}
            {...register("otp", otpValidation)}
            lable="Type your otp"
            type="text"
            placeholder="Type your OTP"
            icon={<Mail />}
          />
          {renderErrors(errors?.otp?.message)}

          <PasswordInput
            slotProps={{ divProps: { className: "mt-3 w-full" } }}
            {...register("password", passRegValidation)}
            lable="Password"
            placeholder="Type your password"
            icon={<KeyRound />}
          />
          {renderErrors(errors?.password?.message)}

          <ConfirmPasswordInput
            slotProps={{ divProps: { className: "mt-3" } }}
            {...register("confirmPassword", {
              required: "Confirm Password is required!!",
              validate: (value) =>
                value === getValues("password") || "password is don't match",
            })}
            lable="Confirm Password"
            placeholder="Type your Confirm Password"
            icon={<KeyRound />}
          />
          {renderErrors(errors?.confirmPassword?.message)}

          <div className="flex flex-col items-center justify-between mt-5 space-y-5 sm:space-y-0 sm:flex-row">
            <Button
              isLoading={isLoading}
              rounded={"lg"}
              className="gap-3 group"
            >
              Reset{" "}
              <Check
                className="p-1 text-2xl text-white transition duration-200 bg-black rounded-full group-hover:bg-white group-hover:text-black"
                size={20}
                strokeWidth={5}
              />
            </Button>

            <span>
              Login ?{" "}
              <Link to={"/"} className="underline text-mainColor">
                click here
              </Link>{" "}
            </span>
          </div>
        </form>
      </AuthBackground>
    </>
  );
};

export default ResetPassword;
