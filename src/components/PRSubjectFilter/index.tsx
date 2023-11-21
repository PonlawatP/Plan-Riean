import { CalendarContext } from "@/providers/CalendarProvider"
import { useContext } from "react"

export default function PRSubjectFilter({children}:any, props:any){
  const {isShowDialog = false} = props;
    const {
        viewSchedule,
        viewFilter,
        setViewFilter,
        topbarToggle,
        fnHandleClickedOnCalendar
    } = useContext(CalendarContext)
    
    function elemButton(msg: any){
      return <button className='text-pr-text-menu h-fit px-1 md:px-2 py-1 rounded-lg bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80'>
      {msg}
      </button>
    }

    function handleFilterPanel(){
      setViewFilter(!viewFilter)
    }

    return <section className={`pr-subject-filter pointer-events-none smooth-all absolute lg:left-[465px] md:p-8 w-full md:w-auto bottom-0 h-full grid ${!viewSchedule || topbarToggle.init || topbarToggle.pre || !viewFilter ? "opacity-0 translate-y-10 lg:translate-y-0 lg:-translate-x-10 invisible" : ""}`}>
    <div className={`pr-subject-filter-body pointer-events-auto relative grid grid-rows-[auto_1fr] lg:grid-rows-1 md:w-[450px] h-full overflow-auto p-1 lg:pt-6 rounded-3xl border-[1px] border-pr-bg-3/20 bg-white backdrop-blur-lg`}>
      {/* header */}
      <section className="pr-subject-header flex lg:hidden justify-between p-2 py-3 border-b-[1px] border-slate-400/50">
        <div className="flex gap-2 items-center font-semibold text-xl">
          <button onClick={()=>{
            fnHandleClickedOnCalendar(-1, -1)
          }} className='hover:bg-pr-bg active:bg-slate-300 rounded-lg aspect-square w-10'>
            <i className="bx bx-chevron-left text-3xl translate-y-[2px]"></i>
          </button>
          <div className="">
            <h1>คัดกรองรายวิชา</h1>
            <p className='text-sm font-normal text-pr-gray-1'>อัพเดต: 18/11/66 19:54:43</p>
          </div>
        </div>
        <button onClick={handleFilterPanel} className={`h-fit px-2 py-1 mr-2 rounded-lg ${viewFilter ? "text-white/80 bg-pr-bg-3 border-b-[3px] border-slate-600/50 hover:bg-slate-600 active:border-0 active:bg-slate-600 active:text-white/80" : "text-pr-text-menu bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80"}`}>
          <i className="bx bx-layer text-xl translate-y-[3px] mr-1"></i> คัดกรอง
        </button>
      </section>
      {/* content */}
      <section className="pr-subject-filter-content relative h-full overflow-auto fade-scroll p-5 pt-0">
        <div className="pr-filter-group pt-2 pb-6">
          <p className="font-semibold text-pr-text-menu">หมวดหมู่รายวิชา</p>
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
        <div className="pr-filter-group pb-6">
          <p className="font-semibold text-pr-text-menu">เฉพาะรายวิชา</p>
          <div className="mt-1 grid grid-cols-5 gap-2">
            {elemButton("+")}
          </div>
        </div>
        <div className="pr-filter-group pb-6">
          <p className="font-semibold text-pr-text-menu">วันที่เรียน</p>
          <div className="mt-1 grid grid-cols-5 gap-2">
            {elemButton("จันทร์")}
            {elemButton("อังคาร")}
            {elemButton("พุธ")}
            {elemButton("พฤหัสฯ")}
            {elemButton("ศุกร")}
          </div>
        </div>
        <div className="pr-filter-group pb-6">
          <p className="font-semibold text-pr-text-menu">เวลาที่เรียน</p>
          <div className="mt-1 grid grid-cols-5 gap-2">
            {elemButton("ทั้งหมด")}
            {elemButton("+")}
          </div>
        </div>
        <div className="pr-filter-group pb-6">
          <p className="font-semibold text-pr-text-menu">ห้องที่เรียน</p>
          <div className="mt-1 grid grid-cols-5 gap-2">
            {elemButton("ทุกห้อง")}
            {elemButton("+")}
          </div>
        </div>
        <div className="pr-filter-group pb-6">
          <p className="font-semibold text-pr-text-menu">อาจารย์ผู้สอน</p>
          <div className="mt-1 grid grid-cols-5 gap-2">
            {elemButton("ทุกคน")}
            {elemButton("+")}
          </div>
        </div>
      </section>
      <section className="pr-subject-actions z-10 p-5 pt-2">
        <div className="pr-filter-btn flex gap-3 justify-end">
          <button className='w-24 text-pr-text-menu h-fit px-2 py-1 rounded-lg bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80'>
            ล้าง
          </button>
          <button className='w-24 text-white/80 h-fit px-2 py-1 rounded-lg bg-pr-bg-3 border-b-[3px] border-slate-600/50 hover:bg-slate-600 active:border-0 active:bg-slate-600 active:text-white/80'>
            คัดกรอง
          </button>
        </div>
      </section>
    </div>
  </section>
}