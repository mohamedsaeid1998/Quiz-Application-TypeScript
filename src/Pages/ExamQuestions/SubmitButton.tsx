import { AnimationScope } from "framer-motion"

interface IProps {
  questionNumber: number
  questionsData: any
  rightAnswers: number[]
  isLoading: boolean
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  scope: AnimationScope
}

const SubmitButton = ({ questionNumber, questionsData, rightAnswers, isLoading, onButtonClick, scope }: IProps) => {
  return <>
    {questionNumber + 1 === questionsData?.data?.questions?.length && !rightAnswers[questionNumber] ? <div ref={scope}>
      <button
        disabled={isLoading}
        onClick={(e) => onButtonClick(e)}
        className="relative px-5 py-1 text-xl font-bold tracking-wider text-blue-600 transition-colors border-2 border-blue-600 rounded-full hover:bg-blue-100">
        <span className="sr-only">SUBMIT</span>
        <span className="block h-8 overflow-hidden " aria-hidden>
          {["S", "U", "B", "M", "I", "T"].map((letter, index) => (
            <span
              data-letter={letter}
              className="letter relative inline-block h-8 leading-8 after:absolute after:left-0 after:top-full after:h-8 after:content-[attr(data-letter)]"
              key={`${letter}-${index}`}
            >
              {letter}
            </span>
          ))}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block pointer-events-none -z-10"
        >
          {Array.from({ length: 20 }).map((_, index) => (
            <svg
              className={`absolute left-1/2 top-1/2 opacity-0 sparkle-${index}`}
              key={index}
              viewBox="0 0 122 117"
              width="10"
              height="10"
            >
              <path
                className="fill-blue-600"
                d="M64.39,2,80.11,38.76,120,42.33a3.2,3.2,0,0,1,1.83,5.59h0L91.64,74.25l8.92,39a3.2,3.2,0,0,1-4.87,3.4L61.44,96.19,27.09,116.73a3.2,3.2,0,0,1-4.76-3.46h0l8.92-39L1.09,47.92A3.2,3.2,0,0,1,3,42.32l39.74-3.56L58.49,2a3.2,3.2,0,0,1,5.9,0Z"
              />
            </svg>
          ))}
        </span>
      </button>
    </div> : null}
  </>
}

export default SubmitButton