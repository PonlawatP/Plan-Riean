import { calculateScale, getTimeRange } from "@/helpers/globalFn"

export default function ScheduleCard(props:any) {
  const {data, time, position, fnHandleClickedOnScheduleCard} = props
  // const [clicked, setClicked] = useState(false);

  return (
    <div className="absolute w-full h-full">

      <div className={`relative h-full z-40 p-2 group`} style={{width: (calculateScale(time)*100)+"%"}}>
        <div onClick={()=>{fnHandleClickedOnScheduleCard(data)}} className={`z-10 relative cursor-pointer rounded-lg border-2 border-white/25 h-full w-full p-1 text-center shadow-md hover:text-white/95 ${getColorCode(data.code)} transition-all duration-200`}>
          <p className='text-sm'>({data.credit.split(" ")[0].trim()}) {data.code} sec {data.sec}</p>
          <p className='pt-3 text-sm'>{getTimeRange(time)}</p>
        </div>
      </div>
    </div>
  )
}