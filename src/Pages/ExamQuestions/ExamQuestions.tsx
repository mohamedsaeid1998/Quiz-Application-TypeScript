import { Button, Stepper } from '@/Components'
import { useGetQuestionsQuery } from '@/Redux/Services/Questions/QuestionsSlice'
import { animate, stagger, useAnimate } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'
import './ExamQuestions.module.scss'



type AnimationSequence = Parameters<typeof animate>[0];

const ExamQuestions = () => {
  const { register, handleSubmit } = useForm()
  const { id } = useParams()
  const { data: questionsData, isLoading: questionLoding } = useGetQuestionsQuery(id)
  const [questionIndex, setQuestionIndex] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams({ "question_number": "1" })

  console.log(searchParams);


  let Questions = questionsData?.data?.questions?.[questionIndex];
  console.log(questionsData?.data?.questions);

  const handleNextQuestion = () => {
    setQuestionIndex(prev => prev + 1);
  }
  const handlePrevQuestion = () => {
    if (questionIndex >= 1)
      setQuestionIndex(prev => prev - 1);
  }
  const [allAnswers, setAllAnswers] = useState<{ answers: { question: string; answer: string; }[] }>({ answers: [] });

  const handleSubmitAnswers = (data: any) => {
    const newAnswer = { question: Questions?.options?._id, answer: data.answer };
    setAllAnswers(prev => ({ answers: [...prev.answers, newAnswer] }));
    handleNextQuestion();
  }

  console.log(allAnswers);




  // ! **************** Button Animation ****************
  const [scope, animate] = useAnimate()

  const randomNumberBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const onButtonClick = () => {
    const sparkles = Array.from({ length: 15 });
    const sparklesAnimation: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: randomNumberBetween(-80, 80),
        y: randomNumberBetween(-40, 40),
        scale: randomNumberBetween(1.5, 2.5),
        opacity: 1,

      },
      {
        duration: 0.4,
        at: "<"
      }
    ])

    const sparklesFadeOut: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        opacity: 0,
        scale: 0
      },
      {
        duration: 0.3,
        at: "<"
      }
    ])

    const sparklesReset: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: 0,
        y: 0,
      },
      {
        duration: 0.000001,
      },
    ]);

    animate([
      ...sparklesReset,
      [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      ["button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
      ["button", { scale: 1 }, { duration: 0.1 }],
      ...sparklesAnimation,
      [".letter", { y: 0 }, { duration: 0.000001 }],
      ...sparklesFadeOut,
    ])
  }

  return <>


    <form onSubmit={handleSubmit(handleSubmitAnswers)} className="p-3 mt-2 overflow-x-auto border-2 rounded-md" >
      <div>
        <Stepper {...{ questionsData }} />
      </div>

      <div className='ms-8 '>
        {Questions ? <>
          <h3 className='text-red-500 font-bold text-2xl'>{Questions?.title}</h3>

          <div className=' font-bold mt-2 text-lg tracking-wider flex flex-col gap-2'>
            <div className='flex gap-2 '>
              <input type='radio' id="options"  {...register("answer")} value={"A"} />
              <label htmlFor="options" >{Questions?.options?.A}</label>
            </div>
            <div className='flex gap-2 '>
              <input type='radio' id="options" {...register("answer")} value={"B"} className="accent-green-400 focus:accent-green-400" />
              <label htmlFor="options">{Questions?.options?.B}</label>
            </div>
            <div className='flex gap-2 '>
              <input type='radio' id="options" {...register("answer")} value={"C"} className="accent-yellow-200 focus:accent-yellow-200" />
              <label htmlFor="options">{Questions?.options?.C}</label>
            </div>
            <div className='flex gap-2 '>
              <input type='radio' id="options" {...register("answer")} value={"D"} className="accent-pink-300 focus:accent-pink-500" />
              <label htmlFor="options">{Questions?.options?.D}</label>
            </div>
          </div>

        </> : "Wait"}
      </div>

      <div className='flex justify-around mt-4 mb-8'>
        <Button type='button' onClick={handlePrevQuestion} variant={'primary'} className='uppercase'>Back</Button>
        <div ref={scope}>
          <button
            onClick={onButtonClick}
            className="relative rounded-full border-2 font-bold tracking-wider  border-blue-600 px-5 py-1 text-xl text-blue-600 transition-colors hover:bg-blue-100"
          >
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
              className="pointer-events-none absolute inset-0 -z-10 block"
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
        </div>
        <Button type='button' onClick={handleNextQuestion} variant={'secondary'} className='uppercase'>Next</Button>
      </div>
    </form>

  </>
}

export default ExamQuestions