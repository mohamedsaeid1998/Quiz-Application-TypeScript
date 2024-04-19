import { useAllQuestionsQuery } from '@/Redux/Services/Questions/QuestionsSlice'
import './Questions.module.scss'
import { Button } from '@/Components';
import { Eye, FilePenLine, Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { CreateQuestionModal } from './QuestionsModels';
import { IQuestions } from '@/InterFaces/QuestionsInterFaces';
interface IProps {

}

const Questions = ({ }: IProps) => {
  const { t } = useTranslation();

  //? ***************Get Questions ***************
  const { data: allQuestions, isLoading } = useAllQuestionsQuery(0)

  //* ***************Create New Question ***************
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const difficulty = [
    { _id: "easy", title: "Easy" },
    { _id: "medium", title: "Medium" },
    { _id: "hard", title: "Hard" },
  ]

  const Answers = [
    { _id: "A", title: "A" },
    { _id: "B", title: "B" },
    { _id: "C", title: "C" },
    { _id: "D", title: "D" },
  ]

  const type = [
    { _id: "FE", title: "FE" },
    { _id: "BE", title: "BE" },
  ]

  return <>
    <CreateQuestionModal {...{ closeModal, isOpen, difficulty, type, Answers }} />


    <main className='m-5 mt-3'>
      <div className="p-3 mt-2 overflow-x-auto border-2 rounded-md" >
        {isLoading ? <div className='flex justify-between items-center font-semibold'>
          <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">{""}</h6>
          <h6 className="rounded-full h-[35px] w-[145px] bg-gray-500 animate-pulse">{""} </h6>
        </div>
          : <div className='flex justify-between items-center font-semibold'>
            {t("BankOfQuestions")}
            <Button onClick={openModal} variant={'outline'} rounded={'full'} className="text-left gap-2 group"><Plus className='bg-black group-hover:bg-white rounded-full p-1 text-2xl text-white group-hover:text-black transition duration-0' size={20} strokeWidth={5} /> {t("AddQuestion")} </Button>
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
                <th className='hidden lg:table-cell px-2 py-2 font-semibold bg-black'>DESCRIPTION</th>
                <th className=' px-2 py-2 font-semibold bg-black'>RIGHT ANSWER</th>
                <th className='hidden md:table-cell px-2 py-2 font-semibold  bg-black'>DIFFICULTY</th>
                <th className='hidden md:table-cell px-2 py-2 font-semibold bg-black'>TYPE</th>
                <th className='px-2 py-2 font-semibold bg-black rounded-e-md'>ACTIONS</th>
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
              <td className='py-3 border border-slate-300'><div className='flex justify-around items-center'><span className='animate-pulse rounded-md mr-1 h-[28px] w-[20px] bg-gray-500 ' /> <span className=' animate-pulse rounded-md mr-1 h-[28px] w-[20px] bg-gray-500 ' /> <span className=' animate-pulse rounded-md mr-1 h-[28px] w-[20px] bg-gray-500 ' /> </div></td>
            </tr>) : null}

            {allQuestions?.map(({ title, description, answer, difficulty, type, _id }: IQuestions) => <tr key={_id} className='bg-white dark:border-gray-700 hover:bg-blue-200'>
              <td title={title} className='py-3 font-medium border whitespace-nowrap border-slate-300 truncate text-balance max-w-60'>{title}</td>
              <td className='hidden lg:table-cell py-3 font-medium border whitespace-nowrap border-slate-300 truncate max-w-60'>{description}</td>
              <td className='hidden md:table-cell py-3 font-medium border whitespace-nowrap border-slate-300 truncate'>{answer}</td>
              <td className='hidden md:table-cell py-3 font-medium border whitespace-nowrap border-slate-300 truncate'>{difficulty}</td>
              <td className='hidden md:table-cell py-3 font-medium border whitespace-nowrap border-slate-300 truncate'>{type}</td>
              <td className='py-3 font-medium border whitespace-nowrap border-slate-300 truncate  p-3'> <div className='flex justify-around items-center'><Eye className='cursor-pointer' color='green' /> <FilePenLine className='cursor-pointer' color='gold' /> <Trash2 className='cursor-pointer' color='red' /></div></td>
            </tr>)}


          </tbody>

        </table>
      </div>
    </main>
  </>
}

export default Questions