
interface IProps {

}

const QuizzesCardSkeleton = ({ }: IProps) => {
  return <>

    <div className=' border-2 flex items-center mt-4 rounded-lg'>

      <img className='w-[165px] h-[120px] animate-pulse bg-gray-500 rounded-md' />


      <div className='p-3 w-full '>
        <h3 className=' mb-2 rounded-md animate-pulse h-[15px] w-[120px] bg-gray-500'>{""}</h3>
        <div className="text-[#777] animate-pulse">
          <h6 className='h-[12px] w-[160px] bg-gray-500 rounded-md'>{""}</h6>
        </div>
        <div className='flex justify-between items-center mt-6'>
          <span className='h-[12px] w-[160px] bg-gray-500 rounded-md animate-pulse'>{''}</span>
          <h6 className='animate-pulse rounded-md mr-1 h-[10px] w-[40px] bg-gray-500 '>{""}</h6>
        </div>
      </div>

    </div>
  </>
}

export default QuizzesCardSkeleton
