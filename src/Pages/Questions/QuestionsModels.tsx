import { Button } from "@/Components"
import { DetailsInput } from "@/Components/Shared/DetailsInputs/DetailsInput"
import { Input, SelectInput, Textarea } from "@/Components/Shared/Inputs/Inputs"
import { AddModel, DeleteModel, DetailsModel, EditModel } from "@/Components/Shared/Models/Models"
import { ICreateQuestions, IEditQuestion } from "@/InterFaces/QuestionsInterFaces"
import { useCreateQuestionMutation, useDeleteQuestionMutation, useEditQuestionMutation, useQuestionDetailsQuery } from "@/Redux/Services/Questions/QuestionsSlice"
import { RightAnswers } from "@/Types"
import { renderErrors } from "@/Utils/Helpers/ErrorMessage/ErrorMessage"
import { Answers, difficulty, type } from "@/Utils/Helpers/Variables/Variables"
import { FieldValidation } from "@/Utils/Validation"
import { Loader } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

interface IAddQuestionsProps {
  isOpen: boolean
  closeModal: () => void
}

export const CreateQuestionModal = ({ closeModal, isOpen }: IAddQuestionsProps) => {
  const { register, handleSubmit, reset, formState: { errors: addErrors } } = useForm<ICreateQuestions>()
  const [submitCreateQuestion, { isLoading: createLoading }] = useCreateQuestionMutation()
  const handleCreateQuestion = async (data: ICreateQuestions) => {
    const response = await submitCreateQuestion(data)
    if ('data' in response && response.data.message === "Record created successfully") {
      reset()
      closeModal()
    }
  }


  return <>
    <AddModel title="Set up a new Question"  {...{ isOpen, closeModal }}>
      <form onSubmit={handleSubmit(handleCreateQuestion)}>

        <Input {...register("title", FieldValidation)} label="Title" />
        {renderErrors(addErrors?.title?.message)}

        <Textarea label="Description" {...register("description", FieldValidation)} />
        {renderErrors(addErrors?.description?.message)}

        <div className="grid grid-cols-2 gap-4 mt-4">

          <div className='w-full '>
            <Input {...register("options.A", FieldValidation)} label="A" />
            {renderErrors(addErrors?.options?.A?.message)}
          </div>

          <div className='w-full'>
            <Input {...register("options.B", FieldValidation)} label="B" />
            {renderErrors(addErrors?.options?.B?.message)}
          </div>

          <div className='w-full'>
            <Input {...register("options.C", FieldValidation)} label="C" />
            {renderErrors(addErrors?.options?.C?.message)}
          </div>

          <div className='w-full'>
            <Input {...register("options.D", FieldValidation)} label="D" />
            {renderErrors(addErrors?.options?.D?.message)}
          </div>

        </div>

        <div className="flex flex-col items-center justify-between sm:flex-row sm:gap-4">
          <div className='w-full'>
            <SelectInput {...register("answer", FieldValidation)} label=" Answer" list={Answers} />
          </div>
          <div className='w-full'>
            <SelectInput label=" difficulty" {...register("difficulty", FieldValidation)} list={difficulty} />
          </div>
          <div className='w-full'>
            <SelectInput label="type" {...register("type", FieldValidation)} list={type} />
          </div>
        </div>

        <div className="flex justify-center">
          <Button isLoading={createLoading} rounded={'lg'} className='gap-2 mt-4' variant={"ghost"}>Create Question</Button>
        </div>

      </form>
    </AddModel>
  </>
}

interface IDeleteQuestionProps {
  isOpenDeleteModel: boolean
  closeModalDelete: () => void
  deleteItemId: string
}

