import { Button } from "@/Components"
import { Input, SelectInput, Textarea } from "@/Components/Shared/Inputs/Inputs"
import { AddModel } from "@/Components/Shared/Models/Models"
import { ICreateQuestions } from "@/InterFaces/QuestionsInterFaces"
import { useCreateQuestionMutation } from "@/Redux/Services/Questions/QuestionsSlice"
import { renderErrors } from "@/Utils/Helpers/ErrorMessage/ErrorMessage"
import { FieldValidation } from "@/Utils/Validation"
import { useForm } from "react-hook-form"









interface IAddQuestionsProps {
  isOpen: boolean
  closeModal: () => void
  difficulty: {}[]
  type: {}[]
  Answers: {}[]
}

export const CreateQuestionModal = ({ closeModal, isOpen, difficulty, type, Answers }: IAddQuestionsProps) => {
  const { register, handleSubmit, reset, formState: { errors: addErrors } } = useForm<ICreateQuestions>()
  const [submitCreateQuestion, { isLoading: createLoading }] = useCreateQuestionMutation()
  const handleCreateQuestion = async (data: ICreateQuestions) => {
    console.log(data);

    const response = await submitCreateQuestion(data)
    console.log(response);
    if ('data' in response && response.data.message === "Record created successfully") {
      reset()
      closeModal()
    }
  }


  // export interface ICreateQuestions {

  //   title: string,
  //   description: string,
  //   options: {
  //     A: string,
  //     B: string,
  //     C: string,
  //     D: string
  //   },
  //   answer: string,
  //   difficulty: string,
  //   type: string
  // }


  return <>
    <AddModel title="Set up a new Question"  {...{ isOpen, closeModal }}>
      <form onSubmit={handleSubmit(handleCreateQuestion)}>

        <Input {...register("title", FieldValidation)} label="Title" />
        {renderErrors(addErrors?.title?.message)}

        <Textarea label="Description" {...register("description", FieldValidation)} />
        {renderErrors(addErrors?.description?.message)}

        <div className="grid grid-cols-2 gap-4 mt-4">

          <div className='w-full'>
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

        <div className="flex justify-between items-center gap-4">
          <SelectInput {...register("answer", FieldValidation)} label=" Answer" list={Answers} />
          <SelectInput label=" difficulty" {...register("difficulty", FieldValidation)} list={difficulty} />
          <SelectInput label="type" {...register("type", FieldValidation)} list={type} />
        </div>

        <div className="flex justify-center">
          <Button isLoading={createLoading} rounded={'lg'} className='gap-2 mt-4' variant={"ghost"}>Create Question</Button>
        </div>

      </form>
    </AddModel>
  </>
}

















// interface IDeleteQuizProps {
//   isOpenDeleteModel: boolean
//   closeModalDelete: () => void
//   deleteItemId: string
// }

// export const DeleteQuizModal = ({ isOpenDeleteModel, closeModalDelete, deleteItemId }: IDeleteQuizProps) => {

//   const { handleSubmit: handleSubmitDelete } = useForm()
//   const navigate = useNavigate()
//   const [submitDeleteQuiz, { isLoading: deleteLoading }] = useDeleteQuizMutation()

//   const handleDeleteQuiz = async () => {
//     const response = await submitDeleteQuiz(deleteItemId)
//     if ('data' in response && response.data.message === "Record deleted successfully") {
//       closeModalDelete()
//       navigate('/dashboard/quiz')
//     }
//   }




//   return <>
//     <DeleteModel {...{ isOpenDeleteModel, closeModalDelete }}>
//       <form onSubmit={handleSubmitDelete(handleDeleteQuiz)}>
//         <span className='text-xl font-extrabold'>Confirm Delete</span>
//         <p className="text-sm text-gray-500">
//           Are you sure you want to delete this Quiz ?
//         </p>
//         <div className='flex justify-between mt-4'>
//           <Button onClick={closeModalDelete} rounded={'lg'} type='button' >Cancel</Button>
//           <Button isLoading={deleteLoading} rounded={'lg'} type='submit' variant={"destructive"}>Delete</Button>
//         </div>
//       </form>
//     </DeleteModel>
//   </>
// }

// interface IEditQuizProps {
//   isOpenEditModel: boolean
//   closeModalEdit: () => void
//   refetch: () => void
//   editItemId: string
//   quizTitle: string

// }

// export const EditQuizModal = ({ isOpenEditModel, closeModalEdit, editItemId, quizTitle,refetch }: IEditQuizProps) => {

//   const { handleSubmit, register, formState: { errors } } = useForm<IEditQuiz>()
//   const [submitEditQuiz, { isLoading: editLoading }] = useEditQuizMutation()

//   const handleEditQuiz = async (data: IEditQuiz) => {
//     const response = await submitEditQuiz({ ...data, editItemId })
//     if ('data' in response && response.data.message === "Record updated successfully") {
//       refetch()
//       closeModalEdit()
//     }
//   }


//   return <>
//     <EditModel title="Update Quiz Title"  {...{ isOpenEditModel, closeModalEdit }}>
//       <form onSubmit={handleSubmit(handleEditQuiz)} className="mt-4">
//         <Input label="Title" {...register("title", FieldValidation)} defaultValue={quizTitle} />
//         {renderErrors(errors?.title?.message)}
//         <div className="flex justify-center">
//         <Button isLoading={editLoading} rounded={'lg'} variant={"ghost"} className="mt-4" >Edit Quiz</Button>
//         </div>
//       </form>
//     </EditModel>
//   </>
// }

