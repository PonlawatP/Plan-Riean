import GoogleAnalytics from '@/GoogleAnalytics'
import { ThemeContext } from '@/providers'
import type { Metadata } from 'next'
import { IBM_Plex_Sans_Thai } from 'next/font/google'
import { useContext, useState } from 'react'
import 'boxicons/css/boxicons.min.css'
import Image from 'next/image'
import { CalendarContext } from '@/providers/CalendarProvider'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

const font = IBM_Plex_Sans_Thai({ 
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ['latin', 'thai'],
  display: "swap"
})

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const {theme} = useContext(ThemeContext)

  const [viewSchedule, setViewState] = useState(false)
  const [webReady, setWebReady] = useState(false)
  const [scrolled, setScrolled] = useState(0)
  const [topbarToggle, setTopbarToggle] = useState({pre: false, init: false})
  const [topbarCord, setTopbarCord] = useState([0,0])
  const [topbarHtml, setTopbarHtml] = useState(<></>)
  const [toggleHold, setTooggleHold] = useState<any>(null);

  function handleReleaceHoldClick(e:any){
    if(topbarToggle.init){
      setViewState(true)
    }
    clearTimeout(toggleHold);
    setTopbarToggle({pre: false, init: false});
  }

  return (
    <>
    <style jsx global>{`
        body {
          background: ${theme === 'day' ? "#E6EDF3" : "#2A3035"};
          touch-action: none;
        }
    `}</style>

    <CalendarContext.Provider value={{viewSchedule, setViewState, webReady, setWebReady, scrolled, setScrolled, topbarToggle, setTopbarToggle, topbarCord, setTopbarCord, topbarHtml, setTopbarHtml, toggleHold, setTooggleHold, handleReleaceHoldClick}}>
      
      <div 
        className={"pr-layout h-[100dvh] grid grid-rows-[auto_1fr] "+font.className}
        onMouseUp={handleReleaceHoldClick}
      >
        <section className={`pr-topbar flex justify-center sm:justify-between items-center p-8 py-4 smooth-opacity ${topbarToggle.init ? "opacity-20" : "opacity-100"}`}>
          <button className='hidden sm:flex'><Image src="/assets/images/Planriean.png" alt="Planriean Logo" width={30} height={30}></Image></button>
          <article className='pr-planheader relative bg-white/80 border-1 border-white p-4 px-8 min-w-full md:min-w-[25rem] w-[45%] rounded-full shadow-xl'>
            <button className="header text-xl font-medium flex gap-3 group">
              <h1>แผนเรียนใหม่</h1> <span className='text-pr-gray-1/80 group-hover:bg-pr-msu-1 group-hover:text-pr-msu-1-60 aspect-square h-7 rounded-md -mt-1'><i className='bx bx-pencil mt-[3px]'></i></span>
            </button>
            <span className='text-md font-light text-pr-gray-1 md:flex gap-3'>
              <span className='flex gap-3'>
                <span className='flex gap-2'><p>เทอม</p><p>1</p></span>
                <span className='flex gap-2'><p>ปีการศึกษา</p><p>2565</p></span>
              </span>
              <span className='plan-badge flex gap-2'>
                <span className='uni-badge text-sm font-bold px-2 rounded-full border-[2px] border-blue-900/30 bg-blue-300 text-blue-900/60'>IT</span>
                <span className='uni-badge text-sm font-bold px-2 rounded-full border-[2px] border-pr-msu-1-60/30 bg-pr-msu-1 text-pr-msu-1-60'>MSU</span>
              </span>
            </span>
            {/* <button className='absolute right-10 top-1/2 -mt-4 rounded-xl text-pr-msu-1-60 bg-pr-msu-1 border-2 border-pr-msu-1-60/30 p-1 px-2'>เลิอกแผนนี้</button> */}
          </article>
          <button className="pr-account hidden sm:flex group gap-3 items-center text-pr-gray-1 text-md font-light hover:underline">
            <p className='hidden md:block'>Ponlawat</p>
            <Image src="https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-1/384989124_2274522622755838_4666111611377143413_n.jpg?stp=c34.0.445.444a_dst-jpg_p480x480&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=wUdpZxwB05YAX8ciyiU&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfD3pTyHz5xsvdJK4L_DaKLOagZBY8VVOouRgtoNPp78gQ&oe=655AF106" alt="Planriean Logo" width={50} height={50} className='rounded-full aspect-square object-cover border-2 border-white/30'></Image>
          </button>
        </section>

        <div className={
          'pr-main select-none grid relative md:grid-cols-[auto_1fr] overflow-hidden'
          }>
            <section 
              className={`
                pr-sidebar smooth-all relative hidden p-8 drop-shadow-xl min-h-[460px] md:w-[122px] ${!viewSchedule ? "lg:w-[260px]" : "md:w-[425px] lg:w-[425px]"} md:block smooth-opacity 
                ${viewSchedule ? "opacity-0 translate-x-10" : topbarToggle.init ? "opacity-20" : "opacity-100"}
              `}
            >
              {/* main sidebar */}
              <div className="content relative flex flex-col h-full bg-white/60 border-[1px] rounded-3xl overflow-hidden">
                <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60 bg-pr-msu-1 text-pr-msu-1-60'>
                  <i className='bx bx-home text-2xl drop-shadow-pr-shadow-text'/>
                  <p className="drop-shadow-pr-shadow-text hidden lg:block">แผนเรียน</p>
                </button>
                <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
                  <i className='group-hover:drop-shadow-pr-shadow-text bx bx-task text-2xl'/>
                  <p className="group-hover:drop-shadow-pr-shadow-text hidden lg:block">แผนการเรียน</p>
                </button>
                <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
                  <i className='group-hover:drop-shadow-pr-shadow-text bx bx-stats text-2xl'/>
                  <p className="group-hover:drop-shadow-pr-shadow-text hidden lg:block">สถานะการเรียน</p>
                </button>
                <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
                  <i className='group-hover:drop-shadow-pr-shadow-text bx bx-git-repo-forked text-2xl rotate-90'/>
                  <p className="group-hover:drop-shadow-pr-shadow-text hidden lg:block">เส้นทางหลักสูตร</p>
                </button>
                <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
                  <i className='group-hover:drop-shadow-pr-shadow-text bx bx-star text-2xl'/>
                  <p className="group-hover:drop-shadow-pr-shadow-text hidden lg:block">รีวิว</p>
                </button>
                <button className='px-4 h-14 text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
                  <i className='group-hover:drop-shadow-pr-shadow-text bx bx-map-alt text-2xl'/>
                  <p className="group-hover:drop-shadow-pr-shadow-text hidden lg:block">แผนที่</p>
                </button>
                <button className='absolute bottom-0 px-4 h-14 w-full text-left flex items-center gap-2 group hover:bg-pr-msu-1 hover:text-pr-msu-1-60'>
                  <i className='group-hover:drop-shadow-pr-shadow-text bx bx-cog text-2xl'/>
                  <p className="group-hover:drop-shadow-pr-shadow-text hidden lg:block">ตั้งค่า</p>
                </button>
              </div>
            </section>
          {children}
          {/* subject selector */}
          <section className={`pr-subject-select smooth-all absolute md:p-8 w-full md:w-auto h-full grid ${!viewSchedule ? "opacity-0 translate-y-10 md:-translate-x-10 invisible" : topbarToggle.init ? "opacity-20" : ""}`}>
            <div className="pr-subject-select-body relative md:w-[360px] p-1 rounded-3xl border-[1px] border-white/80 bg-white/90">
              <div className="pr-subject-header flex justify-between p-2 py-3 border-b-[1px] border-black/20">
                <div className="flex gap-2 items-center font-semibold text-xl">
                  <button onClick={()=>setViewState(false)} className='hover:bg-pr-bg active:bg-slate-300 rounded-lg aspect-square w-10'>
                    <i className="bx bx-chevron-left text-3xl translate-y-[2px]"></i>
                  </button>
                  <h1>เลือกรายวิชา</h1>
                </div>
                <button className='text-pr-text-menu border-2 border-black/20 px-2 mr-2 rounded-lg bg-pr-bg hover:bg-slate-300 active:bg-slate-400'>
                  <i className="bx bx-layer text-xl translate-y-[3px] mr-1"></i> คัดกรอง
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className=""
        />
    </CalendarContext.Provider>
    </>
  )
}
