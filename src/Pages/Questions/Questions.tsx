import { AnimationContainer, Button, PaginationButtons } from '@/Components';
import { IQuestions } from '@/InterFaces/QuestionsInterFaces';
import { useAllQuestionsQuery } from '@/Redux/Services/Questions/QuestionsSlice';
import { Eye, FilePenLine, Plus, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Questions.module.scss';
import { CreateQuestionModal, DeleteQuestionModal, DetailsQuestionModal, EditQuestionModal } from './QuestionsModels';
import { RightAnswers } from '@/Types';
import { AnimatePresence, motion } from 'framer-motion';

interface IProps {

}

const Questions = ({ }: IProps) => {
  const { t } = useTranslation();

  //? ***************Get Questions ***************
  const { data: allQuestions, isLoading } = useAllQuestionsQuery(0)

  const [currentPage, setCurrentPage] = useState(0)

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  }
  const questionsPerPage = 5;
  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = allQuestions?.slice(startIndex, endIndex);

  //* ***************Create New Question ***************
  const [isOpen, setIsOpen] = useState(false)
  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  //! *************** Delete Question ***************
  const [deleteItemId, setDeleteItem] = useState("")
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
  const openModalDelete = useCallback((_id: string) => {
    setIsOpenDeleteModel(true)
    setDeleteItem(_id)
  }, [])
  const closeModalDelete = useCallback(() => {
    setIsOpenDeleteModel(false)
    setDeleteItem("")
  }, [])

  //TODO *************** Edit Question ***************
  const [editItemId, setEditItem] = useState("")
  const [rightAnswer, setRightAnswer] = useState<typeof RightAnswers>("A")
  const [isOpenEditModel, setIsOpenEditModel] = useState(false)

  const closeModalEdit = useCallback(() => {
    setIsOpenEditModel(false)
    setEditItem("")
    setRightAnswer("A")
  }, [])

  const openModalEdit = useCallback((_id: string, answer: typeof RightAnswers) => {
    setIsOpenEditModel(true)
    setEditItem(_id)
    setRightAnswer(answer)
  }, [])

  //? *************** Get Question Details ***************

  const [isOpenDetailsModel, setIsOpenDetailsModel] = useState(false)
  const [detailsItemId, setDetailsItem] = useState("")
  const closeDetailsModel = useCallback(() => {
    setIsOpenDetailsModel(false)
    setDetailsItem("")
  },[])

  const openDetailsModel = useCallback((_id: string) => {
    setIsOpenDetailsModel(true)
    setDetailsItem(_id)
  },[])


  return <>
    <CreateQuestionModal {...{ closeModal, isOpen }} />
    <DeleteQuestionModal {...{ deleteItemId, isOpenDeleteModel, closeModalDelete }} />
    <EditQuestionModal {...{ rightAnswer, isOpenEditModel, closeModalEdit, editItemId }} />
    <DetailsQuestionModal {...{ detailsItemId, isOpenDetailsModel, closeDetailsModel }} />

    <AnimationContainer>
      <div className="p-3 mt-2 overflow-x-auto border-2 rounded-md" >
        {isLoading ? <div className='flex justify-between items-center font-semibold'>
          <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">{""}</h6>
          <h6 className="rounded-full h-[35px] w-[145px] bg-gray-500 animate-pulse">{""} </h6>
        </div>
          : <div className='flex justify-between items-center font-semibold'>
            <h3>{t("BankOfQuestions")}</h3>
            <Button onClick={openModal} variant={'outline'} rounded={'full'} className="text-left gap-2 group "><Plus className='bg-black group-hover:bg-white rounded-full p-1  text-white group-hover:text-black transition duration-0' size={19} strokeWidth={5} /> <span>{t("AddQuestion")}</span> </Button>
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
                <th className=' hidden md:table-cell px-2 py-2 font-semibold bg-black'>RIGHT ANSWER</th>
                <th className='hidden md:table-cell px-2 py-2 font-semibold  bg-black'>DIFFICULTY</th>
                <th className='hidden md:table-cell px-2 py-2 font-semibold bg-black'>TYPE</th>
                <th className='px-2 py-2 font-semibold bg-black rounded-e-md'>ACTIONS</th>
              </tr>
            }

          </thead>
          <tbody className='text-center text-gray-500 divide-y'>
            {isLoading ? Array.from({ length: 5 }, (_, idx) => <tr key={idx} className='bg-white dark:border-gray-700 hover:bg-blue-200'>
              <td className='py-3 border whitespace-nowrap border-slate-300 '><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='hidden lg:table-cell py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md '>{""}</span></td>
              <td className='hidden md:table-cell  py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='hidden md:table-cell  py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='py-3 border border-slate-300'><div className='flex justify-around items-center'><span className='animate-pulse rounded-md mr-1 h-[28px] w-[20px] bg-gray-500 ' /> <span className=' animate-pulse rounded-md mr-1 h-[28px] w-[20px] bg-gray-500 ' /> <span className=' animate-pulse rounded-md mr-1 h-[28px] w-[20px] bg-gray-500 ' /> </div></td>
            </tr>) : null}
            <AnimatePresence initial={false} >
              {currentQuestions?.map(({ title, description, answer, difficulty, type, _id }: IQuestions) => <motion.tr key={_id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ layout: { type: "spring" } }}
                layout
                className='bg-white dark:border-gray-700 hover:bg-blue-200'>
                <td title={title} className='py-3 font-medium border whitespace-nowrap border-slate-300 truncate text-balance max-w-60'>{title}</td>
                <td title={description} className='hidden lg:table-cell py-3 font-medium border whitespace-nowrap border-slate-300 truncate max-w-60'>{description}</td>
                <td className='hidden md:table-cell py-3 font-medium border whitespace-nowrap border-slate-300 truncate'>{answer}</td>
                <td className='hidden md:table-cell py-3 font-medium border whitespace-nowrap border-slate-300 truncate'>{difficulty}</td>
                <td className='hidden md:table-cell py-3 font-medium border whitespace-nowrap border-slate-300 truncate'>{type}</td>
                <td className='py-3 font-medium border whitespace-nowrap border-slate-300 truncate  p-3'> <div className='flex justify-around items-center'><Eye onClick={() => openDetailsModel(_id)} className='cursor-pointer' color='green' /> <FilePenLine onClick={() => openModalEdit(_id, answer)} className='cursor-pointer' color='gold' /> <Trash2 onClick={() => openModalDelete(_id)} className='cursor-pointer' color='red' /></div></td>
              </motion.tr>)}
            </AnimatePresence>

          </tbody>

        </table>
        {!isLoading && <PaginationButtons members={allQuestions} count={questionsPerPage}  {...{ currentPage, handlePageChange }} />}
      </div>
    </AnimationContainer>

  </>
}

export default Questions