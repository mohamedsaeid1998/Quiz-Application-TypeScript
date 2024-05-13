import { Button } from "@/Components"
import { DetailsInput } from "@/Components/Shared/DetailsInputs/DetailsInput"
import { DetailsModel } from "@/Components/Shared/Models/Models"
import { useStudentDetailsQuery } from "@/Redux/Services/Students/StudentsSlice"
import { Loader } from "lucide-react"

interface IDetailsQuestionsProps {
  isOpenDetailsModel: boolean
  closeDetailsModel: () => void
  detailsItemId: string
}

export const DetailsStudentModal = ({ closeDetailsModel, isOpenDetailsModel, detailsItemId }: IDetailsQuestionsProps) => {

  const { data: studentDetails, status } = useStudentDetailsQuery(detailsItemId)

  return <>
    <DetailsModel title="Student Details"  {...{ isOpenDetailsModel, closeDetailsModel }}>
      {status === "fulfilled" ? <>
        <div className={`grid ${studentDetails?.group ? "grid-cols-2" : "grid-cols-1"} gap-4 mt-4`}>
          <DetailsInput label="Title" content={`${studentDetails?.first_name + ` ` + studentDetails?.last_name}`} />
          {studentDetails?.group &&
            <DetailsInput label="Group Name" content={`${studentDetails?.group?.name}`} />}
        </div>
        <DetailsInput className="mt-4" label="Email" content={`${studentDetails?.email}`} icon={<span className={`${studentDetails?.status === "active" ? "text-green-600" : "text-red-600"} tracking-widest capitalize`}>{studentDetails?.status}</span>} />
        <div className="flex justify-center">
          <Button onClick={closeDetailsModel} rounded={'lg'} className='gap-2 mt-4' variant={"destructive"}>Cancel</Button>
        </div></> : <div className="flex items-center justify-center"><Loader className="animate-spin" size={100} color="#C5D86D" /></div>}
        
    </DetailsModel>
  </>
}