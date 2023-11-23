import GoogleAnalytics from '@/GoogleAnalytics'
import { ThemeContext } from '@/providers'
import type { Metadata } from 'next'
import { IBM_Plex_Sans_Thai } from 'next/font/google'
import { useContext, useRef, useState } from 'react'
import 'boxicons/css/boxicons.min.css'
import Image from 'next/image'
import { CalendarContext, CalendarFilterContext, ICalendarFilter } from '@/providers/CalendarProvider'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import PRSubjectSelector from '../PRSubjectSelector'
import PRSubjectFilter from '../PRSubjectFilter'
import PRSidebar from '../PRSidebar'
import DialogFirstSearch from '../PRSubjectSelector/dialogue/firstSearch'
import DialogSearchNotSellectGroup from '../PRSubjectSelector/dialogue/searchNotSellectGroup'
import DialogSearchNotFound from '../PRSubjectSelector/dialogue/searchNotFound'
import DialogLoading from '../PRSubjectSelector/dialogue/loading'

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

  const [viewSchedule, setViewState] = useState(true)
  const [viewFilter, setViewFilter] = useState(false)
  const [webReady, setWebReady] = useState(false)
  const [scrolled, setScrolled] = useState(0)
  const [topbarToggle, setTopbarToggle] = useState({pre: false, init: false})
  const [topbarCord, setTopbarCord] = useState([0,0])
  const [topbarHtml, setTopbarHtml] = useState(<></>)
  const [toggleHold, setTooggleHold] = useState<any>(null);
  const resizeFunc = useRef<void>();

  const [planSize, setPlanSize] = useState(.4);
  const [planWidth, setPlanWidth] = useState(1);

  const canvasElemRef = useRef<HTMLElement | null>(null);
  const planElemRef = useRef<HTMLElement | null>(null);

  const [filter, setFilter] = useState<ICalendarFilter>({
    updated: "null",
    group: [],
    subject: [],
    day: [],
    time: [],
    room: [],
    master: []
})

const [focusTime, setFocusTime] = useState({
  day: 0,
  start_time: 8,
  end_time: 8
})

  function handleReleaceHoldClick(e:any){
    if(topbarToggle.init){
      if(focusTime.start_time < focusTime.end_time){
        TimeFilterTogglePRC(false, focusTime.start_time.toString().padStart(2, "0")+":00", (focusTime.end_time+1).toString().padStart(2, "0")+":00")
      } else {
        TimeFilterTogglePRC(false, focusTime.end_time.toString().padStart(2, "0")+":00", (focusTime.start_time+1).toString().padStart(2, "0")+":00")
      }

      setViewState(true)
      setViewFilter(true)
      setTimeout(()=>{resizePlan()},250)
    }
    clearTimeout(toggleHold);
    setTopbarToggle({pre: false, init: false});
  }

  const resizePlan = () => {
    const canvasElem = canvasElemRef.current
    const planElem = planElemRef.current
    if(canvasElem instanceof HTMLElement && planElem instanceof HTMLElement){
      const canvas = canvasElem?.offsetWidth || 0
      const plan = planElem?.offsetWidth || 0

      if(canvas/plan <= 1){
        setPlanSize(canvas/plan)
        setPlanWidth(canvas)
      } else {
        setPlanSize(1)
        setPlanWidth(-1)
      }
    }
  };
  
  function fnHandleClickedOnCalendar(tindex: number, dindex: number, view = true) {
    // toast("test")
    if(viewSchedule){
      setViewState(false)
      setViewFilter(false)
    } else {
      if(tindex >= 0) SingleTimeFilterTogglePRC((8+tindex).toString().padStart(2, "0")+":00", true)

      setViewState(true)
      setViewFilter(true)
    }
    setTimeout(()=>{resizePlan()},250)
  }

  function TimeFilterTogglePRC(all:boolean=false, time_start:string="", time_stop:string=""){
    let temp_time = filter.time;
    if(all){
      if(!temp_time.includes("all")){
        temp_time = temp_time.map((t:string)=>t===t.replaceAll("-","")?"-"+t:t)
          temp_time.push("all");
      }
    } else if(time_start !== "" && time_stop !== ""){
      temp_time = [time_start, time_stop]
    }

    setFilter({...filter, time: temp_time})
  }
  function SingleTimeFilterTogglePRC(time_num:string="", forceToggle = false){
    let temp_time = filter.time;

    if(!filter.time.includes(time_num)){
      temp_time = [time_num]
    } else {
      temp_time = temp_time.filter((t:string)=>t!=="all")

      temp_time = temp_time.map((tt:string)=>{
        if(tt === time_num){
          return time_num.includes("-") ? tt.slice(1) : forceToggle ? tt : "-"+tt
        }
        return tt
      })
    }


    setFilter({...filter, time: temp_time})
  }

  return (
    <>
    <style jsx global>{`
        body {
          background: ${theme === 'day' ? "#E6EDF3" : "#2A3035"};
          touch-action: none;
        }
    `}</style>

    <CalendarContext.Provider value={{
      viewSchedule, setViewState, webReady, setWebReady, scrolled, setScrolled, topbarToggle, setTopbarToggle, topbarCord, setTopbarCord, topbarHtml, setTopbarHtml, toggleHold, setTooggleHold, handleReleaceHoldClick
      , resizePlan, planWidth, setPlanWidth, planSize, setPlanSize, canvasElemRef, planElemRef, fnHandleClickedOnCalendar, viewFilter, setViewFilter, focusTime, setFocusTime
    }}>
      
      <CalendarFilterContext.Provider value={{filter, setFilter, TimeFilterTogglePRC, SingleTimeFilterTogglePRC}}>
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
              <Image src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" alt="Planriean Logo" width={50} height={50} className='rounded-full aspect-square object-cover border-2 border-white/30'></Image>
            </button>
          </section>

          <div className={
            'pr-main select-none grid relative md:grid-cols-[auto_1fr] overflow-hidden'
            }>
            {/* sidebar */}
            <PRSidebar/>
            {children}
            {/* subject selector */}
            <PRSubjectSelector isShowDialog={false}>
              <DialogFirstSearch/>
              {/* <DialogSearchNotSellectGroup/>
              <DialogSearchNotFound/>
              <DialogLoading/> */}

              {/* TODO: subject list right here */}
              {/* <p className='bg-red-400'>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p> */}
            </PRSubjectSelector>
            <PRSubjectFilter />
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
        </CalendarFilterContext.Provider>
    </CalendarContext.Provider>
    </>
  )
}
