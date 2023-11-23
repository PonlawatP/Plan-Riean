import { CalendarContext, CalendarFilterContext } from "@/providers/CalendarProvider"
import { useContext } from "react"
import { name_days } from "../PRCalendarSubject";
import { CalendarSelectorDataContext, ICalendarDataProvider } from "@/providers/CalendarSelectorDataProvider";

export default function PRSubjectFilter({children}:any, props:any){
    const {
        viewSchedule,
        viewFilter,
        setViewFilter,
        topbarToggle,
        fnHandleClickedOnCalendar
    } = useContext(CalendarContext)

    const {filter, setFilter, TimeFilterTogglePRC, SingleTimeFilterTogglePRC} = useContext(CalendarFilterContext);

    const {
      group,
      subject,
      day,
      time,
      room,
      master
  } = filter;

  const {calsel_data, setCalselData} = useContext<ICalendarDataProvider>(CalendarSelectorDataContext)
  const {updated} = calsel_data
  
    function elemButton(msg: any, onClickEvent:()=>void = () => {}, isOn: boolean=false, classAdd:string=""){
      return <button onClick={onClickEvent} className={'h-fit px-1 md:px-2 py-1 rounded-lg border-b-[3px] active:border-0 '+classAdd+` ${isOn ? "text-white/80 bg-pr-bg-3 border-slate-600/50 hover:bg-slate-600 active:bg-slate-600 active:text-white/80" : "text-pr-text-menu bg-pr-bg border-slate-400/50 hover:bg-slate-300 active:bg-slate-400 active:text-white/80"}`}>
      {msg}
      </button>
    }

    function handleFilterPanel(){
      setViewFilter(!viewFilter)
    }

    function handleFilterSubmit(clear=false){
      if(clear){
        setFilter({
          group: [],
          subject: [],
          day: [],
          time: [],
          room: [],
          master: []
      })
        return
      }
      handleSearch()
      setViewFilter(!viewFilter)
      
    }
    function handleSearch(){
      setCalselData({...calsel_data, isLoading: true, current_filter: filter, isFirstLoading: false})
    }

    function isGroupFilterOn(name: string = ""){
      return group.includes(name);
    }

    function GroupFilterTogglePRC(name:string){
      let temp_group = group;

      if(group.includes(name)){
        temp_group = group.filter((item:string) => item !== name)
      } else {
        temp_group.push(name);
      }

      setFilter({...filter, group: temp_group})
  }
    
  function isDayFilterOn(name: string = ""){
    return day.includes(name);
  }

  function DayFilterTogglePRC(name:string){
    let temp_day = day;

    if(day.includes(name)){
      temp_day = day.filter((item:string) => item !== name)
    } else {
      temp_day.push(name);
    }

    setFilter({...filter, day: temp_day})
  }

  function isTimeFilterOn(all:boolean = false, time_num:string = ""){
    if(all){
      return time.length == 0 || (time.length > 0 && time.includes("all")) || time.filter((t:string)=>t===t.replaceAll("-","")).length == 0
    }

    return time.includes("all") ? false : time.filter((t:string)=> t === time_num.replaceAll("-","")).length > 0;
  }

    return <section className={`pr-subject-filter pointer-events-none smooth-all absolute lg:left-[465px] md:p-8 w-full md:w-auto bottom-0 h-full grid z-10 lg:z-auto ${!viewSchedule || topbarToggle.init || topbarToggle.pre || !viewFilter ? "opacity-0 translate-y-10 lg:translate-y-0 lg:-translate-x-10 invisible" : ""}`}>
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
            {updated == "null" ? null : <p className='text-sm font-normal text-pr-gray-1'>อัพเดต: {updated}</p>}
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
            {elemButton("หมวด 1", ()=>GroupFilterTogglePRC("ge-1"), isGroupFilterOn("ge-1"))}
            {elemButton("หมวด 2", ()=>GroupFilterTogglePRC("ge-2"), isGroupFilterOn("ge-2"))}
            {elemButton("หมวด 3", ()=>GroupFilterTogglePRC("ge-3"), isGroupFilterOn("ge-3"))}
            {elemButton("หมวด 4", ()=>GroupFilterTogglePRC("ge-4"), isGroupFilterOn("ge-4"))}
            {elemButton("หมวด 5", ()=>GroupFilterTogglePRC("ge-5"), isGroupFilterOn("ge-5"))}
          </div>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {elemButton("พื้นฐาน", ()=>GroupFilterTogglePRC("fund"), isGroupFilterOn("fund"))}
            {elemButton("เอกบังคับ", ()=>GroupFilterTogglePRC("mainf"), isGroupFilterOn("mainf"))}
            {elemButton("เอกเลือก", ()=>GroupFilterTogglePRC("mainc"), isGroupFilterOn("mainc"))}
            {elemButton("วิชาเสรี", ()=>GroupFilterTogglePRC("free"), isGroupFilterOn("free"))}
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
            {name_days.map((d)=>elemButton(d.date_th, ()=>DayFilterTogglePRC(d.date_en_2), isDayFilterOn(d.date_en_2)))}
          </div>
        </div>
        <div className="pr-filter-group pb-6">
          <p className="font-semibold text-pr-text-menu">เวลาที่เรียน</p>
          <div className="mt-1 grid grid-cols-5 gap-2">
            {elemButton("ทั้งหมด", ()=>TimeFilterTogglePRC(true), isTimeFilterOn(true))}
            {
            time.filter((t:string)=>t !== "all")
              .map((t:string, tind:number)=>
              <>
                {elemButton(t.replaceAll("-",""), ()=>SingleTimeFilterTogglePRC(t), isTimeFilterOn(false, t))}
                {time.filter((t:string)=>t !== "all").length === 1 && tind == 0 ? <span className="flex justify-center items-center text-pr-gray-1">เป็นต้นไป</span> : null}
                {time.filter((t:string)=>t !== "all").length === 2 && tind == 0 ? <span className="flex justify-center items-center text-pr-gray-1">ถึง</span> : null}
              </>
            )}
            {elemButton(<span className="relative"><p className="invisible">t</p><i className="bx bx-time-five text-2xl absolute top-0 -translate-x-1/2"></i></span>, ()=>TimeFilterTogglePRC(false, "08:00", "10:00"), isTimeFilterOn())}
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
          <button onClick={()=>handleFilterSubmit(true)} className='w-24 text-pr-text-menu h-fit px-2 py-1 rounded-lg bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80'>
            ล้าง
          </button>
          <button onClick={()=>handleFilterSubmit()} className='w-24 h-fit px-2 py-1 rounded-lg border-b-[3px] active:border-0 text-white/80 bg-pr-bg-3 border-slate-600/50 hover:bg-slate-600 active:bg-slate-600 active:text-white/80'>
            คัดกรอง
          </button>
        </div>
      </section>
    </div>
  </section>
}