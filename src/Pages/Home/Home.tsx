
//@ts-nocheck
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { quizImg, userImage } from '@/Assets/Images';
import moment from "moment";
import { useGetFirstUpcomingQuizzesQuery } from '@/Redux/Services/Quizzes/QuizzesSlice';
import { IUpcomingQuizzes } from '@/InterFaces/QuizzesInterFaces';
import { useGetTopFiveStudentsQuery } from '@/Redux/Services/Students/StudentsSlice';
import { ITopFiveStudents } from '@/InterFaces/StudentsInterFaces';
import { QuizzesCardSkeleton, StudentCartSkeleton } from '@/Components';
import { useLayoutEffect, useState } from 'react';
import './Home.module.scss'

interface IProps {

}

const Home = ({ }: IProps) => {

  const { isLoading: quizzesLoading, data: UpcomingQuizzes } = useGetFirstUpcomingQuizzesQuery(0)
  const { isLoading: studentsLoading, data: TopFiveStudents } = useGetTopFiveStudentsQuery(0)
  const { t } = useTranslation();
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  useLayoutEffect(() => {
    if (!quizzesLoading && !studentsLoading) {
      setAllDataLoaded(true);
    }
  }, [UpcomingQuizzes, TopFiveStudents, quizzesLoading, studentsLoading]);

  return <>
    <main className='m-5 mt-3 flex justify-between space-x-5'>

      <div className=' border-2 rounded-md p-3 w-[55%]'>

        {!allDataLoaded ? <div className='flex justify-between'>
          <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">{""}</h6>
          <h6 className='flex items-center text-xs animate-pulse bg-gray-500 h-[10px] w-[70px] rounded-md '>{""}</h6>
        </div> : <div className='flex justify-between'>
          {t("UpcomingQuizzes")}
          <Link className='flex items-center text-xs' to={"/dashboard/quiz"}>{t("QuizDirectory")}  <ArrowRight className=' p-1' size={23} strokeWidth={4} color='#C5D86D' /></Link>
        </div>}


        {!allDataLoaded && Array.from({ length: 2 }, (_, idx) => <QuizzesCardSkeleton key={idx} />)}
        {allDataLoaded && UpcomingQuizzes?.map(({ title, createdAt, schadule, _id }: IUpcomingQuizzes) => <div key={_id} className=' border-2 flex items-center mt-4 rounded-lg'>

          <img src={quizImg} alt="quizImg" />
          <div className='p-3 w-full '>
            <h3 className='font-bold text-lg'>{title}</h3>
            <div className="text-[#777]">
              <span>{moment(createdAt).format("Do MMM YY")}</span> | <span>{moment(schadule).format("HH:mmA")}</span>
            </div>
            <div className='flex justify-between items-center mt-3'>
              <span className='font-bold'>No. of student’s enrolled: 32</span>
              <Link className='flex items-center text-sm gap-1 font-bold' to={"/dashboard/quiz"}>Open  <ArrowRight className='bg-mainColor rounded-full' size={15} strokeWidth={4} color='white' /></Link>

            </div>
          </div>
        </div>)}


      </div>


      <div className=' border-2 rounded-md p-3 w-[45%]'>
        {!allDataLoaded ? <div className='flex justify-between'>
          <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">{""}</h6>
          <h6 className='flex items-center text-xs animate-pulse bg-gray-500 h-[10px] w-[70px] rounded-md '>{""}</h6>
        </div> :
          <div className='flex justify-between'>
            {t("Top5Students")}
            <Link className='flex items-center text-xs' to={"/dashboard/quiz"}>{t("AllStudents")}  <ArrowRight className=' p-1' size={23} strokeWidth={4} color='#C5D86D' /></Link>
          </div>}


        {!allDataLoaded && Array.from({ length: 5 }, (_, idx) => <StudentCartSkeleton key={idx} />)}
        {allDataLoaded && TopFiveStudents?.map(({ first_name, last_name, avg_score, group, _id }: ITopFiveStudents) => <div key={_id} className=' border-2 flex items-center mt-4 rounded-lg'>

          <img src={userImage} alt="quizImg" />


          <div className='p-2 w-full flex justify-between items-center '>
            <div>
              <h3 className='font-bold text-lg'>{first_name + " " + last_name}</h3>
              <div className="text-[#777]">
                <span>Group: {group?.name}</span> | <span>Average Score: {avg_score === 0 ? 0.7 : Math.round(avg_score)}</span>
              </div>
            </div>
            <Link to={"/dashboard/quiz"}> <ArrowRight className=' bg-black rounded-full p-[2.5px] mr-1' size={20} strokeWidth={3} color='white' /></Link>

          </div>

        </div>)}


      </div>

    </main>
  </>
}

export default Home