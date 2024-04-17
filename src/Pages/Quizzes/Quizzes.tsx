//@ts-nocheck
import { BankIcon, quizIcon, quizImg, studentLogo } from '@/Assets/Images'
import './Quizzes.module.scss'
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useCompletedQuizzesQuery, useGetFirstUpcomingQuizzesQuery } from '@/Redux/Services/Quizzes/QuizzesSlice';
import { QuizzesCardSkeleton } from '@/Components';
import { ICompletedQuizzes, IUpcomingQuizzes } from '@/InterFaces/QuizzesInterFaces';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { CreateQuizModal, InfoQuizModal } from './QuizzesModels';
import { useLayoutEffect, useState } from 'react';
import { useGroupsListQuery } from '@/Redux/Services/Groups/GroupsSlice';
interface IProps {

}

const Quizzes = ({ }: IProps) => {
  const { t } = useTranslation();

  //* ***************Create New Quiz ***************
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

    //* *************** Quiz Code ***************
    const [isOpenInfoModel, setIsOpenInfoModel] = useState(false)
    const [quizCode, setQuizCode] = useState("")
    const openInfoModel = (code:string) => {
      setIsOpenInfoModel(true)
      setQuizCode(code)
    }
    const closeInfoModel= () => setIsOpenInfoModel(false)

  //? ***************Get Groups List ***************
  const { isLoading: groupsLoading, data: groupsList } = useGroupsListQuery(0)

  const duration = [
    { _id: "1", title: "1" },
    { _id: "5", title: "5" },
    { _id: "10", title: "10" },
    { _id: "20", title: "20" },
    { _id: "30", title: "30" },
    { _id: "40", title: "40" },
    { _id: "50", title: "50" },
    { _id: "60", title: "60" },
    { _id: "70", title: "70" },
    { _id: "80", title: "80" }
  ]

  const questions_number = [
    { _id: "1", title: "1" },
    { _id: "2", title: "2" },
    { _id: "3", title: "3" },
    { _id: "4", title: "4" },
    { _id: "5", title: "5" },
    { _id: "6", title: "6" },
    { _id: "7", title: "7" },
    { _id: "8", title: "8" },
    { _id: "9", title: "9" },
    { _id: "10", title: "10" }
  ]

  const difficulty = [
    { _id: "easy", title: "Easy" },
    { _id: "medium", title: "Medium" },
    { _id: "hard", title: "Hard" },
  ]

  const type = [
    { _id: "FE", title: "FE" },
    { _id: "BE", title: "BE" },
  ]


  const List = [
    { icon: quizIcon, text: "SetUpAnewQuiz", className: "", path: "" },
    { icon: BankIcon, text: "QuestionBank", className: "", path: "/dashboard/questions" },
    { icon: studentLogo, text: "students", className: "w-20", path: "/dashboard/student" },
  ]
  const { isLoading: upcomingQuizzesLoading, data: UpcomingQuizzes } = useGetFirstUpcomingQuizzesQuery(0)
  const { isLoading: completedQuizzesLoading, data: CompletedQuizzes } = useCompletedQuizzesQuery(0)
  const [allDataLoaded, setAllDataLoaded] = useState(false);


  useLayoutEffect(() => {
    if (!upcomingQuizzesLoading && !completedQuizzesLoading) {
      setAllDataLoaded(true);
    }
  }, [upcomingQuizzesLoading, completedQuizzesLoading]);


  return <>
    <CreateQuizModal {...{ isOpen, closeModal, duration, questions_number, difficulty, type, groupsLoading, groupsList,openInfoModel }} />
    <InfoQuizModal {...{isOpenInfoModel,closeInfoModel,quizCode}}/>
    <main className='m-5 mt-3 '>
      <div className='container flex gap-3'>

        <div className='flex flex-col w-1/5 space-y-2 '>
          {!allDataLoaded && Array.from({ length: 3 }, (_, idx) => <div key={idx} className=" max-w-[250px] h-[190px] animate-pulse bg-gray-500  quizBox border-2 border-gray-200  rounded-md ">
          </div>)}

          {allDataLoaded && List?.map(({ icon, text, className, path }) => <Link onClick={openModal} key={text} to={path}>
            <figure className="flex flex-col max-w-[250px] h-[190px] items-center justify-center  quizBox border-2 cursor-pointer  border-gray-200  text-center rounded-md">
              <img src={icon} className={`${className} m-auto my-1 `} alt="quiz icon for set up a new quiz" />
              <figcaption className="my-1 text-xl font-bold leading-tight capitalize overflow-y-hidden">
                {t(text)}
              </figcaption>

            </figure>
          </Link>)}
        </div>

        <div className='flex flex-col w-4/5 overflow-x-auto'>

          <div className="p-3 border-2 rounded-md" >
            {!allDataLoaded ? <h6 className="h-[14px] w-[90px] animate-pulse bg-gray-500 rounded-md">{""}</h6> : <h2 className='font-semibold '>{t("UpcomingQuizzes")}</h2>}
            {!allDataLoaded && Array.from({ length: 1 }, (_, idx) => <QuizzesCardSkeleton key={idx} />)}
            {allDataLoaded && UpcomingQuizzes?.map(({ title, createdAt, schadule, _id }: IUpcomingQuizzes) => <div key={_id} className='flex items-center mt-4 border-2 rounded-lg '>

              <img src={quizImg} alt="quizImg" />


              <div className='w-full p-3 '>
                <h3 className='text-lg font-bold'>{title}</h3>
                <div className="text-[#777]">
                  <span>{moment(createdAt).format("Do MMM YY")}</span> | <span>{moment(schadule).format("HH:mmA")}</span>
                </div>
                <div className='flex items-center justify-between mt-3'>
                  <span className='font-bold'>No. of student’s enrolled: 32</span>
                  <Link className='flex items-center gap-1 text-sm font-bold' to={`/dashboard/quiz-details/${_id}`}>Open  <ArrowRight className='rounded-full bg-mainColor' size={15} strokeWidth={4} color='white' /></Link>

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


      </div>
    </main>
  </>
}

export default Quizzes
