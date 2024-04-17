
interface IProps {

}

const GroupsCardSkeleton = ({ }: IProps) => {
  return <>
    <div className=' border-2 rounded-md p-5 flex justify-between items-center '>
      <div className='flex flex-col'>
        <h3 className='mb-2 rounded-md animate-pulse h-[16px] w-[160px] bg-gray-500'>{""}</h3>
        <span className=' h-[12px] w-[120px] bg-gray-500 rounded-md animate-pulse'></span>
      </div>
      <div className='flex space-x-3'><span className='animate-pulse rounded-md mr-1 h-[28px] w-[20px] bg-gray-500 ' /> <span className=' animate-pulse rounded-md mr-1 h-[28px] w-[20px] bg-gray-500 ' /> </div>
    </div>
  </>  
}

export default GroupsCardSkeleton
