import { Fragment } from 'react/jsx-runtime'
import './Stepper.module.scss'

interface IProps {
  questionsData: {
    data:{
      questions:[]
    }
  }
}

const Stepper = ({ questionsData }: IProps) => {
  return <>
    <div className="mx-4 p-4 flex justify-between items-center">
      <div className='flex items-center w-full'>

        {questionsData?.data?.questions?.map(({ _id }: any, index: number) => <Fragment key={_id}>
          <div className='relative flex flex-col items-center text-teal-600'>
            <div className='rounded-full transition duration-500 ease-in-out border-2 border-gray h-12 w-12 flex items-center justify-center py-3'>{index + 1}</div>
          </div>
          <div className='flex-auto border-t-2 transition duration-500 ease-in-out'>{/* Display line */}</div>
        </Fragment>
        )}


      </div>
    </div>
  </>
}

export default Stepper