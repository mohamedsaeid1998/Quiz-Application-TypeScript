import { Button } from "@/Components"
import { DateInput, Input, SelectInput, Textarea } from "@/Components/Shared/Inputs/Inputs"
import { AddModel, InfoModel, JoinTaskModel } from "@/Components/Shared/Models/Models"
import { ICreateQuiz, IJoinQuiz } from "@/InterFaces/QuizzesInterFaces"
import { useGroupsListQuery } from "@/Redux/Services/Groups/GroupsSlice"
import { useCreateQuizMutation, useJoinQuizMutation } from "@/Redux/Services/Quizzes/QuizzesSlice"
import { renderErrors } from "@/Utils/Helpers/ErrorMessage/ErrorMessage"
import { difficulty, duration, questions_number, type } from "@/Utils/Helpers/Variables/Variables"
import { FieldValidation } from "@/Utils/Validation"
import { Loader, SaveAll } from "lucide-react"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface IAddQuizzesProps {
  isOpen: boolean
  openInfoModel: (code: string) => void
  closeModal: () => void
}

export const CreateQuizModal = ({ closeModal, isOpen, openInfoModel }: IAddQuizzesProps) => {
  //? ***************Get Groups List ***************
  const { isLoading: groupsLoading, data: groupsList } = useGroupsListQuery(0)
  const { register, handleSubmit, reset, formState: { errors: addErrors } } = useForm<ICreateQuiz>()
  const [submitCreateQuiz, { isLoading: createLoading }] = useCreateQuizMutation()
  const handleCreateQuiz = async (data: ICreateQuiz) => {
    const response = await submitCreateQuiz(data)
    if ('data' in response && response.data.message === "Record created successfully") {
      const { code } = response?.data?.data
      reset()
      closeModal()
      openInfoModel(code)
    }
  }

  return <>
    <AddModel title="Set up a new quiz"  {...{ isOpen, closeModal }}>
      {groupsLoading && <div className="flex items-center justify-center"><Loader className="animate-spin" size={100} color="#C5D86D" /></div>}
      {!groupsLoading && <form onSubmit={handleSubmit(handleCreateQuiz)}>

        <Input {...register("title", FieldValidation)} label="Title" />
        {renderErrors(addErrors?.title?.message)}
        <div className="flex flex-col items-center justify-between sm:flex-row sm:space-x-5 ">

          <div className="w-full">
            <SelectInput label="Duration" {...register("duration", FieldValidation)} list={duration} />
            {renderErrors(addErrors?.duration?.message)}
          </div>
          <div className="w-full">
            <SelectInput label="Questions_number" {...register("questions_number", FieldValidation)} list={questions_number} />
            {renderErrors(addErrors?.questions_number?.message)}
          </div>
          <div className="w-full">

            <SelectInput label="Score_per_question" {...register("score_per_question", FieldValidation)} list={questions_number} />
            {renderErrors(addErrors?.score_per_question?.message)}
          </div>

        </div>

        <Textarea label="Description" {...register("description", FieldValidation)} />
        {renderErrors(addErrors?.description?.message)}
        <DateInput label="Schedule" {...register("schadule", FieldValidation)} />
        {renderErrors(addErrors?.schadule?.message)}
        <div className="flex flex-col items-center justify-between sm:flex-row sm:space-x-5">
          <div className="w-full">
            <SelectInput label="level" {...register("difficulty", FieldValidation)} list={difficulty} />
            {renderErrors(addErrors?.difficulty?.message)}
          </div>
          <div className="w-full">
            <SelectInput label="Category" {...register("type", FieldValidation)} list={type} />
            {renderErrors(addErrors?.type?.message)}
          </div>
          <div className="w-full">
            <div className={` mt-4 flex flex-1 border-2 rounded-lg focus-within:border-mainColor focus-within: outline-none focus-within:ring-1 focus-within:ring-mainColor `}>
              <label htmlFor="group" className='flex items-center justify-center p-2 font-semibold bg-secondColor min-w-20'>
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

        </div>

        <div className="flex justify-center">
          <Button isLoading={createLoading} rounded={'lg'} className='gap-2 mt-4' variant={"ghost"}>Create Quiz</Button>
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
    <InfoModel {...{ closeInfoModel, isOpenInfoModel }} title="Quiz was successfully created" >
      <div onClick={handleCopy} className={`w-full flex border-2 rounded-lg focus-within:border-mainColor focus-within: outline-none focus-within:ring-1 focus-within:ring-mainColor `}>
        <label htmlFor="Info" className='flex justify-center p-2 font-semibold bg-secondColor min-w-20'>
          Code
        </label>
        <p ref={textRef} id="Info" className=" pl-3 text-black  outline-none flex-1 border-none  bg-transparent py-1.5 placeholder:text-gray-400  caret-mainColor " >
          {quizCode}
        </p>
        <span className="flex items-center pl-3 text-white me-3 ">
          <SaveAll color='black' />
        </span>
      </div>

    </InfoModel>
  </>
}

interface IJoinQuizProps {
  isOpenJoinQuizModel: boolean
  closeJoinQuizModel: () => void
}

export const JoinQuizModal = ({ isOpenJoinQuizModel, closeJoinQuizModel }: IJoinQuizProps) => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<IJoinQuiz>()
  const [submitJoinQuiz, { isLoading }] = useJoinQuizMutation()
  const handleJoinQuiz = async (data: IJoinQuiz) => {
    const response = await submitJoinQuiz(data)
    if ('data' in response && response.data.message === "Student joined successfully") {
      navigate(`/dashboard/exam-questions/${response?.data?.data?.quiz}`)
    }
  }

  return <>
    <JoinTaskModel {...{ closeJoinQuizModel, isOpenJoinQuizModel }}>
      <form className="w-full" onSubmit={handleSubmit(handleJoinQuiz)}>
        <Input label="Code" {...register("code", FieldValidation)} className="w-full" />
        {renderErrors(errors?.code?.message)}
        <div className="flex justify-center">
          <Button isLoading={isLoading} rounded={'lg'} className='gap-2 mt-2' variant={"ghost"}>Join Quiz</Button>
        </div>
      </form>

    </JoinTaskModel>
  </>
}

interface IQuizResultProps {
  isOpenInfoModel: boolean
  closeInfoModel: () => void
  score: number[]
}

export const QuizResultModal = ({ isOpenInfoModel, closeInfoModel, score }: IQuizResultProps) => {

  return <>
    <InfoModel {...{ closeInfoModel, isOpenInfoModel }} title=" Congratulations" >
      <div className={`w-full flex justify-center items-center`}>
        <p className="text-lg font-bold ">your Score is : <span className="text-lg text-green-500 ">{score[0]} / {score[1] * score[2]}</span></p>


      </div>
      <p className="flex items-center justify-center text-black"> Question with {score[2]} points</p>
    </InfoModel>
  </>
}