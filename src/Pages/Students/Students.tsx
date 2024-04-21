
import './Students.module.scss'
import { useTranslation } from 'react-i18next';
import { studentLogo } from '@/Assets/Images';
import { Trash2 } from 'lucide-react';
import { useAllStudentsQuery } from '@/Redux/Services/Students/StudentsSlice';
import { IAllStudents } from '@/InterFaces/StudentsInterFaces';
interface IProps {

}

const Students = ({ }: IProps) => {
  const { t } = useTranslation();
  const { isLoading: loading, data: allStudents } = useAllStudentsQuery(0)

  return <>
    <main className='m-5 mt-3'>
      <div className="border-2 rounded-md p-3" >
        {loading ? <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">{""}</h6> : <h2 className=' font-semibold'>{t("StudentsList")}</h2>}
        <div className=' mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3  '>
          {loading && Array.from({ length: 30 }, (_, idx) => <div key={idx} className="flex items-center justify-between shadow-md p-3 rounded-md">
            <div className='h-[32px] w-[32px] animate-pulse bg-gray-500 rounded-md' />
            <span className='h-[14px] w-[90px] animate-pulse bg-gray-500 rounded-md'>{""}</span>
            <span className='animate-pulse rounded-md h-[28px] w-[20px] bg-gray-500 ' />
          </div>)}
          {allStudents?.map(({ first_name, last_name, _id }:IAllStudents) => <div key={_id} className="flex items-center justify-between shadow-md p-3 rounded-md">
            <img className='bg-secondColor w-8 rounded-md' src={studentLogo} alt="studentLogo" />
            <span className='font-extrabold'>{first_name + " " + last_name}</span>
            <Trash2 className="cursor-pointer" color='#ffd800' />
          </div>
          )}

        </div>
      </div>

    </main>
  </>
}

export default Students