//@ts-nocheck
import { useQuizzesResultsQuery } from '@/Redux/Services/Results/ResultsSlice'
import './Results.module.scss'
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { IResultsResponse } from '@/InterFaces/ResultsInterFaces';
import { Link } from 'react-router-dom';
import { buttonVariants } from '@/Components/Ui/Button';
interface IProps {

}

const Results = ({ }: IProps) => {
  const { t } = useTranslation();
  //? *************** Get QuizzesResults ***************
  const { isLoading, data: quizzesResults } = useQuizzesResultsQuery(0)

  return <>

    <main className='m-5 mt-3'>
      <div className="p-3 mt-2 overflow-x-auto border-2 rounded-md" >
        {isLoading ?
          <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">{""}</h6>
          : <div className='flex justify-between font-semibold'>
            {t("CompletedQuizzes")}
          </div>}
        <table className='w-full  border-separate rounded-md mt-2 border-slate-400'>
          <thead className='text-white '>
            {isLoading ? <tr >
              <th className='px-2 py-2 bg-black rounded-s-md '><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
              <th className='hidden lg:table-cell px-2 py-2 bg-black'><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md '>{""}</span></th>
              <th className=' hidden md:table-cell px-2 py-2  bg-black'><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
              <th className='hidden md:table-cell px-2 py-2 bg-black'><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
              <th className=' px-2 py-2 bg-black'><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
              <th className='px-2 py-2 bg-black rounded-e-md'><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
            </tr> :
              <tr>
                <th className='px-2 py-2 font-semibold bg-black rounded-s-md'>TITLE</th>
                <th className='hidden lg:table-cell px-2 py-2 font-semibold bg-black'>NUMBER OF QUESTIONS</th>
                <th className='hidden md:table-cell px-2 py-2 font-semibold  bg-black'>DIFFICULTY</th>
                <th className='hidden md:table-cell px-2 py-2 font-semibold bg-black'>TYPE</th>
                <th className=' px-2 py-2 font-semibold bg-black'>CLOSED AT</th>
                <th className='px-2 py-2 font-semibold bg-black rounded-e-md'>DETAILS</th>
              </tr>
            }

          </thead>
          <tbody className='text-center text-gray-500 divide-y'>
            {isLoading ? Array.from({ length: 9 }, (_, idx) => <tr key={idx} className='bg-white dark:border-gray-700 hover:bg-blue-200'>
              <td className='py-3 border whitespace-nowrap border-slate-300 '><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='hidden lg:table-cell py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md '>{""}</span></td>
              <td className='hidden md:table-cell  py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='hidden md:table-cell  py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
            </tr>) : null}

            {quizzesResults?.map(({ quiz }: IResultsResponse) => <tr key={quiz?._id} className='bg-white dark:border-gray-700 hover:bg-blue-200'>
              <td className='py-3 font-medium border whitespace-nowrap border-slate-300 truncate'>{quiz?.title}</td>
              <td className='hidden lg:table-cell py-3 font-medium border whitespace-nowrap border-slate-300 truncate'>{quiz?.questions_number}</td>
              <td className='hidden md:table-cell py-3 font-medium border whitespace-nowrap border-slate-300 truncate'>{quiz?.difficulty}</td>
              <td className='hidden md:table-cell py-3 font-medium border whitespace-nowrap border-slate-300 truncate'>{quiz?.type}</td>
              <td className=' py-3 border border-slate-300'>{moment(quiz?.closed_at).format("DD / MM / YYYY")}</td>
              <td className=' py-3 border border-slate-300'><Link to={'/dashboard/results-details'} className={`${buttonVariants({variant:'secondary',rounded:'full', size:"sm"})}`}>View</Link></td>
            </tr>)}


          </tbody>

        </table>
      </div>
    </main>
  </>
}

export default Results