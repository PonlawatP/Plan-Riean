import { CalendarContext, CalendarFilterContext } from "@/app/providers/CalendarProvider"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext } from "react"

export default function PRSidebar(props:any){
  const { hidden } = props
  const {
      viewSchedule,
      topbarToggle,
      getCurrentPlan,
      createNewPlan
  } = useContext(CalendarContext)
  const {
      handleOpenSubjectSelect
  } = useContext(CalendarFilterContext)

  const redirect = useRouter()
  // console.log(redirect)
    function getBarActive(path = "", icon = false){
      // console.log(path, redirect.pathname, path == redirect.pathname)
      const act = path == redirect.pathname;
      if(icon) {
        return act ? "drop-shadow-pr-shadow-text" : "group-hover:drop-shadow-pr-shadow-text"
      } else {
        return act ? "bg-pr-msu-1 text-pr-msu-2" : "hover:bg-pr-msu-1 text-pr-msu-2"
      }
    }
    
    return <section 
      className={`
        pr-sidebar smooth-all relative hidden p-8 drop-shadow-xl min-h-[460px] md:w-[122px] ${!viewSchedule ? "lg:w-[260px]" : "md:w-[510px] lg:w-[510px]"} ${!hidden ? "md:block" : ""} smooth-opacity 
        ${viewSchedule ? "opacity-0 translate-x-10" : topbarToggle.init ? "opacity-20" : "opacity-100"}
      `}
    >
      {/* main sidebar */}
      <div className={`grid gap-8 ${redirect.pathname != "/plan/plan/[plan_id]" ? "" : "h-full"}`}>
      {redirect.pathname != "/plan/plan/[plan_id]" ? 
        <button onClick={(e)=>createNewPlan()} className="content relative w-full p-4 py-3 flex items-center gap-2 bg-white/60 hover:bg-pr-msu-1 text-pr-msu-2 border-pr-msu-1 group border-[2px] rounded-3xl overflow-hidden">
          <i className={`bx bx-plus text-2xl font-bold ${getBarActive("/", true)}`}></i> <p>สร้างแผนใหม่</p>
        </button>
        : null }

        <div className="content relative flex flex-col h-full bg-white/60 border-[1px] rounded-3xl overflow-hidden">
          {redirect.pathname == "/plan/plan/[plan_id]" ?
            <>
              <Link href="/plan" className={`px-4 h-14 text-left flex items-center gap-2 group ${getBarActive("/plan")}`}>
                <i className={`bx bx-home text-2xl ${getBarActive("/plan", true)}`}/>
                <p className="hidden lg:block">หน้าแรก</p>
              </Link>
              <button className={`px-4 h-14 text-left flex items-center gap-2 group ${getBarActive("/plan/plan/[plan_id]")}`}>
                <i className={`bx bx-task text-2xl ${getBarActive("/plan/plan/[plan_id]", true)}`}/>
                <p className="hidden lg:block">แผนเรียน</p>
              </button>
              <button onClick={()=>handleOpenSubjectSelect()} className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 text-pr-msu-2'>
                <i className={`bx bx-objects-horizontal-left text-2xl ${getBarActive("/", true)}`}/>
                <p className="hidden lg:block">เลือกรายวิชา</p>
              </button>
              <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 text-pr-msu-2'>
                <i className={`bx bx-git-repo-forked text-2xl rotate-90 ${getBarActive("/", true)}`}/>
                <p className="hidden lg:block">เส้นทางหลักสูตร</p>
              </button>
              <button className='absolute bottom-0 px-4 h-14 w-full text-left flex items-center gap-2 group hover:bg-pr-msu-1 text-pr-msu-2'>
                <i className={`bx bx-cog text-2xl ${getBarActive("/", true)}`}/>
                <p className="hidden lg:block">ตั้งค่า</p>
              </button>
            </>
          :
            <>
              <Link href="/plan" className={`px-4 h-14 text-left flex items-center gap-2 group ${getBarActive("/plan")}`}>
                <i className={`bx bx-home text-2xl ${getBarActive("/plan", true)}`}/>
                <p className="hidden lg:block">หน้าแรก</p>
              </Link>
              {getCurrentPlan().data ? <button className={`px-4 h-14 text-left flex items-center gap-2 group ${getBarActive("/plan/plan/[plan_id]")}`}>
                <i className={`bx bx-task text-2xl ${getBarActive("/plan/plan/[plan_id]", true)}`}/>
                <p className="hidden lg:block">แผนเรียน</p>
              </button> : null}
              
              <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 text-pr-msu-2'>
                <span className={`${getBarActive("/", true)}`}><i className={`bx bx-git-repo-forked text-2xl rotate-90`}/></span>
                <p className="hidden lg:block">เส้นทางหลักสูตร</p>
              </button>
            </>}
          {/* <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
            <i className='bx bx-star text-2xl'/>
            <p className="hidden lg:block">รีวิว</p>
          </button> */}
          {/* <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
            <i className='bx bx-stats text-2xl'/>
            <p className="hidden lg:block">สถานะการเรียน</p>
          </button> */}
          {/* <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
            <i className='bx bx-map-alt text-2xl'/>
            <p className="hidden lg:block">แผนที่</p>
          </button> */}
        </div>
      </div>
    </section>
}