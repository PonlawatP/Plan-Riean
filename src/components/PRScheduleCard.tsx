import { k2dfont } from "@/pages/plan/layout"
import { CalendarContext } from "@/app/providers/CalendarProvider"
import { calculateScale, getColorCode, getTimeRange } from "@/app/utils/msu/subjectUtils"
import { useContext } from "react"

export default function ScheduleCard(props:any) {
    const {data, time} = props
    const {viewSchedule, removeSubjectSchedule} = useContext(CalendarContext)
    // const [clicked, setClicked] = useState(false);

    function fnHandleClickedOnScheduleCard(data:any){
        // setClicked(!clicked)
        if(!viewSchedule) {
            removeSubjectSchedule(data)
        }
      }

    return (
      <div className={`absolute w-full h-full ${viewSchedule?"pointer-events-none":""}`}>

        <div className={`relative h-full z-40 p-2 text-[13px] font-normal group`} style={{width: (calculateScale(time)*100)+"%"}}>
          <div onMouseDown={()=>{fnHandleClickedOnScheduleCard(data)}} onClick={()=>{fnHandleClickedOnScheduleCard(data)}} className={`z-10 relative cursor-pointer rounded-lg border-2 border-white/25 h-full w-full p-1 text-center shadow-md text-pr-dark hover:text-white/95 ${getColorCode(data.code)} transition-all duration-200`}>
            <p className=''>({data.credit.split(" ")[0].trim()}) {data.code} sec {data.sec}</p>
            <p className=''>{getTimeRange(time)}</p>
          </div>
        </div>
      </div>
    )
  }