import { CalendarContext } from "@/providers/CalendarProvider"
import { useContext } from "react"

export default function PRSubjectFilter({children}:any, props:any){
  const {isShowDialog = false} = props;
    const {
        viewSchedule,
        topbarToggle,
        fnHandleClickedOnCalendar
    } = useContext(CalendarContext)
    
    function elemButton(msg: any){
      return <button className='text-pr-text-menu h-fit px-2 py-1 rounded-lg bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80'>
      {msg}
      </button>
    }

    return <section className={`pr-subject-filter smooth-all absolute left-[465px] md:p-8 w-full md:w-auto h-full grid ${!viewSchedule ? "opacity-0 translate-y-10 md:translate-y-0 md:-translate-x-10 invisible" : topbarToggle.init ? "opacity-20" : ""}`}>
    <div className="pr-subject-filter-body relative grid grid-rows-[auto_1fr] md:block md:w-[450px] h-full overflow-auto p-6 rounded-3xl border-[1px] border-white/80 bg-white/60">
      {/* header */}
      {/* <section className="pr-subject-header flex justify-between p-2 py-3 border-b-[1px] border-slate-400/50">
        <div className="flex gap-2 items-center font-semibold text-xl">
          <button onClick={()=>{
            fnHandleClickedOnCalendar(-1, -1)
          }} className='hover:bg-pr-bg active:bg-slate-300 rounded-lg aspect-square w-10'>
            <i className="bx bx-chevron-left text-3xl translate-y-[2px]"></i>
          </button>
          <div className="">
            <h1>เลือกรายวิชา</h1>
            <p className='text-sm font-normal text-pr-gray-1'>อัพเดต: 18/11/66 19:54:43</p>
          </div>
        </div>
        <button className='text-pr-text-menu h-fit px-2 py-1 mr-2 rounded-lg bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80'>
          <i className="bx bx-layer text-xl translate-y-[3px] mr-1"></i> คัดกรอง
        </button>
      </section> */}
      {/* content */}
      <section className="pr-subject-filter-content relative h-full">
        <div className="pr-filter-group">
          <p>หมวดหมู่รายวิชา</p>
          <div className="mt-2 grid grid-cols-5 gap-2">
            {elemButton("หมวด 1")}
            {elemButton("หมวด 2")}
            {elemButton("หมวด 3")}
            {elemButton("หมวด 4")}
            {elemButton("หมวด 5")}
          </div>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {elemButton("พื้นฐาน")}
            {elemButton("เอกบังคับ")}
            {elemButton("เอกเลือก")}
            {elemButton("วิชาเสรี")}
          </div>
        </div>
        <div className="pr-filter-btn absolute bottom-0 right-0 flex gap-3">
          <button className='w-24 mt-4 text-pr-text-menu h-fit px-2 py-1 rounded-lg bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80'>
            ล้าง
          </button>
          <button className='w-24 mt-4 text-white/80 h-fit px-2 py-1 rounded-lg bg-pr-bg-3 border-b-[3px] border-slate-600/50 hover:bg-slate-600 active:border-0 active:bg-slate-600 active:text-white/80'>
            คัดกรอง
          </button>
        </div>
      </section>
    </div>
  </section>
}