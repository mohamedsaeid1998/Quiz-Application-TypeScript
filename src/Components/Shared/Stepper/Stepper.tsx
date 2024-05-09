import { Fragment } from 'react/jsx-runtime'
import './Stepper.module.scss'

interface IProps {
  questionsData: {
    data: {
      questions: {
        _id: string;
      }[];
    };
  };
  answeredQuestions: string[];
  setSearchParams: any
  clearSelectedValue: any
  uncertainQuestions:boolean
}

const Stepper = ({ questionsData, answeredQuestions, clearSelectedValue, setSearchParams,uncertainQuestions }: IProps) => {

  const move = (index: number) => {

    setSearchParams({ "question-number": String(index) });
    clearSelectedValue()
  }
  return (

    <div className="px-2 py-4 sm:mx-4 ">
      <div className='flex items-center justify-center  m-auto '>

        {questionsData?.data?.questions?.map(({ _id }: any, index: number) => (
          <Fragment key={_id}>
            <div className={`relative flex flex-col items-center text-teal-600 `}>
              <button type='button' onClick={() => move(index)} className={`rounded-full stepper  transition duration-500 ease-in sm:border-4 border-2 ${answeredQuestions?.includes(_id) ? 'bg-green-400 text-white' : ''}
              ${uncertainQuestions? 'border-yellow-400' : 'border-gray'} border-gray xl:h-12 xl:w-12 lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-5 w-5 flex items-center justify-center py-3`}>{index + 1}</button>
            </div>
            <div className={`flex-auto border-t-2   ease-in ${index === questionsData?.data?.questions?.length - 1 ? 'border-none' : 'border-gray'}  `}>{/* Display line */}</div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stepper
