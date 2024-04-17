
import { Button } from "@/Components"
import { DateInput, Input, SelectInput, Textarea } from "@/Components/Shared/Inputs/Inputs"
import { AddModel, InfoModel } from "@/Components/Shared/Models/Models"
import { ICreateQuiz } from "@/InterFaces/QuizzesInterFaces"
import { useCreateQuizMutation } from "@/Redux/Services/Quizzes/QuizzesSlice"
import { renderErrors } from "@/Utils/Helpers/ErrorMessage/ErrorMessage"
import { FieldValidation } from "@/Utils/Validation"
import { Loader, SaveAll } from "lucide-react"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

interface IAddQuizzesProps {
  isOpen: boolean
  openInfoModel: (code: string) => void
  closeModal: () => void
  duration: {}[]
  questions_number: {}[]
  difficulty: {}[]
  type: {}[]
  groupsList: []
  groupsLoading: boolean
}

export const CreateQuizModal = ({ closeModal, isOpen, duration, questions_number, difficulty, type, groupsList, groupsLoading, openInfoModel }: IAddQuizzesProps) => {
  const { register, handleSubmit, reset, formState: { errors: addErrors } } = useForm<ICreateQuiz>()
  const [submitCreateQuiz, { isLoading: createLoading }] = useCreateQuizMutation()
  const handleCreateQuiz = async (data: ICreateQuiz) => {
    const response = await submitCreateQuiz(data)
    console.log(response);
    if ('data' in response && response.data.message === "Record created successfully") {
      const { code } = response?.data?.data
      reset()
      closeModal()
      openInfoModel(code)
    }
  }

  return <>
    <AddModel title="Set up a new quiz"  {...{ isOpen, closeModal }}>
      {groupsLoading && <div className="flex justify-center items-center"><Loader className="animate-spin" size={100} color="#C5D86D" /></div>}
      {!groupsLoading && <form onSubmit={handleSubmit(handleCreateQuiz)}>

        <Input {...register("title", FieldValidation)} label="Title" />
        {renderErrors(addErrors?.title?.message)}
        <div className="flex justify-between items-center space-x-5">


          <SelectInput label="Duration" {...register("duration", FieldValidation)} list={duration} />
          {renderErrors(addErrors?.duration?.message)}


          <SelectInput label="Questions_number" {...register("questions_number", FieldValidation)} list={questions_number} />
          {renderErrors(addErrors?.questions_number?.message)}


          <SelectInput label="Score_per_question" {...register("score_per_question", FieldValidation)} list={questions_number} />
          {renderErrors(addErrors?.score_per_question?.message)}

        </div>

        <Textarea label="Description" {...register("description", FieldValidation)} />
        {renderErrors(addErrors?.description?.message)}
        <DateInput label="Schedule" {...register("schadule", FieldValidation)} />
        {renderErrors(addErrors?.schadule?.message)}
        <div className="flex justify-between items-center space-x-5">

          <SelectInput label="level" {...register("difficulty", FieldValidation)} list={difficulty} />
          {renderErrors(addErrors?.difficulty?.message)}



          <SelectInput label="Category" {...register("type", FieldValidation)} list={type} />
          {renderErrors(addErrors?.type?.message)}


          <div className={` mt-4 flex flex-1 border-2 rounded-lg focus-within:border-mainColor focus-within: outline-none focus-within:ring-1 focus-within:ring-mainColor `}>
            <label htmlFor="group" className='bg-secondColor p-2 font-semibold  flex justify-center min-w-20 items-center'>
              Group
            </label>
            <select id="group" {...register("group", FieldValidation)} className="px-2 rounded-r-md outline-none flex-1 border-none text-center  bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-400  sm:text-sm sm:leading-6"  >
              {groupsList?.map(({ _id, name }: any) => (
                <option
                  key={_id}
                  value={_id}
                  className="text-black"
                >
                  {name}
                </option>
              ))}
            </select>
          </div>
          {renderErrors(addErrors?.group?.message)}

        </div>

        <div className="flex justify-center">
          <Button isLoading={createLoading} rounded={'lg'} className='gap-2 mt-4' variant={"destructive"}>Create Quiz</Button>
        </div>

      </form>}
    </AddModel>
  </>
}




interface IInfoQuizProps {
  isOpenInfoModel: boolean
  closeInfoModel: () => void
  quizCode: string
}


