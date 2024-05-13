
import { StudentCard, AnimationContainer, PaginationButtons } from '@/Components';
import { IAllStudents } from '@/InterFaces/StudentsInterFaces';
import { useAllStudentsQuery } from '@/Redux/Services/Students/StudentsSlice';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Students.module.scss';
import { DetailsStudentModal } from './StudentsModels';

const Students = () => {
  const { t } = useTranslation();
  //? *************** Get AllStudents ***************
  const { isLoading: loading, data: allStudents } = useAllStudentsQuery(0)

  //! *************** Pagination ***************
  const [currentPage, setCurrentPage] = useState(0)
  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  }
  const studentsPerPage = 20;
  const startIndex = currentPage * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = allStudents?.slice(startIndex, endIndex);

  //? *************** Get Question Details ***************

  const [isOpenDetailsModel, setIsOpenDetailsModel] = useState(false)
  const [detailsItemId, setDetailsItem] = useState("")
  const closeDetailsModel = () => {
    setIsOpenDetailsModel(false)
    setDetailsItem("")
  }

  const openDetailsModel = (_id: string) => {
    setIsOpenDetailsModel(true)
    setDetailsItem(_id)
  }


  return <>
    <DetailsStudentModal{...{ isOpenDetailsModel, detailsItemId, closeDetailsModel }} />
    <AnimationContainer>
      <div className="border-2 rounded-md p-3" >
        {loading ? <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">{""}</h6> : <h2 className=' font-semibold'>{t("StudentsList")}</h2>}
        <div className=' mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3  '>
          {loading && Array.from({ length: 20 }, (_, idx) => <div key={idx} className="flex items-center justify-between shadow-md p-3 rounded-md">
            <div className='h-[32px] w-[32px] animate-pulse bg-gray-500 rounded-md' />
            <span className='h-[14px] w-[90px] animate-pulse bg-gray-500 rounded-md'>{""}</span>
            <span className='animate-pulse rounded-md h-[28px] w-[20px] bg-gray-500 ' />
          </div>)}
          {currentStudents?.map(({ first_name, last_name, _id }: IAllStudents) =>
            <StudentCard key={_id} {...{ openDetailsModel, _id }} title={first_name + " " + last_name} />
          )}

        </div>
        {!loading && <PaginationButtons members={allStudents} count={studentsPerPage}  {...{ currentPage, handlePageChange }} />}

      </div>
    </AnimationContainer >
  </>
}

export default Students