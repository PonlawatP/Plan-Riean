import { ThemeContext } from '@/providers'
import { IBM_Plex_Sans_Thai } from 'next/font/google'
import { useContext, useRef, useState } from 'react'
import 'boxicons/css/boxicons.min.css'
import Image from 'next/image'
import { CalendarContext, CalendarFilterContext, ICalendarData, ICalendarFilter } from '@/providers/CalendarProvider'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import PRSubjectSelector from '../components/PRSubjectSelector'
import PRSubjectFilter from '../components/PRSubjectFilter'
import PRSidebar from '../components/PRSidebar'
import DialogFirstSearch from '../components/PRSubjectSelector/dialogue/firstSearch'
import DialogSearchNotFound from '../components/PRSubjectSelector/dialogue/searchNotFound'
import DialogLoading from '../components/PRSubjectSelector/dialogue/loading'
import DialogError from '../components/PRSubjectSelector/dialogue/error'
import SubjectSelectorFilterModel from '../services/subjectSelector/filter'

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
  const [viewFilter, setViewFilter] = useState(false)
  const [webReady, setWebReady] = useState(false)
  const [scrolled, setScrolled] = useState(0)
  const [topbarToggle, setTopbarToggle] = useState({pre: false, init: false})
  const [topbarCord, setTopbarCord] = useState([0,0])
  const [topbarHtml, setTopbarHtml] = useState(<></>)
  const [toggleHold, setTooggleHold] = useState<any>(null);

  const [planSize, setPlanSize] = useState(.4);
  const [planWidth, setPlanWidth] = useState(1);

  const canvasElemRef = useRef<HTMLElement | null>(null);
  const planElemRef = useRef<HTMLElement | null>(null);

  const [focusTime, setFocusTime] = useState({
    day: 0,
    start_time: 8,
    end_time: 8
  })

  const [MAX_SUBJECT_TIME, setMAX_SUBJECT_TIME] = useState(18);

  function getTimeTable(added: number = 16){
    const times_m: Array<number> = [];
    for (let i = 8; i <= added; i++) {
      times_m.push(i);
    }
    return times_m;
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

    // data & functions to use in Subject Selector
    const [calsel_data, setCalselData] = useState<ICalendarData>({
      isFirstLoading: true,
      isLoading: false,
      isError: false,
      updated: "null",
      current_filter: {
          group: [],
          subject: [],
          day: [],
          time: [],
          room: [],
          master: []
      },
      result: {
          recommanded: [],
          data: []
      }
    })

  return (
    <>
    <style jsx global>{`
        body {
          background: ${theme === 'day' ? "#E6EDF3" : "#2A3035"};
          touch-action: none;
        }
    `}</style>

    <CalendarContext.Provider value={{
      viewSchedule, setViewState, webReady, setWebReady, scrolled, setScrolled, topbarToggle, setTopbarToggle, topbarCord, setTopbarCord, topbarHtml, setTopbarHtml, toggleHold, setTooggleHold, 
      resizePlan, planWidth, setPlanWidth, planSize, setPlanSize, canvasElemRef, planElemRef, viewFilter, setViewFilter, focusTime, setFocusTime, MAX_SUBJECT_TIME, setMAX_SUBJECT_TIME, getTimeTable,
      calsel_data, setCalselData
    }}>
      <SubjectSelectorFilterModel classname={font.className}>
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
            <PRSubjectSelector isShowDialog={!calsel_data.isLoading && !calsel_data.isError}>
              {
                calsel_data.isLoading ?
                  <DialogLoading/>
                :
                calsel_data.isError
                ?
                  <DialogError/>
                :
                calsel_data.result.data.length != 0
                ?
                  <>TODO: show subject list here...</>
                :
                calsel_data.isFirstLoading
                ?
                  <DialogFirstSearch/>
                :
                  <DialogSearchNotFound/>
              }
            </PRSubjectSelector>
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
      </SubjectSelectorFilterModel>
    </CalendarContext.Provider>
    </>
  )
}
