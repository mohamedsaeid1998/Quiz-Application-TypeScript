import { Eye, EyeOff } from "lucide-react"
import { twMerge } from 'tailwind-merge'
import { InputHTMLAttributes, ReactNode, Ref, SelectHTMLAttributes, forwardRef, useId, useState } from "react"
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  lable?: string
  className?: string
  icon?: ReactNode
  containerStyle?: string
  textColor?:string
}

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  lable: string
  icon?: ReactNode
  categories?: string[] | undefined
}

export const AuthInput = forwardRef(({ lable, className = "", icon, ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
  const appliedClass = `${className} `
  const inputId = useId()
  return <>
    <div className={`${appliedClass} flex flex-col `} >
      {lable ? <label htmlFor={inputId} className="text-white font-semibold">{lable}</label> : null}

      <div className="flex items-center mt-2 rounded-md border-2 border-white  focus-within:border-mainColor focus-within: outline-none focus-within:ring-1 focus-within:ring-mainColor ">
        {icon && <div className="flex items-center me-3 pl-3 text-white ">
          {icon}
        </div>}

        <input ref={ref} id={inputId} className="px-2 rounded-r-md outline-none flex-1 border-none  bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 sm:text-sm sm:leading-6 caret-mainColor" {...rest} />
      </div>
    </div>

  </>
})
export const PasswordInput = forwardRef(({ lable, className,textColor,containerStyle, icon, ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
  const appliedClass = `${className}`
  const inputId = useId()
  const [toggle, setToggle] = useState(false)
  return <>
    <div className={`${appliedClass} flex flex-col `} >
      <label htmlFor={inputId} className="text-white font-semibold">{lable}</label>
      <div className={twMerge(` flex items-center mt-2 rounded-md border-2 border-white focus-within:border-mainColor focus-within: outline-none focus-within:ring-1 focus-within:ring-mainColor `, containerStyle)}>
        <span className="flex items-center me-3 pl-3 text-white ">
          {icon}
        </span>
        <input ref={ref} id={inputId} className={twMerge(`px-2 rounded-r-md outline-none flex-1 border-none  bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400  sm:text-sm sm:leading-6 caret-mainColor `,textColor)} {...rest} type={toggle ? "text" : "password"} />

        {toggle ? <Eye size={35} onClick={() => setToggle((prev) => !prev)} className="cursor-pointer  me-3 pl-3" /> : <EyeOff size={35} className="cursor-pointer  me-3 pl-3" onClick={() => setToggle((prev) => !prev)} />}

      </div>
    </div>
  </>
})


export const SelectInput = forwardRef(({ lable, className = "", icon, categories = [], ...rest }: ISelectProps, ref: Ref<HTMLSelectElement>) => {
  const appliedClass = `${className}`
  const inputId = useId()
  return <>
    <div className={`${appliedClass} flex flex-col`} >
      <label htmlFor={inputId} className="text-white font-semibold">{lable}</label>
      <div className="flex items-center mt-2 rounded-md border-2 border-white focus-within:border-mainColor focus-within: outline-none focus-within:ring-1 focus-within:ring-mainColor">
        <div className="flex items-center me-3 pl-3 text-white ">
          {icon}
        </div>

        <select ref={ref} id={inputId} {...rest} className="px-2 rounded-r-md outline-none flex-1 border-none  bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400  sm:text-sm sm:leading-6"  >
          <option
            value={""}
            className="text-slate-500"
          >
            {categories[0]}
          </option>
          {categories?.slice(1).map((category: string) => (
            <option
              key={category}
              value={category}
              className="text-black"
            >
              {category}
            </option>
          ))}
        </select>

      </div>
    </div>
  </>
})







export const ConfirmPasswordInput = forwardRef((rest: IProps, ref: Ref<HTMLInputElement>) => {
  return <>
    <PasswordInput {...rest} ref={ref} />
  </>
})