import { ThemeContext } from '@/app/providers'
import { IBM_Plex_Sans_Thai, K2D } from 'next/font/google'
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import 'boxicons/css/boxicons.min.css'
import Image from 'next/image'
import { CalendarContext, CalendarFilterContext, ICalendarData, ICalendarFilter } from '@/app/providers/CalendarProvider'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import PRSubjectSelector from '../../components/PRSubjectSelector'
import PRSubjectFilter from '../../components/PRSubjectFilter'
import PRSidebar from '../../components/PRSidebar'
import DialogFirstSearch from '../../components/PRSubjectSelector/dialogue/firstSearch'
import DialogSearchNotFound from '../../components/PRSubjectSelector/dialogue/searchNotFound'
import DialogLoading from '../../components/PRSubjectSelector/dialogue/loading'
import DialogError from '../../components/PRSubjectSelector/dialogue/error'
import SubjectSelectorFilterModel from '../services/subjectSelector/filter'
import { PRThemeSwitcher } from '@/components/PRThemeSwitcher'
import { subjectDemoData } from '../utils/test-data/subjects'
import { IsubjectSectDate, calculateScale, getDayIndex, getHourIndex, getSplitedData } from '../utils/msu/subjectUtils'
import SubjectList from '@/components/SubjectList'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import AuthProvider from '@/app/providers/AuthProvider'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import { useSession, signOut } from "next-auth/react";
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { deleteTokenCookieClientSide } from '../utils/auth'
import Cookies from 'js-cookie';

export const font = IBM_Plex_Sans_Thai({ 
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ['latin', 'thai'],
  display: "swap"
})
export const k2dfont = K2D({ 
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ['latin', 'thai'],
  display: "swap"
})

