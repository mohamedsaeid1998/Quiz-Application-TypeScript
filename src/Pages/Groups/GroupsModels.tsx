import { Button } from "@/Components"
import { GroupInput } from "@/Components/Shared/Inputs/Inputs"
import { AddModel, DeleteModel, EditModel } from "@/Components/Shared/Models/Models"
import { IDeleteGroup, IGroups } from "@/InterFaces/GroupsInterFaces"
import { useCreateGroupMutation, useDeleteGroupMutation, useEditGroupMutation } from "@/Redux/Services/Groups/GroupsSlice"
import { renderErrors } from "@/Utils/Helpers/ErrorMessage/ErrorMessage"
import { FieldValidation } from "@/Utils/Validation"
import { Loader } from "lucide-react"
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, useForm } from "react-hook-form"

interface IAddGroupProps {
  studentsData: string[]
  isOpen: boolean
  closeModal: () => void
  studentsRefetch: () => void
}

export const AddGroupModal = ({ studentsData, closeModal, isOpen, studentsRefetch }: IAddGroupProps) => {
  const { register, handleSubmit, reset, formState: { errors: addErrors } } = useForm<IGroups>()
  const [submitCreateGroup, { isLoading: createLoading }] = useCreateGroupMutation()
  const handleCreateGroup = async (data: IGroups) => {
    const response = await submitCreateGroup(data)
    if ('data' in response && response.data.message === "Record created successfully") {
      reset()
      studentsRefetch()
      closeModal()
    }
  }

  return <>
    <AddModel title="Set up a new Group"  {...{ isOpen, closeModal }}>
      <form onSubmit={handleSubmit(handleCreateGroup)}>
        <GroupInput className='mt-5' {...register("name", FieldValidation)} label='Group Name' />
        {renderErrors(addErrors?.name?.message)}
        <div className={` mt-7 flex flex-col border-2 rounded-lg focus-within:border-mainColor focus-within: outline-none focus-within:ring-1 focus-within:ring-mainColor `}>
          <label htmlFor={"select"} className='flex justify-center p-2 font-semibold bg-secondColor min-w-20'>
            List Students
          </label>

          <select id={"select"} {...register("students", FieldValidation)} multiple className="px-2 rounded-r-md outline-none flex-1 border-none  bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-400  sm:text-sm sm:leading-6"  >
            {studentsData?.map(({ _id, first_name, last_name }: any) => (
              <option
                key={_id}
                value={_id}
                className="text-black"
              >
                {first_name + " " + last_name}
              </option>
            ))}
          </select>
        </div>
        {renderErrors(addErrors?.students?.message)}

        <div className="flex justify-center">
          <Button isLoading={createLoading} rounded={'lg'} className='gap-2 mt-4' variant={"ghost"}>Create Group</Button>
        </div>

      </form>
    </AddModel>
  </>
}

interface IDeleteGroupProps {
  isOpenDeleteModel: boolean
  closeModalDelete: () => void
  studentsRefetch: () => void
  deleteItemId: string
}

export const DeleteGroupModal = ({ isOpenDeleteModel, closeModalDelete, studentsRefetch, deleteItemId }: IDeleteGroupProps) => {

  const { handleSubmit: handleSubmitDelete } = useForm<IDeleteGroup>()
  const [submitDeleteGroup, { isLoading: deleteLoading }] = useDeleteGroupMutation()
  const handleDeleteGroup = async (data: IDeleteGroup) => {
    const response = await submitDeleteGroup({ ...data, deleteItemId })
    if ('data' in response && response.data.message === "Record deleted successfully") {
      closeModalDelete()
      studentsRefetch();
    }
  }

  return <>
    <DeleteModel {...{ isOpenDeleteModel, closeModalDelete }}>
      <form onSubmit={handleSubmitDelete(handleDeleteGroup)}>
        <span className='text-xl font-extrabold'>Confirm Delete</span>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this Group ?
        </p>
        <div className='flex justify-between mt-4'>
          <Button isLoading={deleteLoading} rounded={'lg'} type='submit' variant={"destructive"}>Delete</Button>
          <Button onClick={closeModalDelete} rounded={'lg'} type='button' >Cancel</Button>
        </div>
      </form>
    </DeleteModel>
  </>
}

interface IEditGroupProps {
  isOpenEditModel: boolean
  closeModalEdit: () => void
  studentsRefetch: () => void
  editItemId: string
  editRegister: UseFormRegister<IGroups>
  handleSubmitEdit: UseFormHandleSubmit<IGroups, undefined>
  errors: FieldErrors<IGroups>
  allStudents: []
  loadingData: boolean
}

export const EditGroupModal = ({ loadingData, isOpenEditModel, closeModalEdit, editItemId, studentsRefetch, editRegister, handleSubmitEdit, errors, allStudents }: IEditGroupProps) => {

  const [submitEditGroup, { isLoading: editLoading }] = useEditGroupMutation()

  const handleEditGroup = async (data: IGroups) => {
    const response = await submitEditGroup({ ...data, editItemId })
    if ('data' in response && response.data.message === "Record updated successfully") {
      closeModalEdit()
      studentsRefetch();
    }
  }

  return <>
    <EditModel title="Update Group"  {...{ isOpenEditModel, closeModalEdit }}>
      {loadingData && <div className="flex items-center justify-center"><Loader className="animate-spin" size={100} color="#C5D86D" /></div>}
      {!loadingData && <form onSubmit={handleSubmitEdit(handleEditGroup)}>
        <GroupInput className='mt-5' {...editRegister("name", FieldValidation)} label='Group Name' />
        {renderErrors(errors?.name?.message)}

        <div className={` mt-7 flex flex-col border-2 rounded-lg focus-within:border-mainColor focus-within: outline-none focus-within:ring-1 focus-within:ring-mainColor `}>
          <label htmlFor={"select"} className='flex justify-center p-2 font-semibold bg-secondColor min-w-20'>
            List Students
          </label>

          <select id={"select"} {...editRegister("students", FieldValidation)} multiple className="px-2 rounded-r-md outline-none flex-1 border-none  bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-400  sm:text-sm sm:leading-6"  >
            {allStudents?.map(({ _id, first_name, last_name }: any) => (
              <option
                key={_id}
                value={_id}
                className="text-black"
              >
                {first_name + " " + last_name}
              </option>
            ))}
          </select>
        </div>
        {renderErrors(errors?.students?.message)}

        <div className="flex justify-center">
          <Button isLoading={editLoading} rounded={'lg'} className='gap-2 mt-4' variant={"ghost"}>Edit Group</Button>
        </div>

      </form>}


    </EditModel>

  </>
}