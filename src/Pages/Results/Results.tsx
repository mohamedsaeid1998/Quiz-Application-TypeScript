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
            {isLoading ? <tr className=' [&_th]:px-2 [&_th]:py-2 [&_th]:bg-black [&_span]:inline-block [&_span]:h-[12px] [&_span]:w-[80px] [&_span]:animate-pulse [&_span]:bg-gray-500 [&_span]:rounded-md'>
              <th className='rounded-s-md'><span>{""}</span></th>
              <th className='hidden lg:table-cell'><span>{""}</span></th>
              <th className='hidden md:table-cell'><span>{""}</span></th>
              <th className='hidden md:table-cell'><span>{""}</span></th>
              <th><span>{""}</span></th>
              {CookieServices.get('role').role === "Student" ? null : <th className='rounded-e-md'><span>{""}</span></th>}
            </tr> :
              <tr className='[&_th]:px-2 [&_th]:py-2 [&_th]:bg-black [&_th]:font-semibold'>
                <th className='rounded-s-md'>TITLE</th>
                <th className='hidden lg:table-cell'>NUMBER OF QUESTIONS</th>
                <th className='hidden md:table-cell'>DIFFICULTY</th>
                <th className='hidden md:table-cell'>TYPE</th>
                <th>CLOSED AT</th>
                {CookieServices.get('role').role === "Student" ? null : <th className='rounded-e-md'>DETAILS</th>}
              </tr>}

          </thead>
          <tbody className='text-center text-gray-500 divide-y'>
            {isLoading ? Array.from({ length: 7 }, (_, idx) => <tr key={idx} className='bg-white dark:border-gray-700 hover:bg-blue-200
             [&_td]:py-3 [&_td]:border [&_td]:border-slate-300
             [&_span]:inline-block [&_span]:h-[14px] [&_span]:w-[80px] [&_span]:animate-pulse [&_span]:bg-gray-500 [&_span]:rounded-md'>
              <td className='whitespace-nowrap '><span>{""}</span></td>
              <td className='hidden lg:table-cell'><span>{""}</span></td>
              <td className='hidden md:table-cell'><span>{""}</span></td>
              <td className='hidden md:table-cell'><span>{""}</span></td>
              <td><span>{""}</span></td>
              {CookieServices.get('role').role === "Student" ? null : <td><span>{""}</span></td>}
            </tr>) : null}

            {currentResults?.map(({ quiz, participants }: IResultsResponse) => 
            <tr key={quiz?._id} className='bg-white dark:border-gray-700 hover:bg-blue-200
           [&_td]:py-3 [&_td]:border [&_td]:border-slate-300'>
              <td className='whitespace-nowrap font-medium truncate'>{quiz?.title}</td>
              <td className='hidden whitespace-nowrap font-medium truncate lg:table-cell'>{quiz?.questions_number}</td>
              <td className='hidden whitespace-nowrap font-medium truncate md:table-cell'>{quiz?.difficulty}</td>
              <td className='hidden whitespace-nowrap font-medium truncate md:table-cell'>{quiz?.type}</td>
              <td>{moment(quiz?.closed_at).format("DD / MM / YYYY")}</td>
              {CookieServices.get('role').role === "Student" ? null : <td><Button onClick={() => handleResultDetails({ quiz, participants })} variant={"secondary"} size={"sm"} rounded={"full"}  >View</Button></td>}
            </tr>)}

          </tbody>

        </table>
        {!isLoading && <PaginationButtons members={quizzesResults} count={ResultsPerPage}  {...{ currentPage, handlePageChange }} />}

      </div>
    </AnimationContainer>
  </>
}

export default Results