import { AnimationContainer, GroupsCardSkeleton } from '@/Components';
import Button from '@/Components/Ui/Button';
import { IGroups, IGroupsList } from '@/InterFaces/GroupsInterFaces';
import { useGetGroupByIdQuery, useGroupsListQuery } from '@/Redux/Services/Groups/GroupsSlice';
import { useAllStudentsQuery, useAllStudentsWithoutGroupsQuery } from '@/Redux/Services/Students/StudentsSlice';
import { FilePenLine, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import './Groups.module.scss';
import { AddGroupModal, DeleteGroupModal, EditGroupModal } from './GroupsModels';
import { AnimatePresence, motion } from 'framer-motion';
const Groups = () => {
  const { t } = useTranslation();
  const { handleSubmit: handleSubmitEdit, setValue, register: editRegister, formState: { errors } } = useForm<IGroups>()
  //? ***************Get All Students ***************

  const { data: allStudents } = useAllStudentsQuery(0)

  //? ***************Get Groups List ***************
  const { isLoading: loading, data: groupsList } = useGroupsListQuery(0)
  const { data: studentsData, refetch: studentsRefetch } = useAllStudentsWithoutGroupsQuery(0)
  //* ***************Create New Group ***************
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => {
    setIsOpen(false)
  }

  //! *************** Delete Group ***************
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

  //TODO *************** Edit Group ***************
  const [editItemId, setEditItem] = useState("")
  const [isOpenEditModel, setIsOpenEditModel] = useState(false)

  const closeModalEdit = () => {
    setIsOpenEditModel(false)
    setEditItem("")
  }
  const [loadingData, setLoadingData] = useState(false)
  const openModalEdit = async (_id: string) => {
    setIsOpenEditModel(true)
    setLoadingData(true)
    await refetch()
    setLoadingData(false)
    setEditItem(_id)
  }


  //? *************** GetGroupById ***************

  const { data: groupData, refetch } = useGetGroupByIdQuery(editItemId);

  useEffect(() => {
    setValue("name", groupData?.name)
    setValue("students", groupData?.students?.map(({ _id }: any) => {
      return _id
    }));
  }, [groupData?.name])


  return <>
    <AddGroupModal {...{ isOpen, closeModal, studentsData, studentsRefetch }} />
    <DeleteGroupModal {...{ closeModalDelete, isOpenDeleteModel, deleteItemId, studentsRefetch }} />
    <EditGroupModal {...{ loadingData, isOpenEditModel, closeModalEdit, studentsRefetch, editItemId, allStudents, errors, editRegister, handleSubmitEdit }} />
    <AnimationContainer>
      <div className="p-3 border-2 rounded-md" >
        {loading ? <div className='flex items-center justify-between font-semibold'>
          <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">{""}</h6>
          <h6 className="rounded-full h-[35px] w-[145px] bg-gray-500 animate-pulse">{""} </h6>
        </div>
          :
          <div className='flex items-center justify-between font-semibold'>
            <h2>{t("GroupsList")}</h2>
            <Button onClick={openModal} variant={'outline'} rounded={'full'} className="gap-2 text-left group"><Plus className='p-1 text-white transition bg-black rounded-full group-hover:bg-white group-hover:text-black duration-0' size={20} strokeWidth={5} /> <span>{t("AddGroup")}</span> </Button>
          </div>}

        <div className='grid grid-cols-1 gap-2 mt-4 md:grid-cols-2 md:gap-6 md:gap-y-4'>
          <AnimatePresence initial={false} >
            {loading && Array.from({ length: 2 }, (_, idx) => <GroupsCardSkeleton key={idx} />)}
            {groupsList?.map(({ max_students, name, _id }: IGroupsList) =>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ layout: { type: "spring" } }}
                key={_id} className='flex items-center justify-between p-3 border-2 rounded-md '>
                <div className='flex flex-col'>
                  <h3 className='font-bold tracking-wide '>Group : {name}</h3>
                  <span className='font-semibold text-md text-slate-500 '>No. of students : {max_students}</span>
                </div>
                <div className='flex space-x-3'><FilePenLine color='gold' onClick={() => openModalEdit(_id)} className='cursor-pointer' /> <Trash2 color='red' onClick={() => openModalDelete(_id)} className='cursor-pointer' /> </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div >
    </AnimationContainer>
  </>
}

export default Groups