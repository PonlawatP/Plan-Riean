import { CalendarContext } from "@/app/providers/CalendarProvider"
import { useContext } from "react"

export default function PRSidebar(props:any){
    const {
        viewSchedule,
        topbarToggle,
    } = useContext(CalendarContext)
    
    return <section 
      className={`
        pr-sidebar smooth-all relative hidden p-8 drop-shadow-xl min-h-[460px] md:w-[122px] ${!viewSchedule ? "lg:w-[260px]" : "md:w-[510px] lg:w-[510px]"} md:block smooth-opacity 
        ${viewSchedule ? "opacity-0 translate-x-10" : topbarToggle.init ? "opacity-20" : "opacity-100"}
      `}
    >
      {/* main sidebar */}
      <div className="content relative flex flex-col h-full bg-white/60 border-[1px] rounded-3xl overflow-hidden">
        <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60 bg-pr-msu-1 text-pr-msu-1-60'>
          <i className='bx bx-home text-2xl drop-shadow-pr-shadow-text'/>
          <p className="drop-shadow-pr-shadow-text hidden lg:block">แผนเรียน</p>
        </button>
        {/* <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
          <i className='group-hover:drop-shadow-pr-shadow-text bx bx-task text-2xl'/>
          <p className="group-hover:drop-shadow-pr-shadow-text hidden lg:block">รายการแผน</p>
        </button>
        <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
          <i className='group-hover:drop-shadow-pr-shadow-text bx bx-stats text-2xl'/>
          <p className="group-hover:drop-shadow-pr-shadow-text hidden lg:block">สถานะการเรียน</p>
        </button>
        <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
          <i className='group-hover:drop-shadow-pr-shadow-text bx bx-git-repo-forked text-2xl rotate-90'/>
          <p className="group-hover:drop-shadow-pr-shadow-text hidden lg:block">เส้นทางหลักสูตร</p>
        </button> */}
        <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
          <i className='group-hover:drop-shadow-pr-shadow-text bx bx-star text-2xl'/>
          <p className="group-hover:drop-shadow-pr-shadow-text hidden lg:block">รีวิว</p>
        </button>
        {/* <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
          <i className='group-hover:drop-shadow-pr-shadow-text bx bx-map-alt text-2xl'/>
          <p className="group-hover:drop-shadow-pr-shadow-text hidden lg:block">แผนที่</p>
        </button> */}
        <button className='absolute bottom-0 px-4 h-14 w-full text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
          <i className='group-hover:drop-shadow-pr-shadow-text bx bx-cog text-2xl'/>
          <p className="group-hover:drop-shadow-pr-shadow-text hidden lg:block">ตั้งค่า</p>
        </button>
      </div>
    </section>
}