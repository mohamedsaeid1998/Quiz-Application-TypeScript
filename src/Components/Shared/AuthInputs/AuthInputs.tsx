import useToggle from "@/Hooks/useToggle";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { ComponentProps, forwardRef, useId } from "react";
import { twMerge } from "tailwind-merge";
interface IProps extends ComponentProps<"input"> {
  lable?: string;
  icon?: React.ReactNode;
  containerStyle?: string;
  slotProps?: {
    inputProps?: ComponentProps<"input">;
    lableProps?: ComponentProps<"label">;
    divProps?: ComponentProps<"div">;
    iconProps?: ComponentProps<"svg">;
  };
}

interface ISelectProps extends ComponentProps<"select"> {
  lable: string;
  icon?: React.ReactNode;
  categories?: string[] | undefined;
  slotProps?: {
    selectProps?: ComponentProps<"select">;
    lableProps?: ComponentProps<"label">;
    divProps?: ComponentProps<"div">;
  };
}

type TextFieldProps = Omit<IProps, "className">;
type SelectFieldProps = Omit<ISelectProps, "className">;
type PasswordFieldProps = Omit<IProps, "type" | "className">;

export const AuthInput = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ lable, icon, slotProps, ...rest }, ref) => {
    const inputId = useId();
    return (
      <>
        <div
          {...slotProps?.divProps}
          className={twMerge(` flex flex-col`, slotProps?.divProps?.className)}
        >
          {lable ? (
            <label
              htmlFor={inputId}
              {...slotProps?.lableProps}
              className={twMerge(
                "font-semibold text-white",
                slotProps?.lableProps?.className
              )}
            >
              {lable}
            </label>
          ) : null}

          <div className="flex items-center mt-2 border-2 border-white rounded-md outline-none focus-within:border-mainColor focus-within: focus-within:ring-1 focus-within:ring-mainColor ">
            {icon && (
              <div className="flex items-center pl-3 text-white me-2 ">
                {icon}
              </div>
            )}

            <input
              {...rest}
              ref={ref}
              id={inputId}
              {...slotProps?.inputProps}
              className={twMerge(
                "px-2 ms-2 rounded-r-md outline-none flex-1 border-none  bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 sm:text-sm sm:leading-6 caret-mainColor",
                slotProps?.inputProps?.className
              )}
            />
          </div>
        </div>
      </>
    );
  }
);
export const PasswordInput = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ lable, containerStyle, slotProps, ...rest }, ref) => {
    const inputId = useId();
    const [isPasswordShown, toggle] = useToggle();
    return (
      <>
        <div
          {...slotProps?.divProps}
          className={twMerge(
            ` flex flex-col w-full`,
            slotProps?.divProps?.className
          )}
        >
          <label
            htmlFor={inputId}
            {...slotProps?.lableProps}
            className={twMerge(
              "font-semibold text-white",
              slotProps?.lableProps?.className
            )}
          >
            {lable}
          </label>
          <div
            className={twMerge(
              ` flex items-center mt-2 rounded-md border-2 border-white focus-within:border-mainColor focus-within: outline-none focus-within:ring-1 focus-within:ring-mainColor `,
              containerStyle
            )}
          >
            <span className="flex items-center pl-3 text-white me-3 ">
              <KeyRound {...slotProps?.iconProps} />
            </span>
            <input
              {...rest}
              ref={ref}
              id={inputId}
              {...slotProps?.inputProps}
              className={twMerge(
                `px-2 ms-1 rounded-r-md outline-none flex-1 border-none  bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400  sm:text-sm sm:leading-6 caret-mainColor `,
                slotProps?.inputProps?.className
              )}
              type={isPasswordShown ? "text" : "password"}
            />

            <button
              className="me-3"
              type="button"
              onClick={toggle}
              onMouseUp={(e) => e.preventDefault()}
              onMouseDown={(e) => e.preventDefault()}
            >
              <span className="sr-only">
                {isPasswordShown ? "Hide Password" : "Show Password"}
              </span>
              {isPasswordShown ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </div>
      </>
    );
  }
);

export const SelectInput = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ lable, icon, slotProps, categories = [], ...rest }, ref) => {
    const inputId = useId();
    return (
      <>
        <div
          {...slotProps?.divProps}
          className={twMerge(` flex flex-col`, slotProps?.divProps?.className)}
        >
          <label
            htmlFor={inputId}
            {...slotProps?.lableProps}
            className={twMerge(
              "font-semibold text-white",
              slotProps?.lableProps?.className
            )}
          >
            {lable}
          </label>
          <div className="flex items-center mt-2 border-2 border-white rounded-md outline-none focus-within:border-mainColor focus-within: focus-within:ring-1 focus-within:ring-mainColor">
            <div className="flex items-center pl-3 text-white me-3 ">
              {icon}
            </div>

            <select
              {...rest}
              ref={ref}
              id={inputId}
              {...slotProps?.selectProps}
              className={twMerge(
                "px-2 rounded-r-md outline-none flex-1 border-none  bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400  sm:text-sm sm:leading-6",
                slotProps?.selectProps?.className
              )}
            >
              <option value={""} className="text-slate-500">
                {categories[0]}
              </option>
              {categories?.slice(1).map((category: string) => (
                <option key={category} value={category} className="text-black">
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </>
    );
  }
);

export const ConfirmPasswordInput = forwardRef<
  HTMLInputElement,
  PasswordFieldProps
>((rest, ref) => {
  return (
    <>
      <PasswordInput {...rest} ref={ref} />
    </>
  );
});
