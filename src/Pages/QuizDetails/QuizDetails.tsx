//@ts-nocheck
import { Button } from '@/Components';
import { DetailsInput } from '@/Components/Shared/DetailsInputs/DetailsInput';
import { useQuizzesDetailsQuery } from '@/Redux/Services/Quizzes/QuizzesSlice';
import { CalendarDays, ChevronsRight, Clock, Pencil, SaveAll, Trash2 } from 'lucide-react';
import moment from 'moment';
import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './QuizDetails.module.scss';
import { DeleteQuizModal, EditQuizModal } from './QuizDetailsModels';
interface IProps {

}

const QuizDetails = ({ }: IProps) => {
  const { id } = useParams()
  const { data: QuizData, refetch } = useQuizzesDetailsQuery(id)
  const textRef = useRef<HTMLParagraphElement>(null);

  const handleCopy = () => {
    if (textRef.current) {
      const textToCopy = textRef.current.textContent;
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy);
        toast.success(`Copy Code ${textToCopy}`);
      }
    }
  };


  //! *************** Delete Quiz ***************
  const [deleteItemId, setDeleteItem] = useState("")
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
  const openModalDelete = (_id: string) => {
    setIsOpenDeleteModel(true)
    setDeleteItem(_id)
  }
  const closeModalDelete = () => {
    setIsOpenDeleteModel(false)
    setDeleteItem("")
  }


  //TODO *************** Edit Quiz ***************
  const [editItemId, setEditItem] = useState("")
  const [quizTitle, setQuizTitle] = useState("")
  const [isOpenEditModel, setIsOpenEditModel] = useState(false)

  const closeModalEdit = () => {
    setIsOpenEditModel(false)
    setEditItem("")
    setQuizTitle("")
  }

  const openModalEdit = (_id: string) => {
    setIsOpenEditModel(true)
    setEditItem(_id)
    setQuizTitle(QuizData?.title)
  }

  return <>
    <DeleteQuizModal {...{ closeModalDelete, isOpenDeleteModel, deleteItemId }} />
    <EditQuizModal {...{ quizTitle, isOpenEditModel, closeModalEdit, editItemId, refetch }} />

    <main className='m-5 mt-3 flex justify-center items-center'>
      <div className="p-3 border-2 rounded-md w-fit " >

        <div className=' flex gap-8 items-center'>
          {QuizData ? <>
            <Link className='flex items-center gap-1 text-sm font-bold' to={`/dashboard/quiz`}>Quizzes</Link>
            <ChevronsRight className=' ' size={15} strokeWidth={4} color='#C5D86D' />
            <Link className='flex items-center gap-1 text-sm font-bold' to={`/dashboard/quiz`}>{QuizData?.title}</Link>
          </>
            :
            <>
              <h6 className="h-[12px] mb-2 w-[70px] animate-pulse bg-gray-500 rounded-md">{""}</h6>
              <h6 className="h-[12px] mb-2 w-[70px] animate-pulse bg-gray-500 rounded-md">{""}</h6>
            </>
          }
        </div>
        {QuizData ? <h3 className='text-2xl font-extrabold my-2 tracking-widest'>{QuizData?.title}</h3> : <h6 className=" my-2 h-[14px] mb-2 w-[160px] animate-pulse bg-gray-500 rounded-md">{""}</h6>}

        <div className='flex items-center gap-5'>

          <div className='flex items-center gap-2 '>
            {QuizData ? <><CalendarDays /> {moment(QuizData?.createdAt).format("DD / MM / YYYY")}</> : <h6 className=" mt-1 h-[17px]  w-[120px] animate-pulse bg-gray-500 rounded-md">{""}</h6>}

          </div>
          <div className='flex items-center gap-2 '>
            {QuizData ? <><Clock /> {moment(QuizData?.createdAt).format("HH:mm")}</> : <h6 className=" mt-1  h-[17px]  w-[70px] animate-pulse bg-gray-500 rounded-md">{""}</h6>}

          </div>

        </div>

        <div className='flex flex-col gap-3 mt-5  w-[400px]'>
          {!QuizData ? <>
            {Array.from({ length: 6 }, (_, idx) => <h6 key={idx} className="h-[43.2px] mb-2 w-[400px] animate-pulse bg-gray-500 rounded-md">{""}</h6>)}
            <div className='flex items-center justify-between'>
            <h6 className="h-[30px] mb-2 w-[75px] animate-pulse bg-gray-500 rounded-md">{""}</h6>
            <h6 className="h-[30px] mb-2 w-[75px] animate-pulse bg-gray-500 rounded-md">{""}</h6>
            </div>
          </>
            :
            <>

              <DetailsInput label='Number of questions' content={`${QuizData?.questions_number} Questions`} />
              <DetailsInput label='Score_per_question' content={`${QuizData?.score_per_question} Points`} />
              <DetailsInput title={QuizData?.description} className='mt-0' label='Description' content={`${QuizData?.description}`} />
              <DetailsInput label='difficulty' content={`${QuizData?.difficulty}`} />
              <DetailsInput label='Type' content={`${QuizData?.type == "FE" ? "Frontend Task" : "Backend Task"}`} />
              <DetailsInput ref={textRef} onClick={handleCopy} label='Code' content={QuizData?.code} icon={<SaveAll color='black' />} />
              <div className='flex items-center justify-between'>
                <Button onClick={() => openModalDelete(QuizData?._id)} variant={'destructive'} size={'sm'}><Trash2 size={20} className='me-1' /> Delete</Button>
                <Button onClick={() => openModalEdit(QuizData?._id)} variant={'ghost'} size={'sm'}><Pencil size={20} className='me-1' />Edit</Button>
              </div>

            </>}
        </div>

      </div>
    </main>
  </>
}

export default QuizDetails

