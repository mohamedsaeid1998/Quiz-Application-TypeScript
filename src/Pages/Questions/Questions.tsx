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

const Questions = () => {
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
  }, [])

  const openDetailsModel = useCallback((_id: string) => {
    setIsOpenDetailsModel(true)
    setDetailsItem(_id)
  }, [])


  return <>
    <CreateQuestionModal {...{ closeModal, isOpen }} />
    <DeleteQuestionModal {...{ deleteItemId, isOpenDeleteModel, closeModalDelete }} />
    <EditQuestionModal {...{ rightAnswer, isOpenEditModel, closeModalEdit, editItemId }} />
    <DetailsQuestionModal {...{ detailsItemId, isOpenDetailsModel, closeDetailsModel }} />

    <AnimationContainer>
      <div className="p-3 mt-2 overflow-x-auto border-2 rounded-md" >
        {isLoading ? <div className='flex items-center justify-between font-semibold'>
          <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">{""}</h6>
          <h6 className="rounded-full h-[35px] w-[145px] bg-gray-500 animate-pulse">{""} </h6>
        </div>
          : <div className='flex items-center justify-between font-semibold'>
            <h3>{t("BankOfQuestions")}</h3>
            <Button onClick={openModal} variant={'outline'} rounded={'full'} className="gap-2 text-left group "><Plus className='p-1 text-white transition bg-black rounded-full group-hover:bg-white group-hover:text-black duration-0' size={19} strokeWidth={5} /> <span>{t("AddQuestion")}</span> </Button>
          </div>}

        <table className='w-full mt-2 border-separate rounded-md border-slate-400'>
          <thead className='text-white '>
            {isLoading ? <tr >
              <th className='px-2 py-2 bg-black rounded-s-md '><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
              <th className='hidden px-2 py-2 bg-black lg:table-cell'><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md '>{""}</span></th>
              <th className='hidden px-2 py-2 bg-black md:table-cell'><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
              <th className='hidden px-2 py-2 bg-black md:table-cell'><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
              <th className='px-2 py-2 bg-black '><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
              <th className='px-2 py-2 bg-black rounded-e-md'><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
            </tr> :
              <tr>
                <th className='px-2 py-2 font-semibold bg-black rounded-s-md'>TITLE</th>
                <th className='hidden px-2 py-2 font-semibold bg-black lg:table-cell'>DESCRIPTION</th>
                <th className='hidden px-2 py-2 font-semibold bg-black md:table-cell'>RIGHT ANSWER</th>
                <th className='hidden px-2 py-2 font-semibold bg-black md:table-cell'>DIFFICULTY</th>
                <th className='hidden px-2 py-2 font-semibold bg-black md:table-cell'>TYPE</th>
                <th className='px-2 py-2 font-semibold bg-black rounded-e-md'>ACTIONS</th>
              </tr>
            }

          </thead>
          <tbody className='text-center text-gray-500 divide-y'>
            {isLoading ? Array.from({ length: 5 }, (_, idx) => <tr key={idx} className='bg-white dark:border-gray-700 hover:bg-blue-200'>
              <td className='py-3 border whitespace-nowrap border-slate-300 '><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='hidden py-3 border lg:table-cell border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md '>{""}</span></td>
              <td className='hidden py-3 border md:table-cell border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='hidden py-3 border md:table-cell border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='py-3 border border-slate-300'><div className='flex items-center justify-around'><span className='animate-pulse rounded-md mr-1 h-[28px] w-[20px] bg-gray-500 ' /> <span className=' animate-pulse rounded-md mr-1 h-[28px] w-[20px] bg-gray-500 ' /> <span className=' animate-pulse rounded-md mr-1 h-[28px] w-[20px] bg-gray-500 ' /> </div></td>
            </tr>) : null}
            <AnimatePresence initial={false} >
              {currentQuestions?.map(({ title, description, answer, difficulty, type, _id }: IQuestions) => <motion.tr key={_id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ layout: { type: "spring" } }}
                layout
                className='bg-white dark:border-gray-700 hover:bg-blue-200'>
                <td title={title} className='py-3 font-medium truncate border whitespace-nowrap border-slate-300 text-balance max-w-60'>{title}</td>
                <td title={description} className='hidden py-3 font-medium truncate border lg:table-cell whitespace-nowrap border-slate-300 max-w-60'>{description}</td>
                <td className='hidden py-3 font-medium truncate border md:table-cell whitespace-nowrap border-slate-300'>{answer}</td>
                <td className='hidden py-3 font-medium truncate border md:table-cell whitespace-nowrap border-slate-300'>{difficulty}</td>
                <td className='hidden py-3 font-medium truncate border md:table-cell whitespace-nowrap border-slate-300'>{type}</td>
                <td className='p-1 py-3 font-medium truncate border whitespace-nowrap border-slate-300 md:p-3'> <div className='flex items-center justify-around gap-1'><Eye size={22} onClick={() => openDetailsModel(_id)} className='cursor-pointer' color='green' /> <FilePenLine size={22} onClick={() => openModalEdit(_id, answer)} className='cursor-pointer' color='gold' /> <Trash2 size={22} onClick={() => openModalDelete(_id)} className='cursor-pointer' color='red' /></div></td>
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