export default function PlanPageLayout({
  children
}: {
  children: React.ReactNode,
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
  const [toggleSidebar, setTooggleSidebar] = useState(true);

  const [planSize, setPlanSize] = useState(.4);
  const [planWidth, setPlanWidth] = useState(1);

  const canvasElemRef = useRef<HTMLElement | null>(null);
  const planElemRef = useRef<HTMLElement | null>(null);

  const [focusTime, setFocusTime] = useState({
    day: 0,
    start_time: 8,
    end_time: 8
  })

  const [myPlan, setMyPlan] = useState<any>({data: undefined, subjects:[]});
  const [MAX_SUBJECT_TIME, setMAX_SUBJECT_TIME] = useState(18);

  const router = usePathname()
  const params = useSearchParams()
  const rollback_url = `${router}${params ? "?"+params.toString() : ""}`

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

    function getCurrentPlan() {
      return myPlan;
    }
    const checkSubjectSchedule = (subject: any) => {
      const plan = getCurrentPlan();
      return (
        plan.subjects.filter(
          (data: any) =>
            data.code.trim() === subject.code.trim() && data.sec === subject.sec
        ).length > 0
      );
    };
    const addSubjectSchedule = (subject: any) => {
      const plan = getCurrentPlan();
      plan.subjects.push(subject);
      setMyPlan(plan);
    };
    const removeSubjectSchedule = (subject: any) => {
      const plan = getCurrentPlan();
      plan.subjects = plan.subjects.filter(
        (data: any) =>
          data.code.trim() !== subject.code.trim() || data.sec !== subject.sec
      );
      setMyPlan(plan);
    };
    const toggleSubjectSchedule = (subject: any) => {
      if (checkSubjectSchedule(subject)) {
        removeSubjectSchedule(subject);
      } else {
        addSubjectSchedule(subject);
      }
    };
    const checkSubjectCollapsed = (subject: any) => {
      const plan = getCurrentPlan();
      const res = plan.subjects.filter(
        (data: any) => {
          return getSplitedData(data.time).filter(
            (df: IsubjectSectDate) =>
              getSplitedData(subject.time).filter(
                (sf: IsubjectSectDate) => {
                  // console.log(sf, df, getHourIndex(sf.fullDate), (calculateScale(sf.fullDate) - 1), getHourIndex(df.fullDate))
                  return getDayIndex(df.fullDate) == getDayIndex(sf.fullDate) &&
                  (
                    getHourIndex(df.fullDate) == getHourIndex(sf.fullDate) ||
                    (
                      getHourIndex(sf.fullDate) + (calculateScale(sf.fullDate) - 1) >= getHourIndex(df.fullDate)
                      &&
                      getHourIndex(df.fullDate) + (calculateScale(df.fullDate) - 1) >= getHourIndex(sf.fullDate)
                    )
                  )
                }
              ).length > 0
          ).length > 0
        }
      );
      return res.length > 0;
    };
    const { data: session } = useSession();

    const isSessionLoaded = session != undefined
    const hasSession = session != null

    // console.log(session)
    
  async function createNewPlan(){
    const resolveWithSomeData = new Promise(resolve => setTimeout(() => resolve("world"), 3000));
    toast.promise(
        resolveWithSomeData,
        {
          pending: {
            render(){
              return "สร้างแพลนเรียนใหม่"
            },
          },
          success: {
            render({data}){
              return `สร้างแพลนเรียนแล้ว`
            },
          },
          error: {
            render({data}){
              // When the promise reject, data will contains the error
              return `เกิดข้อผิดพลาด ขออภัยในความไม่สะดวก`
            }
          }
        }
    )
  }

  return (
    <>
      <style jsx global>{`
          :root {
            --toastify-font-family: ${font.style.fontFamily};
          }
          body {
            touch-action: none;
          }
      `}</style>
      <CalendarContext.Provider value={{
        viewSchedule, setViewState, webReady, setWebReady, scrolled, setScrolled, topbarToggle, setTopbarToggle, topbarCord, setTopbarCord, topbarHtml, setTopbarHtml, toggleHold, setTooggleHold, toggleSidebar, setTooggleSidebar,
        resizePlan, planWidth, setPlanWidth, planSize, setPlanSize, canvasElemRef, planElemRef, viewFilter, setViewFilter, focusTime, setFocusTime, MAX_SUBJECT_TIME, setMAX_SUBJECT_TIME, getTimeTable,
        calsel_data, setCalselData, myPlan, setMyPlan,
        getCurrentPlan, checkSubjectSchedule, addSubjectSchedule, removeSubjectSchedule, toggleSubjectSchedule, checkSubjectCollapsed,
        createNewPlan
      }}>
        <SubjectSelectorFilterModel classname={font.className}>
          <section className={`pr-topbar flex justify-center sm:justify-between items-center p-8 py-4 h-28 smooth-opacity ${topbarToggle.init ? "opacity-20" : "opacity-100"}`}>
            <Link href={"/plan"} className='hidden sm:flex'><Image src="/assets/images/logo/Planriean.png" alt="Planriean Logo" width={30} height={30}></Image></Link>
            { getCurrentPlan().data ?
              <article className='pr-planheader relative bg-white/80 border-1 border-white p-4 px-8 min-w-full md:min-w-[25rem] w-[45%] rounded-full shadow-xl'>
                <button className="header text-xl font-medium flex gap-3 group">
                  <h1>แผนเรียนใหม่</h1>
                  <span className='text-pr-gray-1/80 group-hover:bg-pr-msu-1 group-hover:text-pr-msu-1-60 aspect-square h-7 rounded-md -mt-1'>
                    <i className='bx bx-pencil mt-[3px]'></i>
                  </span>
                  {/* <PRThemeSwitcher></PRThemeSwitcher> */}
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
              :
              null
            }
            {hasSession ?
              <Menu as="div" className={font.className}>
                    <div>
                      <Menu.Button className="pr-account hidden sm:flex group gap-3 items-center text-pr-gray-1 text-md font-normal leading-4 hover:underline">
                        {/* <span className="absolute -inset-1.5" /> */}
                        {/* <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={session?.user?.image || ""}
                          alt="User Profile"
                        /> */}
                        <div className="text-right hidden md:block mt-2">
                          <p className=''>{session?.user?.name || "User"}</p>
                          {/* <p className='font-light text-sm'>ทำอะไรได้มากกว่า</p> */}
                        </div>
                        <img src={session?.user?.image || ""} alt={`${session?.user?.name || "User"}'s ${session?.user?.name || "Profile"}`} width={50} height={50} className='rounded-full aspect-square object-cover border-2 border-white/30'></img>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute overflow-hidden right-8 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href='/account'
                              className={
                                "profile-badge-li block cursor-pointer text-sm py-2 pt-3 w-full font-medium text-center text-pr-text-menu hover:bg-pr-msu-1"
                              }
                            >
                              {session?.user?.name || "User"}
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href='/plan'
                              className={
                                "profile-badge-li block cursor-pointer text-sm py-2 pl-3 w-full text-pr-text-menu hover:bg-pr-msu-1 hover:pl-4"
                              }
                            >
                              แผนการเรียนของคุณ
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href='/account/setting'
                              className={
                                "profile-badge-li block cursor-pointer text-sm py-2 pl-3 w-full text-pr-text-menu hover:bg-pr-msu-1 hover:pl-4"
                              }
                            >
                              จัดการบัญชี
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => {
                                signOut()
                              }}
                              className={
                                "profile-badge-li block cursor-pointer text-sm py-2 pb-3 pl-3 w-full text-pr-text-menu hover:bg-pr-msu-1 hover:pl-4"
                              }
                            >
                              ออกจากระบบ
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
              :
                <Link href={{
                  pathname:"/login", query:{fallbackUrl:rollback_url}
                }} className="pr-account hidden sm:flex group gap-3 items-center text-pr-gray-1 text-md font-normal leading-4 hover:underline">
                  <div className="text-right hidden md:block mt-2">
                    <p className=''>เป็นครอบครัวแพลนเรียน</p>
                    <p className='font-light text-sm'>ทำอะไรได้มากกว่า</p>
                  </div>
                  <Image src="/assets/images/prof.jpg" alt="Planriean Logo" width={50} height={50} className='rounded-full aspect-square object-cover border-2 border-white/30'></Image>
                </Link>
            }
          </section>

          <div className={
            `pr-main select-none grid ${toggleSidebar ? "md:grid-cols-[auto_1fr]" : ""} relative overflow-hidden`
          }>
            {/* sidebar */}
            <PRSidebar hidden={!toggleSidebar}/>
            {children}
            {/* subject selector */}
              <PRSubjectSelector isShowDialog={!calsel_data.isLoading && !calsel_data.isError}>
                {
                  calsel_data.isLoading ?
                    <DialogLoading/>
                  :
                  calsel_data.isFirstLoading
                  ?
                    <DialogFirstSearch/>
                  :
                  calsel_data.isError
                  ?
                    <DialogError/>
                  :
                  calsel_data.result.data.length != 0
                  ?
                    // <>TODO: show subject list here...</>
                    <SubjectList/>
                  :
                    <DialogSearchNotFound/>
                }
              </PRSubjectSelector>
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </SubjectSelectorFilterModel>
      </CalendarContext.Provider>
    </>
  )
}
