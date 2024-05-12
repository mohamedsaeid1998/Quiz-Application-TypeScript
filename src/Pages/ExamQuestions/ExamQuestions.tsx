import { Button, Stepper } from '@/Components'
import { useGetQuestionsQuery } from '@/Redux/Services/Questions/QuestionsSlice'
import { stagger, useAnimate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import './ExamQuestions.module.scss'
import { useSubmitQuizMutation } from '@/Redux/Services/Quizzes/QuizzesSlice'
import { QuizResultModal } from '../Quizzes/QuizzesModels'
import SubmitButton from './SubmitButton'
import { sparklesAnimation, sparklesFadeOut, sparklesReset } from '@/Utils/Helpers/FramerVariables/FramerVariables'
import { Loader } from 'lucide-react'


const ExamQuestions = () => {
  const { id } = useParams()
  const { data: questionsData } = useGetQuestionsQuery(id)
  console.log(questionsData);


  const [searchParams, setSearchParams] = useSearchParams({ "question-number": "0" })
  const [questionNumber, setQuestionNumber] = useState(Number(searchParams.get("question-number")));

  let Questions = questionsData?.data?.questions?.[questionNumber];
  const questionsDuration: number = questionsData?.data?.score_per_question;
  // ! *************    when Refresh back to Start Question  *************
  useEffect(() => {
    setSearchParams({ "question-number": "0" });
    const storedAnswers = localStorage?.getItem('examAnswers');
    if (storedAnswers) {
      setAllAnswers(JSON?.parse(storedAnswers));
    }

    window.addEventListener('beforeunload', () => {
      localStorage.removeItem('examAnswers');
    });

    return () => {
      window.removeEventListener('beforeunload', () => {
        localStorage.removeItem('examAnswers');
      });
    };
  }, []);


  // ! *************    Remove checked  *************
  const clearSelectedValue = () => {
    const inputs = document.querySelectorAll<HTMLInputElement>('input[type="radio"]');
    inputs.forEach((input) => {
      input.checked = false;
    });
  };

  // ! *************  تخزين رقم السوال  *************
  useEffect(() => {
    setQuestionNumber(Number(searchParams.get("question-number")));
  }, [searchParams]);

  // ! *************  Next Button كود  *************
  const handleNextQuestion = () => {
    if (questionNumber + 1 < questionsData?.data?.questions?.length)
      setSearchParams({ "question-number": String(questionNumber + 1) });
    clearSelectedValue()
  }

  // ! *************  Prev Button كود  *************
  const handlePrevQuestion = () => {
    if (questionNumber) {
      if (questionNumber >= 1)
        setSearchParams({ "question-number": String(questionNumber - 1) });
    }
    clearSelectedValue()
  }

  // ! *************   Answers  *************
  const [allAnswers, setAllAnswers] = useState<{ answers: { question: string; answer: string; }[] }>({ answers: [] });

  // ! ************* Handel Answers  *************
  const [selectedAnswersCount, setSelectedAnswersCount] = useState(0);

  const handleChangeAnswers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const questionId = Questions?._id;
    const answerValue = e.target.value;

    setAllAnswers(prev => {
      const updatedAnswers = prev.answers.map(answer => {
        if (answer?.question === questionId) {
          return { question: questionId, answer: answerValue };
        }
        return answer;
      });

      if (!updatedAnswers?.find(answer => answer?.question === questionId)) {
        updatedAnswers?.push({ question: questionId, answer: answerValue });
      }

      const count = updatedAnswers.filter(answer => answer.answer !== "").length;
      setSelectedAnswersCount(count);

      return { answers: updatedAnswers };
    });
  };

  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);

  useEffect(() => {
    if (Questions && Questions.options && Questions?._id) {
      if (!answeredQuestions.includes(Questions?._id) && allAnswers.answers.some(answer => answer.question === Questions?._id)) {
        setAnsweredQuestions(prev => [...prev, Questions?._id]);
      }
    }
  }, [questionNumber, allAnswers.answers]);

  useEffect(() => {
    const selectedAnswer = allAnswers?.answers?.find(answer => answer?.question === Questions?._id)?.answer;
    if (selectedAnswer) {
      const input = document?.querySelector<HTMLInputElement>(`input[value="${selectedAnswer}"]`);
      if (input) {
        input.checked = true;

      }
    }
  }, [Questions, allAnswers, questionNumber]);
  console.log(allAnswers);


  // ! **************** Button Animation ****************
  const [scope, animate] = useAnimate()

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    animate([
      ...sparklesReset,
      [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      ["button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
      ["button", { scale: 1 }, { duration: 0.1 }],
      ...sparklesAnimation,
      [".letter", { y: 0 }, { duration: 0.000001 }],
      ...sparklesFadeOut,
    ])
    handelSubmitAnswers()
  }

  // ! **************** Submit Quiz Answers ****************

  const [isOpenInfoModel, setIsOpenInfoModel] = useState(false)
  const [score, setScore] = useState([0, 0, 0])
  const [rightAnswers, setRightAnswers] = useState([])

  const openInfoModel = (score: number[]) => {
    setIsOpenInfoModel(true)
    setScore(score)
  }

  const closeInfoModel = () => setIsOpenInfoModel(false)

  const [submitQuizAnswers, { isLoading }] = useSubmitQuizMutation()

  const handelSubmitAnswers = async () => {
    if (selectedAnswersCount !== questionsData?.data?.questions?.length) {
      alert(` ${questionsData?.data?.questions?.length - selectedAnswersCount} questions without answers`)
      return;
    } else {
      const response = await submitQuizAnswers({ ...allAnswers, _id: id })
      if ('data' in response && response.data.message === "Student submitted successfully") {
        //@ts-ignore
        response?.data?.data.questions.map((ques: any) => setRightAnswers(prev => [...prev, ques?.answer]))
        openInfoModel([response?.data?.data?.score, response?.data?.data?.questions?.length, questionsDuration])
      }
    }
  }

  const [uncertainQuestions, setUncertainQuestions] = useState(false);
  console.log(uncertainQuestions);



  return <>
    {Questions ? <>
      <QuizResultModal {...{ isOpenInfoModel, closeInfoModel, score }} />
      <form className=" lg:p-3 xl:p-3 mt-2 overflow-x-auto border-2 rounded-md" >

        <Stepper  {...{ questionsData, answeredQuestions, setSearchParams, clearSelectedValue, uncertainQuestions, selectedAnswersCount }} />

        <div className=' mx-5 '>

          <div className='flex justify-between items-center gap-5'>
            <h3 className='text-white py-2 rounded-md w-full text-center  bg-red-500 font-bold text-md xl:text-xl lg:text-lg '>{Questions?.title}</h3>
          </div>

          <div className=' font-bold text-lg tracking-wider grid md:grid-cols-2  mt-5 gap-2  grid-cols-1'>

            <label htmlFor="optionA" className={`flex font-bold ${answeredQuestions.includes(Questions?._id) && rightAnswers[questionNumber] === 'A' ? "border-green-600" : ""} text-black border-4 py-2  rounded-full px-5 items-center hover:bg-blue-400  group duration-500 transition-all inputWrapper`}>
              <div className='w-7 h-7 rounded-full flex justify-center items-center border-2 group-hover:text-white group-hover:bg-black text-[12px] md:text-[15px] char'>A</div>
              <input type='radio' id="optionA" name='questions' onChange={(e) => handleChangeAnswers(e)} value={"A"} className='hidden' />
              <span className='text-[12px] md:text-[15px] text-center m-auto ' >{Questions?.options?.A}</span>
            </label>

            <label htmlFor="optionB" className={`flex font-bold  ${answeredQuestions.includes(Questions?._id) && rightAnswers[questionNumber] === 'B' ? "border-green-600" : ""} text-black border-4 py-2  rounded-full px-5 items-center hover:bg-blue-400  group duration-500 transition-all inputWrapper`}>
              <div className='w-7 h-7 rounded-full flex justify-center items-center border-2 group-hover:text-white group-hover:bg-black text-[12px] md:text-[15px] char'>B</div>
              <input type='radio' id="optionB" name='questions' onChange={(e) => handleChangeAnswers(e)} value={"B"} className='hidden' />
              <span className='text-[12px] md:text-[15px] text-center m-auto'>{Questions?.options?.B}</span>
            </label>

            <label htmlFor="optionC" className={`flex font-bold ${answeredQuestions.includes(Questions?._id) && rightAnswers[questionNumber] === 'C' ? "border-green-600" : ""} text-black border-4 py-2  rounded-full px-5 items-center hover:bg-blue-400  group duration-500 transition-all inputWrapper`}>
              <div className='w-7 h-7 rounded-full flex justify-center items-center border-2 group-hover:text-white group-hover:bg-black text-[12px] md:text-[15px] char'>C</div>
              <input type='radio' id="optionC" name='questions' onChange={(e) => handleChangeAnswers(e)} value={"C"} className='hidden' />
              <span className='text-[12px] md:text-[15px] text-center m-auto'>{Questions?.options?.C}</span>
            </label>

            <label htmlFor="optionD" className={`flex font-bold ${answeredQuestions.includes(Questions?._id) && rightAnswers[questionNumber] === 'D' ? "border-green-600" : ""} text-black border-4 py-2  rounded-full px-5 items-center hover:bg-blue-400  group duration-500 transition-all inputWrapper`}>
              <div className='w-7 h-7 rounded-full flex justify-center items-center border-2 group-hover:text-white group-hover:bg-black text-[12px] md:text-[15px] char'>D</div>
              <input type='radio' id="optionD" name='questions' onChange={(e) => handleChangeAnswers(e)} value={"D"} className='hidden' />
              <span className='text-[12px] md:text-[15px] text-center m-auto'>{Questions?.options?.D}</span>
            </label>

          </div>

        </div>

        <div className='flex justify-evenly mt-4 mb-8'>

          <Button type='button' onClick={handlePrevQuestion} variant={'primary'} className={`uppercase ${questionNumber <= 0 ? "hidden" : ""}`}>Back</Button>
          {!rightAnswers[questionNumber] && <button onClick={() => setUncertainQuestions(prev => !prev)} type="button" className={`bg-[#D1BA59] text-black px-4 text-md h-10 rounded-md font-extrabold  uppercase `}>Uncertain</button>}
          <SubmitButton {...{ questionNumber, questionsData, rightAnswers, isLoading, onButtonClick, scope }} />
          <Button type='button' onClick={handleNextQuestion} variant={'secondary'} className={`uppercase ${questionNumber + 1 === questionsData?.data?.questions?.length ? "hidden" : ""}`}>Next</Button>

        </div>
      </form >
    </> : <div className="flex flex-col h-[70vh] justify-center items-center"><Loader className="animate-spin" size={150} color="#C5D86D" /><h4 className='text-2xl mt-2 font-bold tracking-widest'>loading Questions...</h4></div>}
  </>
}

export default ExamQuestions