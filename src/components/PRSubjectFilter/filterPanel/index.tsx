import { CalendarContext, CalendarFilterContext } from "@/app/providers/CalendarProvider"
import { useContext, useEffect, useState } from "react"

export default function FilterPanel(props:any){
    const {
        viewSchedule,
        viewFilter,
        topbarToggle,
        calsel_data,
        setCalselData
    } = useContext(CalendarContext)
    const f = useContext(CalendarFilterContext);
    const {
      group,
      subject,
      day,
      time,
      room,
      master
  } = f.filter;
  const {updated} = calsel_data
  const {title="name", placeholder="", isOn, onClose=()=>{}, onClear=()=>{}, onSearch=(value:string | null)=>{}} = props

  const [tempOn, setTempOn] = useState(false)
  useEffect(()=>{
    if(isOn){
      setTempOn(isOn)
    } else {
      setTimeout(()=>{
        setTempOn(false)
      }, 150)
    }
  },[isOn])

    return <section className={`pr-subject-filter pointer-events-none smooth-all absolute lg:left-[465px] md:p-8 w-full md:w-auto bottom-0 h-full grid z-10 lg:z-auto ${!viewSchedule || topbarToggle.init || topbarToggle.pre || !viewFilter || !isOn ? "opacity-0 scale-95 invisible" : ""}`}>
        {isOn || tempOn ? <div className={`pr-subject-filter-body pointer-events-auto relative grid grid-rows-[auto_minmax(0,1fr)] md:w-[450px] h-full overflow-auto p-1 rounded-3xl border-[1px] border-pr-bg-3/20 bg-white backdrop-blur-lg`}>
          {/* header */}
          <section className="pr-subject-header flex justify-between p-2 py-3 border-b-[1px] border-slate-400/50">
            <div className="flex gap-2 items-center font-semibold text-xl">
              <button onClick={onClose} className='hover:bg-pr-bg active:bg-slate-300 rounded-lg aspect-square w-10'>
                <i className="bx bx-x text-3xl translate-y-[2px]"></i>
              </button>
              <div className="">
                <h1>{title}</h1>
              </div>
            </div>
            {/* search zone */}
            <div className="relative text-white/80 focus-within:text-gray-400 mr-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 pb-[2px]">
                <i className="bx bx-search-alt text-xl"></i>
              </span>
              <input onChange={(e)=>f.handleFilterOnSubmit(()=>{
                onSearch(e.target.value)
              })
              } type="search" name="q" className="w-36 py-2 text-sm bg-pr-bg-3 focus:bg-pr-bg focus:text-pr-msu-2 border-slate-600/50 border-b-[3px] rounded-md pl-10 pr-2 focus:outline-none" placeholder={placeholder} />
            </div>
          </section>
          {/* content */}
          <div className="content w-full h-full relative grid grid-rows-[1fr_auto]">
            <span className={`smooth-all absolute pointer-events-none block h-1 shadow-md left-0 rounded-b-full shadow-pr-msu-1 bg-pr-msu-1`} style={{opacity: `${f.filterDebounceProgress > 96 || f.filterDebounceProgress == 0 ? 0 : 100}%`, width: `${f.filterDebounceProgress}%`}}></span>
            <section className="pr-subject-filter-content relative overflow-auto fade-y">
              {props.children}
            </section>
            <section className="pr-subject-actions z-10 p-5 pt-2">
              <div className="pr-filter-btn flex gap-3 justify-end">
                <button onClick={onClear} className={`w-24 text-pr-text-menu h-fit px-2 py-1 rounded-lg bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80 ${calsel_data.isLoading ? "pointer-events-none opacity-50" : ""}`}>
                  ล้าง
                </button>
                <button onClick={onClose} className={`w-24 h-fit px-2 py-1 rounded-lg border-b-[3px] active:border-0 text-white/80 bg-pr-bg-3 border-slate-600/50 hover:bg-slate-600 active:bg-slate-600 active:text-white/80 ${calsel_data.isLoading ? "pointer-events-none opacity-50" : ""}`}>
                  ตกลง
                </button>
              </div>
            </section>
          </div>
        </div> : null}
      </section>
}