export const DeleteQuestionModal = ({ isOpenDeleteModel, closeModalDelete, deleteItemId }: IDeleteQuestionProps) => {

  const { handleSubmit: handleSubmitDelete } = useForm()
  const [submitDeleteQuestion, { isLoading: deleteLoading }] = useDeleteQuestionMutation()

  const handleDeleteQuiz = async () => {
    const response = await submitDeleteQuestion(deleteItemId)
    if ('data' in response && response.data.message === "Record deleted successfully") {
      closeModalDelete()
    }
  }

  return <>
    <DeleteModel {...{ isOpenDeleteModel, closeModalDelete }}>
      <form onSubmit={handleSubmitDelete(handleDeleteQuiz)}>
        <span className='text-xl font-extrabold'>Confirm Delete</span>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this Question ?
        </p>
        <div className='flex justify-between mt-4'>
          <Button onClick={closeModalDelete} rounded={'lg'} type='button' >Cancel</Button>
          <Button isLoading={deleteLoading} rounded={'lg'} type='submit' variant={"destructive"}>Delete</Button>
        </div>
      </form>
    </DeleteModel>
  </>
}

interface IEditQuestionProps {
  isOpenEditModel: boolean
  closeModalEdit: () => void
  editItemId: string
  rightAnswer: typeof RightAnswers
}

export const EditQuestionModal = ({ isOpenEditModel, closeModalEdit, editItemId, rightAnswer }: IEditQuestionProps) => {

  const { handleSubmit, register, setValue } = useForm<IEditQuestion>()
  const [submitEditQuestion, { isLoading: editLoading }] = useEditQuestionMutation()

  const handleEditQuestion = async (data: IEditQuestion) => {
    const response = await submitEditQuestion({ ...data, editItemId })
    if ('data' in response && response.data.message === "Record updated successfully") {
      closeModalEdit()
    }
  }

  useEffect(() => {
    setValue("answer", rightAnswer)
  }, [rightAnswer])

  return <>
    <EditModel title="Update Question Title"  {...{ isOpenEditModel, closeModalEdit }}>
      <form onSubmit={handleSubmit(handleEditQuestion)}>
        <SelectInput label="RightAnswer"  {...register("answer", FieldValidation)} list={Answers} />
        <div className="flex justify-center">
          <Button isLoading={editLoading} rounded={'lg'} variant={"ghost"} className="mt-4" >Edit Question</Button>
        </div>
      </form>
    </EditModel>
  </>
}


interface IDetailsQuestionsProps {
  isOpenDetailsModel: boolean
  closeDetailsModel: () => void
  detailsItemId: string
}

export const DetailsQuestionModal = ({ closeDetailsModel, isOpenDetailsModel, detailsItemId }: IDetailsQuestionsProps) => {

  const { data: questionDetails, status } = useQuestionDetailsQuery(detailsItemId)

  return <>
    <DetailsModel title="Question Details"  {...{ isOpenDetailsModel, closeDetailsModel }}>

      {status === "fulfilled" ? <>
        <DetailsInput label="Title" content={`${questionDetails?.title}`} />


        <DetailsInput className="mt-4" label="Description" content={`${questionDetails?.description}`} />

        <div className="grid grid-cols-2 gap-4 mt-4">

          <div className='w-full'>
            <DetailsInput label="A" content={`${questionDetails?.options?.A}`} />
          </div>

          <div className='w-full'>
            <DetailsInput label="B" content={`${questionDetails?.options?.B}`} />
          </div>

          <div className='w-full'>
            <DetailsInput label="C" content={`${questionDetails?.options?.C}`} />

          </div>

          <div className='w-full'>
            <DetailsInput label="D" content={`${questionDetails?.options?.D}`} />
          </div>

        </div>

        <div className="flex flex-col items-center justify-between gap-3 mt-4 sm:flex-row sm:gap-4 ">
          <div className='w-full'>
            <DetailsInput label="answer" content={`${questionDetails?.answer}`} />
          </div>
          <div className='w-full'>
            <DetailsInput label="type" content={`${questionDetails?.type}`} />
          </div>
          <div className='w-full'>
            <DetailsInput label="difficulty" content={`${questionDetails?.difficulty}`} />
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={closeDetailsModel} rounded={'lg'} className='gap-2 mt-4' variant={"ghost"}>Cancel</Button>
        </div></> : <div className="flex items-center justify-center"><Loader className="animate-spin" size={100} color="#C5D86D" /></div>}

    </DetailsModel>
  </>
}