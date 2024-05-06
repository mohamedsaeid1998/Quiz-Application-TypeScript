//@ts-ignore
import moment from 'moment';
import { quizIcon, quizImg, studentLogo } from "@/Assets/Images";
import { ICompletedQuizzes, IUpcomingQuizzes } from "@/InterFaces/QuizzesInterFaces";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"
import { Button, QuizzesCardSkeleton } from '@/Components';
import { JoinQuizModal } from './QuizzesModels';
import { useState } from 'react';


interface IProps {
  CompletedQuizzes: []
  UpcomingQuizzes: []
  allDataLoaded: boolean
}

const StudentQuizzesPage = ({ CompletedQuizzes, UpcomingQuizzes, allDataLoaded }: IProps) => {
  const { t } = useTranslation();
  const [isOpenJoinQuizModel, setIsOpenJoinQuiz] = useState(false)
  const openJoinQuizModel = () => setIsOpenJoinQuiz(true)
  const closeJoinQuizModel = () => setIsOpenJoinQuiz(false)

  const List = [
    { icon: quizIcon, text: "Join Quiz", className: "w-10 sm:w-12 lg:w-14 ", path: "" },
    { icon: studentLogo, text: "Results", className: "w-12 md:w-20", path: "/dashboard/results" },

  ]
  return <>
    <JoinQuizModal {...{ closeJoinQuizModel, isOpenJoinQuizModel, openJoinQuizModel }} />


    <div className='flex flex-col space-y-2 w-[140px]  '>
      {!allDataLoaded && Array.from({ length: 2 }, (_, idx) => <div key={idx} className=" max-w-[250px] h-[190px] animate-pulse bg-gray-500  quizBox border-2 border-gray-200  rounded-md ">
      </div>)}

      {allDataLoaded && List?.map(({ icon, text, className, path }) => <Link key={text} to={path} className=''>
        <figure className="flex flex-col max-w-[250px] h-[190px] items-center justify-center  quizBox border-2 cursor-pointer  border-gray-200  text-center rounded-md">
          <img src={icon} className={`${className} m-auto my-1  `} alt="quiz icon for set up a new quiz" />
          <figcaption className="my-1 font-bold leading-tight capitalize overflow-y-hidden">
            <h3>{t(text)}</h3>
          </figcaption>

        </figure>
      </Link>)}
    </div>

    <div className='flex flex-col flex-1'>

      <div className="p-3 border-2 rounded-md" >
        {!allDataLoaded ? <h6 className="h-[14px] w-[90px] animate-pulse bg-gray-500 rounded-md">{""}</h6> : <h2 className='font-semibold '>{t("UpcomingQuizzes")}</h2>}
        {!allDataLoaded && Array.from({ length: 1 }, (_, idx) => <QuizzesCardSkeleton key={idx} />)}
        {allDataLoaded && UpcomingQuizzes?.map(({ title, createdAt, schadule, _id }: IUpcomingQuizzes) => <div key={_id} className='flex items-center mt-4 border-2 rounded-lg '>

          <img src={quizImg} alt="quizImg" className='bg-secondColor w-[120px] p-3 hidden sm:block h-[120px] rounded-md' />


          <div className='w-full p-3 flex justify-between items-center '>

            <div className=''>
              <h3 className=' font-bold mb-2'>{title}</h3>
              <div className="text-[#777]">
                <span>{moment(createdAt).format("Do MMM YY")}</span> | <span>{moment(schadule).format("HH:mmA")}</span>
              </div>
              <span className='font-bold mt-3 hidden md:block'>No. of student’s enrolled: 32</span>
            </div>
            <div className='' onClick={openJoinQuizModel}>

              <Button className='flex  items-center gap-1 text-md font-bold text-white md:me-5 ' variant={'secondary'} rounded={'full'} >Join  <ArrowRight className='rounded-full ' size={15} strokeWidth={4} color='white' /></Button>
            </div>


          </div>

        </div>)}
      </div>

      <div className="p-3 mt-2 overflow-x-auto border-2 rounded-md" >
        {!allDataLoaded ? <div className='flex justify-between'>
          <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">{""}</h6>
          <h6 className='flex items-center text-xs animate-pulse bg-gray-500 h-[10px] w-[70px] rounded-md '>{""}</h6>
        </div> : <div className='flex justify-between font-semibold'>
          {t("CompletedQuizzes")}
          <Link className='flex items-center text-xs' to={"/dashboard/results"}>{t("results")}  <ArrowRight className=' p-1' size={23} strokeWidth={4} color='#C5D86D' /></Link>
        </div>}
        <table className='w-full border-2 border-separate rounded-md mt-2 border-slate-400'>
          <thead className='text-gray-400 '>
            {!allDataLoaded ? <tr >
              <th className='px-2 py-3 bg-slate-700 '><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
              <th className='px-2 py-3 bg-slate-700'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md '>{""}</span></th>
              <th className='hidden lg:table-cell px-2 py-3  bg-slate-700'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
              <th className='hidden md:table-cell px-2 py-3 bg-slate-700'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
              <th className='px-2 py-3 bg-slate-700'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
            </tr> :
              <tr>
                <th className='px-2 py-3 font-semibold bg-slate-700'>TITLE</th>
                <th className='px-2 py-3 font-semibold bg-slate-700'>STATUS</th>
                <th className='hidden lg:table-cell px-2 py-3 font-semibold  bg-slate-700'>ENROLLED</th>
                <th className='hidden md:table-cell px-2 py-3 font-semibold bg-slate-700'>SCHEDULE</th>
                <th className='px-2 py-3 font-semibold bg-slate-700'>CLOSED</th>
              </tr>

            }

          </thead>
          <tbody className='text-center text-gray-500 divide-y'>
            {!allDataLoaded ? Array.from({ length: 5 }, (_, idx) => <tr key={idx} className='bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-blue-200'>
              <td className='py-3 border whitespace-nowrap border-slate-300 '><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md '>{""}</span></td>
              <td className='hidden lg:table-cell py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='hidden md:table-cell py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
            </tr>) : null}

            {allDataLoaded && CompletedQuizzes?.map(({ title, status, participants, schadule, closed_at, _id }: ICompletedQuizzes) => <tr key={_id} className='bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-blue-200'>
              <td className='py-3 font-medium border whitespace-nowrap border-slate-300 truncate'>{title}</td>
              <td className='py-3 border border-slate-300'><span className='p-1 tracking-wider font-medium text-sm bg-red-200 text-red-800 rounded-full '>{status}</span></td>
              <td className='hidden lg:table-cell py-3 border border-slate-300'>{participants}</td>
              <td className='hidden md:table-cell py-3 border border-slate-300'>{moment(schadule).format("Do MMM YY")}</td>
              <td className='py-3 border border-slate-300'>{moment(closed_at).format("HH:mm A")}</td>
            </tr>)}


          </tbody>

        </table>
      </div>


    </div>

  </>
}

export default StudentQuizzesPage