
import { quizImg, userImage } from '@/Assets/Images';
import { AnimationContainer, QuizzesCardSkeleton, StudentCartSkeleton } from '@/Components';
import { IUpcomingQuizzes } from '@/InterFaces/QuizzesInterFaces';
import { ITopFiveStudents } from '@/InterFaces/StudentsInterFaces';
import { useGetFirstUpcomingQuizzesQuery } from '@/Redux/Services/Quizzes/QuizzesSlice';
import { useGetTopFiveStudentsQuery } from '@/Redux/Services/Students/StudentsSlice';
import { ArrowRight } from 'lucide-react';
import moment from "moment";
import { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Home.module.scss';

const Home = () => {

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
    <AnimationContainer>

      <div className='flex flex-col justify-between gap-5 md:flex-row md:gap-5'>
        <div className='flex-1 p-3 border-2 rounded-md '>
          {!allDataLoaded ? <div className='flex justify-between'>
            <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">{""}</h6>
            <h6 className='flex items-center text-xs animate-pulse bg-gray-500 h-[10px] w-[70px] rounded-md '>{""}</h6>
          </div> : <div className='flex justify-between'>
            <h2>{t("UpcomingQuizzes")}</h2>

            <Link className='flex items-center text-xs' to={"/dashboard/quiz"}>{t("QuizDirectory")}  <ArrowRight className='p-1 ' size={23} strokeWidth={4} color='#C5D86D' /></Link>
          </div>}

          {!allDataLoaded && Array.from({ length: 2 }, (_, idx) => <QuizzesCardSkeleton key={idx} />)}
          {allDataLoaded && UpcomingQuizzes?.map(({ title, createdAt, schadule, _id }: IUpcomingQuizzes) => <div key={_id} className='flex items-center mt-4 border-2 rounded-lg '>
            <img src={quizImg} alt="quizImg" className='bg-secondColor w-[120px] p-3 hidden sm:block h-[120px] rounded-md' />
            <div className='w-full p-3 '>
              <h3 className='font-bold '>{title}</h3>
              <div className="text-[#777]">
                <span>{moment(createdAt).format("Do MMM YY")}</span> | <span>{moment(schadule).format("HH:mmA")}</span>
              </div>
              <div className='flex items-center justify-between mt-3'>
                <span className='font-bold'>No. of student’s enrolled: 32</span>
                <Link className='flex items-center gap-1 font-bold' to={`/dashboard/quiz-details/${_id}`}>Open  <ArrowRight className='rounded-full bg-mainColor' size={15} strokeWidth={4} color='white' /></Link>

              </div>
            </div>
          </div>)}

        </div>

        <div className='p-3 border-2 rounded-md '>
          {!allDataLoaded ? <div className='flex justify-between'>
            <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">{""}</h6>
            <h6 className='flex items-center text-xs animate-pulse bg-gray-500 h-[10px] w-[70px] rounded-md '>{""}</h6>
          </div> :
            <div className='flex justify-between'>
              <h2>{t("Top5Students")}</h2>
              <Link className='flex items-center text-xs' to={"/dashboard/quiz"}>{t("AllStudents")}  <ArrowRight className='p-1 ' size={23} strokeWidth={4} color='#C5D86D' /></Link>
            </div>}


          {!allDataLoaded && Array.from({ length: 5 }, (_, idx) => <StudentCartSkeleton key={idx} />)}
          {allDataLoaded && TopFiveStudents?.map(({ first_name, last_name, avg_score, group, _id }: ITopFiveStudents) => <div key={_id} className='flex items-center mt-4 border-2 rounded-lg '>

            <img src={userImage} alt="quizImg" />

            <div className='flex items-center justify-between w-full p-2 '>
              <div>
                <h3 className='font-bold'>{first_name + " " + last_name}</h3>
                <div className="text-[#777]">
                  <span>Group: {group?.name}</span> | <span>Average Score: {avg_score === 0 ? 0.7 : Math.round(avg_score)}</span>
                </div>
              </div>
              <Link to={"/dashboard/student"}> <ArrowRight className=' bg-black rounded-full p-[2.5px] mr-1' size={20} strokeWidth={3} color='white' /></Link>

            </div>

          </div>)}


        </div>
      </div>
    </AnimationContainer>
  </>
}

export default Home