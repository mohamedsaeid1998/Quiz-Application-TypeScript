import { Button } from "@/Components"
import { Input } from "@/Components/Shared/Inputs/Inputs"
import { DeleteModel, EditModel } from "@/Components/Shared/Models/Models"
import { IEditQuiz } from "@/InterFaces/QuizzesInterFaces"
import { useDeleteQuizMutation, useEditQuizMutation } from "@/Redux/Services/Quizzes/QuizzesSlice"
import { renderErrors } from "@/Utils/Helpers/ErrorMessage/ErrorMessage"
import { FieldValidation } from "@/Utils/Validation"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

interface IDeleteQuizProps {
  isOpenDeleteModel: boolean
  closeModalDelete: () => void
  deleteItemId: string
}

export const DeleteQuizModal = ({ isOpenDeleteModel, closeModalDelete, deleteItemId }: IDeleteQuizProps) => {

  const { handleSubmit: handleSubmitDelete } = useForm()
  const navigate = useNavigate()
  const [submitDeleteQuiz, { isLoading: deleteLoading }] = useDeleteQuizMutation()

  const handleDeleteQuiz = async () => {
    const response = await submitDeleteQuiz(deleteItemId)
    if ('data' in response && response.data.message === "Record deleted successfully") {
      closeModalDelete()
      navigate('/dashboard/quiz')
    }
  }

  return <>
    <DeleteModel {...{ isOpenDeleteModel, closeModalDelete }}>
      <form onSubmit={handleSubmitDelete(handleDeleteQuiz)}>
        <span className='text-xl font-extrabold'>Confirm Delete</span>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this Quiz ?
        </p>
        <div className='flex justify-between mt-4'>
          <Button onClick={closeModalDelete} rounded={'lg'} type='button' >Cancel</Button>
          <Button isLoading={deleteLoading} rounded={'lg'} type='submit' variant={"destructive"}>Delete</Button>
        </div>
      </form>
    </DeleteModel>
  </>
}

interface IEditQuizProps {
  isOpenEditModel: boolean
  closeModalEdit: () => void
  refetch: () => void
  editItemId: string
  quizTitle: string
}

export const EditQuizModal = ({ isOpenEditModel, closeModalEdit, editItemId, quizTitle, refetch }: IEditQuizProps) => {

  const { handleSubmit, register, formState: { errors } } = useForm<IEditQuiz>()
  const [submitEditQuiz, { isLoading: editLoading }] = useEditQuizMutation()

  const handleEditQuiz = async (data: IEditQuiz) => {
    const response = await submitEditQuiz({ ...data, editItemId })
    if ('data' in response && response.data.message === "Record updated successfully") {
      refetch()
      closeModalEdit()
    }
  }
  
  return <>
    <EditModel title="Update Quiz Title"  {...{ isOpenEditModel, closeModalEdit }}>
      <form onSubmit={handleSubmit(handleEditQuiz)} className="mt-4">
        <Input label="Title" {...register("title", FieldValidation)} defaultValue={quizTitle} />
        {renderErrors(errors?.title?.message)}
        <div className="flex justify-center">
          <Button isLoading={editLoading} rounded={'lg'} variant={"ghost"} className="mt-4" >Edit Quiz</Button>
        </div>
      </form>
    </EditModel>
  </>
}

