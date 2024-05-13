import { AnimationContainer, PaginationButtons } from '@/Components';
import Button from '@/Components/Ui/Button';
import { IResultsResponse } from '@/InterFaces/ResultsInterFaces';
import { useQuizzesResultsQuery } from '@/Redux/Services/Results/ResultsSlice';
import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './Results.module.scss';
import CookieServices from '@/Services/CookieServices/CookieServices';

const Results = () => {
  const { t } = useTranslation();

  //? *************** Get QuizzesResults ***************
  const { isLoading, data: quizzesResults } = useQuizzesResultsQuery(0)

  //! *************** Pagination ***************
  const [currentPage, setCurrentPage] = useState(0)
  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  }
  const ResultsPerPage = 7;
  const startIndex = currentPage * ResultsPerPage;
  const endIndex = startIndex + ResultsPerPage;
  const currentResults = quizzesResults?.slice(startIndex, endIndex);

  //! *************** Navigation To ResultsDetails  ***************
  const navigate = useNavigate();

  const handleResultDetails = (data: IResultsResponse) => {
    navigate('/dashboard/results-details', { state: data });
  }
  return <>

    <AnimationContainer>
      <div className="p-3 mt-2 overflow-x-auto border-2 rounded-md" >
        {isLoading ?
          <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">{""}</h6>
          : <div className='flex justify-between font-semibold'>
            <h2> {t("CompletedQuizzes")}</h2>
          </div>}
        <table className='w-full my-2 border-separate rounded-md border-slate-400'>
          <thead className='text-white '>
            {isLoading ? <tr >
              <th className='px-2 py-2 bg-black rounded-s-md '><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
              <th className='hidden px-2 py-2 bg-black lg:table-cell'><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md '>{""}</span></th>
              <th className='hidden px-2 py-2 bg-black md:table-cell'><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
              <th className='hidden px-2 py-2 bg-black md:table-cell'><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
              <th className='px-2 py-2 bg-black '><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
              {CookieServices.get('role').role === "Student" ? null : <th className='px-2 py-2 bg-black rounded-e-md'><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>}
            </tr> :
              <tr>
                <th className='px-2 py-2 font-semibold bg-black rounded-s-md'>TITLE</th>
                <th className='hidden px-2 py-2 font-semibold bg-black lg:table-cell'>NUMBER OF QUESTIONS</th>
                <th className='hidden px-2 py-2 font-semibold bg-black md:table-cell'>DIFFICULTY</th>
                <th className='hidden px-2 py-2 font-semibold bg-black md:table-cell'>TYPE</th>
                <th className='px-2 py-2 font-semibold bg-black '>CLOSED AT</th>
                {CookieServices.get('role').role === "Student" ? null : <th className='px-2 py-2 font-semibold bg-black rounded-e-md'>DETAILS</th>}
              </tr>}

          </thead>
          <tbody className='text-center text-gray-500 divide-y'>
            {isLoading ? Array.from({ length: 7 }, (_, idx) => <tr key={idx} className='bg-white dark:border-gray-700 hover:bg-blue-200'>
              <td className='py-3 border whitespace-nowrap border-slate-300 '><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='hidden py-3 border lg:table-cell border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md '>{""}</span></td>
              <td className='hidden py-3 border md:table-cell border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='hidden py-3 border md:table-cell border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              {CookieServices.get('role').role === "Student" ? null : <td className='py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>}
            </tr>) : null}

            {currentResults?.map(({ quiz, participants }: IResultsResponse) => <tr key={quiz?._id} className='bg-white dark:border-gray-700 hover:bg-blue-200'>
              <td className='py-3 font-medium truncate border whitespace-nowrap border-slate-300'>{quiz?.title}</td>
              <td className='hidden py-3 font-medium truncate border lg:table-cell whitespace-nowrap border-slate-300'>{quiz?.questions_number}</td>
              <td className='hidden py-3 font-medium truncate border md:table-cell whitespace-nowrap border-slate-300'>{quiz?.difficulty}</td>
              <td className='hidden py-3 font-medium truncate border md:table-cell whitespace-nowrap border-slate-300'>{quiz?.type}</td>
              <td className='py-3 border border-slate-300'>{moment(quiz?.closed_at).format("DD / MM / YYYY")}</td>
              {CookieServices.get('role').role === "Student" ? null : <td className='py-3 border border-slate-300'><Button onClick={() => handleResultDetails({ quiz, participants })} variant={"secondary"} size={"sm"} rounded={"full"}  >View</Button></td>}
            </tr>)}

          </tbody>

        </table>
        {!isLoading && <PaginationButtons members={quizzesResults} count={ResultsPerPage}  {...{ currentPage, handlePageChange }} />}

      </div>
    </AnimationContainer>
  </>
}

export default Results