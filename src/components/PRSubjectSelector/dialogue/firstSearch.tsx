import { CalendarContext } from "@/app/providers/CalendarProvider"
import { useContext } from "react"

export default function DialogFirstSearch({children}:any, props:any){
    const {
        setViewFilter,
    } = useContext(CalendarContext)
    
    return <div className="pr-dialog-searchfirst h-full flex flex-col justify-center items-center text-pr-text-menu/60">
      <i className='bx bx-search text-[6rem]'></i>
      <p>คัดกรองข้อมูล</p>
      <p>เพื่อแสดงรายวิชาที่ต้องการ</p>
      <button onClick={()=>setViewFilter(true)} className='mt-4 text-pr-text-menu h-fit px-2 py-1 mr-2 rounded-lg bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80'>
        <i className="bx bx-layer text-xl translate-y-[3px] mr-1"></i> คัดกรอง
      </button>
    </div>
}