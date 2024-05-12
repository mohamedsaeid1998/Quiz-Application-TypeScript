import { useLocation } from 'react-router-dom'
import './ResultsDetails.module.scss'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { NoData } from '@/Assets/Images'
import { AnimationContainer } from '@/Components'

const ResultsDetails = () => {
  const location = useLocation()
  const data = location?.state
  const [Loading, setLoading] = useState(false)
  useEffect(() => {
    if (data) {
      setLoading(false)
    } else {
      setLoading(true)
    }

  }, [data])

  return <>

    <AnimationContainer>

      <div className="p-3 mt-2 overflow-x-auto border-2 rounded-md" >
        {Loading ?
          <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">{""}</h6>
          : <div className='flex justify-between font-semibold'>
            <h2>Results</h2>
          </div>}
        <table className='w-full  border-separate rounded-md my-2 border-slate-400'>
          <thead className='text-white '>
            {Loading ? <tr >
              <th className='px-2 py-2 bg-black rounded-s-md '><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
              <th className=' px-2 py-2 bg-black'><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md '>{""}</span></th>
              <th className=' px-2 py-2  bg-black'><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
              <th className='px-2 py-2 bg-black rounded-e-md'><span className='inline-block h-[12px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></th>
            </tr> : null}

            {data?.participants?.length > 0 && <tr>
              <th className='px-2 py-2 font-semibold bg-black rounded-s-md'>TITLE</th>
              <th className=' px-2 py-2 font-semibold bg-black'>Score</th>
              <th className=' px-2 py-2 font-semibold  bg-black'>Average</th>
              <th className='px-2 py-2 font-semibold bg-black rounded-e-md'>Started At</th>
            </tr>}



          </thead>
          <tbody className='text-center text-gray-500 divide-y'>
            {Loading ? Array.from({ length: 7 }, (_, idx) => <tr key={idx} className='bg-white dark:border-gray-700 hover:bg-blue-200'>
              <td className='py-3 border whitespace-nowrap border-slate-300 '><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className=' py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md '>{""}</span></td>
              <td className='  py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
              <td className='py-3 border border-slate-300'><span className='inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md'>{""}</span></td>
            </tr>) : null}

            {data?.participants?.length == 0 && <div className='flex flex-col gap-3 items-center justify-center'>
              <img src={NoData} alt="NoData" />
              <p className='text-xl tracking-wider text-red-500 font-bold'>No Students Joined Exam</p>
            </div>}
            {data?.participants?.length > 0 && data?.participants?.map(({ score, started_at }: any, idx: number) => <tr key={idx} className='bg-white dark:border-gray-700 hover:bg-blue-200'>
              <td className='py-3 font-medium border whitespace-nowrap border-slate-300 truncate'>{data?.quiz?.title}</td>
              <td className=' py-3 font-medium border whitespace-nowrap border-slate-300 truncate'>{score}</td>
              <td className=' py-3 font-medium border whitespace-nowrap border-slate-300 truncate'>{data?.participants?.length}</td>
              <td className=' py-3 border border-slate-300'>{moment(started_at).format("HH:mm A")}</td>
            </tr>)}



          </tbody>

        </table>
      </div>

    </AnimationContainer>
  </>
}

export default ResultsDetails