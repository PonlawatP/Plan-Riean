import { CalendarContext, CalendarFilterContext } from "@/providers/CalendarProvider"
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

    const {filter, setFilter} = useContext(CalendarFilterContext);

    const {
      updated,
      group,
      subject,
      day,
      time,
      room,
      master
  } = filter;
    
    function elemButton(msg: any, onClickEvent:()=>void = () => {}, isOn: boolean=false, classAdd:string=""){
      return <button onClick={onClickEvent} className={'h-fit px-1 md:px-2 py-1 rounded-lg border-b-[3px] active:border-0 '+classAdd+` ${isOn ? "text-white/80 bg-pr-bg-3 border-slate-600/50 hover:bg-slate-600 active:bg-slate-600 active:text-white/80" : "text-pr-text-menu bg-pr-bg border-slate-400/50 hover:bg-slate-300 active:bg-slate-400 active:text-white/80"}`}>
      {msg}
      </button>
    }

    function handleFilterPanel(){
      setViewFilter(!viewFilter)
    }

    function handleFilterSubmit(clear=false){
      if(!clear){
        setViewFilter(!viewFilter)
      }
    }
    
    function isGroupFilterOn(name: string = ""){
      return group.includes(name);
    }

    function FilterTogglePRC(name:string){
      let temp_group = group;

      if(group.includes(name)){
        temp_group = group.filter((item:string) => item !== name)
      } else {
        temp_group.push(name);
      }

      setFilter({...filter, group: temp_group})
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
            {elemButton("หมวด 1", ()=>FilterTogglePRC("ge-1"), isGroupFilterOn("ge-1"))}
            {elemButton("หมวด 2", ()=>FilterTogglePRC("ge-2"), isGroupFilterOn("ge-2"))}
            {elemButton("หมวด 3", ()=>FilterTogglePRC("ge-3"), isGroupFilterOn("ge-3"))}
            {elemButton("หมวด 4", ()=>FilterTogglePRC("ge-4"), isGroupFilterOn("ge-4"))}
            {elemButton("หมวด 5", ()=>FilterTogglePRC("ge-5"), isGroupFilterOn("ge-5"))}
          </div>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {elemButton("พื้นฐาน", ()=>FilterTogglePRC("fund"), isGroupFilterOn("fund"))}
            {elemButton("เอกบังคับ", ()=>FilterTogglePRC("mainf"), isGroupFilterOn("mainf"))}
            {elemButton("เอกเลือก", ()=>FilterTogglePRC("mainc"), isGroupFilterOn("mainc"))}
            {elemButton("วิชาเสรี", ()=>FilterTogglePRC("free"), isGroupFilterOn("free"))}
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