export const InfoQuizModal = ({ isOpenInfoModel, closeInfoModel, quizCode }: IInfoQuizProps) => {

  const textRef = useRef<HTMLParagraphElement>(null);

  const handleCopy = () => {

    if (textRef.current) {
      const textToCopy = textRef?.current?.textContent
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy);
        toast.success(`Copy Code ${textToCopy}`);
        closeInfoModel()
      }
    }
  };
  return <>
    <InfoModel {...{ closeInfoModel, isOpenInfoModel }}>

      <div onClick={handleCopy} className={`w-full flex border-2 rounded-lg focus-within:border-mainColor focus-within: outline-none focus-within:ring-1 focus-within:ring-mainColor `}>
        <label htmlFor="Info" className='bg-secondColor p-2 font-semibold  flex justify-center min-w-20'>
          Code
        </label>
        <p ref={textRef} id="Info" className=" pl-3 text-black  outline-none flex-1 border-none  bg-transparent py-1.5 placeholder:text-gray-400  caret-mainColor " >
          {quizCode}
        </p>
        <span className="flex items-center me-3 pl-3 text-white ">
          <SaveAll color='black' />
        </span>
      </div>

    </InfoModel>
  </>
}




// {
//   "title":"first quiz",
//   "description":"",
//   "group":"65c2bed779b859ea9320885f",
//   "questions_number":1,
//   "difficulty":"medium",
//   "type":"BE",
//   "schadule":"2024-02-15T21:19:34",
//   "duration":"60",
//   "score_per_question":"5"
// }








// interface IDeleteGroupProps {
//   isOpenDeleteModel: boolean
//   closeModalDelete: () => void
//   studentsRefetch: () => void
//   deleteItemId: string
// }

// export const DeleteGroupModal = ({ isOpenDeleteModel, closeModalDelete, studentsRefetch, deleteItemId }: IDeleteGroupProps) => {

//   const { handleSubmit: handleSubmitDelete } = useForm<IDeleteGroup>()

//   const [submitDeleteGroup, { isLoading: deleteLoading }] = useDeleteGroupMutation()

//   const handleDeleteGroup = async (data: IDeleteGroup) => {
//     const response = await submitDeleteGroup({ ...data, deleteItemId })
//     if ('data' in response && response.data.message === "Record deleted successfully") {
//       closeModalDelete()
//       studentsRefetch();
//     }
//   }




//   return <>
//     <DeleteModel {...{ isOpenDeleteModel, closeModalDelete }}>
//       <form onSubmit={handleSubmitDelete(handleDeleteGroup)}>
//         <span className='text-xl font-extrabold'>Confirm Delete</span>
//         <p className="text-sm text-gray-500">
//           Are you sure you want to delete this Group ?
//         </p>
//         <div className='flex justify-between mt-4'>
//           <Button isLoading={deleteLoading} rounded={'lg'} type='submit' variant={"destructive"}>Delete</Button>
//           <Button onClick={closeModalDelete} rounded={'lg'} type='button' >Cancel</Button>
//         </div>
//       </form>
//     </DeleteModel>
//   </>
// }

// interface IEditGroupProps {
//   isOpenEditModel: boolean
//   closeModalEdit: () => void
//   studentsRefetch: () => void
//   editItemId: string
//   editRegister: UseFormRegister<IGroups>
//   handleSubmitEdit: UseFormHandleSubmit<IGroups, undefined>
//   errors: FieldErrors<IGroups>
//   allStudents: []
//   loadingData: boolean
// }

// export const EditGroupModal = ({ loadingData, isOpenEditModel, closeModalEdit, editItemId, studentsRefetch, editRegister, handleSubmitEdit, errors, allStudents }: IEditGroupProps) => {


//   const [submitEditGroup, { isLoading: editLoading }] = useEditGroupMutation()

//   const handleEditGroup = async (data: IGroups) => {
//     const response = await submitEditGroup({ ...data, editItemId })
//     if ('data' in response && response.data.message === "Record updated successfully") {
//       closeModalEdit()
//       studentsRefetch();
//     }
//   }


//   return <>
//     <EditModel title="Update Group"  {...{ isOpenEditModel, closeModalEdit }}>
//       {loadingData && <div className="flex justify-center items-center"><Loader className="animate-spin" size={100} color="#C5D86D" /></div>}
//       {!loadingData && <form onSubmit={handleSubmitEdit(handleEditGroup)}>

//         <GroupInput className='mt-5' {...editRegister("name", FieldValidation)} label='Group Name' />
//         {renderErrors(errors?.name?.message)}

//         <GroupSelectInput list={allStudents} className='mt-7' multiple {...editRegister("students", FieldValidation)} label='List Students' />
//         {renderErrors(errors?.students?.message)}

//         <div className="flex justify-center">
//           <Button isLoading={editLoading} rounded={'lg'} className='gap-2 mt-4' variant={"destructive"}>Edit Group</Button>
//         </div>

//       </form>}


//     </EditModel>

//   </>
// }

