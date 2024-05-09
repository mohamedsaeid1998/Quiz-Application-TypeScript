import { Ref, forwardRef } from "react"

interface IProps {
  label: string
  className?: string
  content: string
  icon?: React.ReactNode
}

export const DetailsInput = forwardRef(({ className = "", label, content, icon, ...rest }: IProps, ref: Ref<HTMLParagraphElement>) => {
  const appliedClass = `${className} `

  return <>
    <div className={`${appliedClass} flex items-center border-2 rounded-lg `}>
      <label className='bg-secondColor p-2 font-semibold  flex justify-center min-w-12'>
        {label}
      </label>
      <p ref={ref} title={content} className="pl-1.5 lg:pl-3 text-black flex flex-1 py-1.5 ms-0.5 truncate  " {...rest} >
        <span className="truncate">{content}</span>
      </p>
      {icon && <span className="flex items-center me-3 pl-3 text-white ">
        {icon}
      </span>}
    </div>
  </>
})


