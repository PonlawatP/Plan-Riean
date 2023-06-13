'use client'
import Image from 'next/image'
import Calendar from '../../components/calendar'
import { useEffect, useReducer, useRef, useState } from 'react';
import { WebMainReducer } from '../../reducers/webmainred';
import { useSwipeable } from 'react-swipeable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClose, faFilter } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const days_scrolled = ["M", "T", "W", "Th", "F"];

  const times_m = [8,9,10,11,12,13,14,15,16,17,18,19];

  const [scrolled, setScrolled] = useState(0);

  function fnHandleScrollCalendar(e:any){
    const scr = e.target.scrollLeft;
    if(scr < 40){
      setScrolled(0)
    } else {
      setScrolled(38)
    }
    // console.log(e.target.scrollLeft/(e.target.scrollWidth-e.target.offsetWidth))
  }

  const test_data = [
    {
      "code":"0041001",
      "name":"Preparatory English",
      "type":"GE-1",
      "credit":2,
      "time":"Mo10:00-12:00 RN1-501",
      "mid":" 2/9/2566 เวลา 8:00:00 ถึง 10:00:00",
      "Final":"4/11/2566 เวลา 8:00:00 ถึง 10:00:00",
      "sec":1,
      "lecturer":"อ.ดร.เรณุมาศ จันทรศิริรัตน์",
      "receive":160
    },
    {
      "code":"0042001",
      "name":"Preparatory English",
      "type":"GE-1",
      "credit":2,
      "time":"Tu10:00-12:00 RN1-501",
      "mid":" 2/9/2566 เวลา 8:00:00 ถึง 10:00:00",
      "Final":"4/11/2566 เวลา 8:00:00 ถึง 10:00:00",
      "sec":1,
      "lecturer":"อ.ดร.เรณุมาศ จันทรศิริรัตน์",
      "receive":160
    },
    {
      "code":"0043001",
      "name":"Preparatory English",
      "type":"GE-1",
      "credit":2,
      "time":"We10:00-12:00 RN1-501",
      "mid":" 2/9/2566 เวลา 8:00:00 ถึง 10:00:00",
      "Final":"4/11/2566 เวลา 8:00:00 ถึง 10:00:00",
      "sec":1,
      "lecturer":"อ.ดร.เรณุมาศ จันทรศิริรัตน์",
      "receive":160
    },
    {
      "code":"0044001",
      "name":"Preparatory English",
      "type":"GE-1",
      "credit":2,
      "time":"Th10:00-12:00 RN1-501",
      "mid":" 2/9/2566 เวลา 8:00:00 ถึง 10:00:00",
      "Final":"4/11/2566 เวลา 8:00:00 ถึง 10:00:00",
      "sec":1,
      "lecturer":"อ.ดร.เรณุมาศ จันทรศิริรัตน์",
      "receive":160
    },
    {
      "code":"0045001",
      "name":"Preparatory English",
      "type":"GE-1",
      "credit":2,
      "time":"Fr10:00-12:00 RN1-501",
      "mid":" 2/9/2566 เวลา 8:00:00 ถึง 10:00:00",
      "Final":"4/11/2566 เวลา 8:00:00 ถึง 10:00:00",
      "sec":1,
      "lecturer":"อ.ดร.เรณุมาศ จันทรศิริรัตน์",
      "receive":160
    },
    {
      "code":"0045001",
      "name":"Preparatory English",
      "type":"GE-1",
      "credit":2,
      "time":"Fr10:00-12:00 RN1-501",
      "mid":" 2/9/2566 เวลา 8:00:00 ถึง 10:00:00",
      "Final":"4/11/2566 เวลา 8:00:00 ถึง 10:00:00",
      "sec":1,
      "lecturer":"อ.ดร.เรณุมาศ จันทรศิริรัตน์",
      "receive":160
    },
    {
      "code":"0045001",
      "name":"Preparatory English",
      "type":"GE-1",
      "credit":2,
      "time":"Fr10:00-12:00 RN1-501",
      "mid":" 2/9/2566 เวลา 8:00:00 ถึง 10:00:00",
      "Final":"4/11/2566 เวลา 8:00:00 ถึง 10:00:00",
      "sec":1,
      "lecturer":"อ.ดร.เรณุมาศ จันทรศิริรัตน์",
      "receive":160
    },
    {
      "code":"0045001",
      "name":"Preparatory English",
      "type":"GE-1",
      "credit":2,
      "time":"Fr10:00-12:00 RN1-501",
      "mid":" 2/9/2566 เวลา 8:00:00 ถึง 10:00:00",
      "Final":"4/11/2566 เวลา 8:00:00 ถึง 10:00:00",
      "sec":1,
      "lecturer":"อ.ดร.เรณุมาศ จันทรศิริรัตน์",
      "receive":160
    },
    {
      "code":"0045001",
      "name":"Preparatory English",
      "type":"GE-1",
      "credit":2,
      "time":"Fr10:00-12:00 RN1-501",
      "mid":" 2/9/2566 เวลา 8:00:00 ถึง 10:00:00",
      "Final":"4/11/2566 เวลา 8:00:00 ถึง 10:00:00",
      "sec":1,
      "lecturer":"อ.ดร.เรณุมาศ จันทรศิริรัตน์",
      "receive":160
    },
  ]

  const calculateScale = (str:string) => {
    const timeRange = str.match(/\d{2}:\d{2}-\d{2}:\d{2}/);
    if (timeRange) {
      const [startTime, endTime] = timeRange[0].split('-');
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);
      const duration = (endHour - startHour) + (endMinute - startMinute) / 60;
      return duration;
    }
    return 0;
  };

  const getHourIndex = (str:string) => {
    const hour = str.slice(2, 4);
    return hour ? parseInt(hour) - 8 : 0;
  };

  const getDayIndex = (str:string) => {
    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr'];
    const dayName = str.slice(0, 2);
    const index = daysOfWeek.indexOf(dayName);
    return index >= 0 ? index : 0;
  };

  const getTimeRange = (str:string) => {
    const timeRange = str.match(/\d{2}:\d{2}-\d{2}:\d{2}/);
    return timeRange ? timeRange[0].replace("-", " - ") : null;
  };

  const getColorCode = (str:string) => {
    switch (str.slice(0,4)) {
      case "0041":
        return "bg-pink-400 hover:bg-pink-700"
      case "0042":
        return "bg-orange-400 hover:bg-orange-700"
      case "0043":
        return "bg-green-400 hover:bg-green-700"
      case "0044":
        return "bg-blue-400 hover:bg-blue-700"
      case "0045":
        return "bg-purple-400 hover:bg-purple-700"
      default:
        return "bg-red-400 hover:bg-red-700"
    }
  };

  // use useReducer to reduce components reload
  const initialState = {
    webReady: false,
    viewSchedule: false,
    swipedLocated: 0,
    scrollableIndex: 0,
    filter: {
      popupToggle: false,
      days: ["M"],
      times: [8,10]
    }
  };

  const [state, dispatch] = useReducer(WebMainReducer, initialState);

  const setWebReady = (status:boolean) => {
    dispatch({
      type: 'SET_WEB_READY',
      payload: status,
    });
  };

  const toggleScheduleSpectate = (status:boolean) => {
    dispatch({
      type: 'SET_SCHEDULE_TOGGLE',
      payload: status,
    });
  };

  const setSwipeLocation = (locate:number) => {
    dispatch({
      type: 'SET_SWIPED_LOCATE',
      payload: locate*.08,
    });
  };

// set status if web is ready
  useEffect(()=>{
    setWebReady(true);
  },[])

  const fnHandleClickedOnCalendar = (x:number, y:number) => {
    if(state.viewSchedule){
      toggleScheduleSpectate(false);
      return
    }
    
    toggleScheduleSpectate(true);
  }

// handlering for swipable
  const handlers = useSwipeable({
    onSwiping: (event) => {
      setSwipeLocation(event.deltaY);
    },
    onTouchEndOrOnMouseUp: (event) => {
      setSwipeLocation(0);
    },
    onSwiped: (eventData) => {
      if(eventData.dir === 'Down' && eventData.deltaY > 100){
        toggleScheduleSpectate(false)
      }

      if(eventData.dir === 'Up' && eventData.deltaY < -80){
        toggleScheduleSpectate(true)
      }
    },
  });

  const handlersHeader = useSwipeable({
    onSwiping: (event) => {
      setSwipeLocation(event.deltaY);
    },
    onTouchEndOrOnMouseUp: (event) => {
      setSwipeLocation(0);
    },
    onSwiped: (eventData) => {
      if(eventData.dir === 'Down' && eventData.deltaY > 100){
        toggleScheduleSpectate(false)
      }
    },
  });

// Component subject card
  function SubjectCard(props: any){
    let slide = 0;
    const handlerSubject = useSwipeable({
      onSwiping: (event) => {
        slide = event.deltaX;
      },
      onTouchEndOrOnMouseUp: (event) => {
        slide = 0;
      },
    });

    return <div className={`mt-3 h-20 rounded-xl bg-red-300`} style={{transform: 'translateX('+slide+'px)'}} {...handlerSubject}></div>
  }

  return (
    <div className={`transition-all duration-1000 w-full h-full relative ${state.viewSchedule ? "bg-black/70" : "bg-slate-300"}`}>
      <div className={`absolute bottom-5 right-6 aspect-square w-12 flex justify-center items-center rounded-full bg-slate-200 shadow-lg z-50 hover:bg-slate-300 ${state.viewSchedule && "hidden"}`} onClick={()=>toggleScheduleSpectate(true)}>
        <FontAwesomeIcon icon={faCalendar} style={{color: "#73787e"}}/>
      </div>

      <div className={`smooth-out ${state.viewSchedule ? "h-[35dvh] overflow-hidden" : "w-full h-[100dvh]"} flex justify-center items-center relative`} onClick={()=>{if(state.viewSchedule) toggleScheduleSpectate(false);}} {...handlers}>
      {/* <div className={`absolute w-full bottom-4 animate-bounce flex justify-center items-center text-slate-500`}> {!state.viewSchedule && "เลื่อนขึ้น"} </div> */}

      {/* Summary Calendar section */}
        <div className={`calendar-container smooth-out overflow-hidden rounded-2xl ${state.viewSchedule ? "absolute w-min scale-[.24] sm:scale-[.5]" : "relative w-11/12"} xl:w-min border-2 bg-white/80 border-slate-200 shadow-2xl`}>
            <div className="days absolute h-full w-16 z-50 transition-all duration-300" style={{transform: 'translateX(-'+scrolled+'px)'}}>
              <div className="border-b-2 border-black/5 "><p className='opacity-0 py-2'>a</p></div>
                {days.map((d,dindex)=><div key={dindex} className={`bg-slate-700 h-20 flex items-center shadow-lg ${dindex+1 < days.length && "border-b-2"} border-white/10`}>
                  <p className='transition-all duration-300 pl-4 text-white' style={{opacity: 1-(scrolled/38)}}>{d}</p>
                  <p className='transition-all duration-300 pl-[2.55rem] text-white absolute' style={{opacity: scrolled/38}}>{days_scrolled[dindex]}</p>
                </div>)}
            </div>
            <div className="header-day relative overflow-x-auto w-auto" onScroll={fnHandleScrollCalendar} onScrollCapture={fnHandleScrollCalendar}>

              <div className="days absolute h-full w-16 ">
              <div className="border-b-2 border-black/5 bg-yellow-400"><p className='opacity-0 py-2'>a</p></div>
              </div>

              <div className="pl-16 inline-flex ">
                  {times_m.map((time,tindex)=><span key={tindex} className='h-full flex items-center w-24 py-2 pl-3 border-l-2 border-b-2 border-black/5 bg-yellow-400 text-orange-950/40'>{time.toString().padStart(2, '0')}:00</span>)}
                  {/* {times_m.map((time,tindex)=><span key={tindex} className='h-full flex items-center w-32 py-2 justify-center border-l-2 border-b-2 border-black/5 bg-yellow-400 text-orange-950'>{time.toString().padStart(2, '0')} - {(times_m[tindex+1] || 20).toString().padStart(2, '0')}</span>)} */}
              </div>

              {days.map((d,dindex)=><div key={dindex} className="pl-16 inline-flex">
                  {times_m.map((time,tindex)=><span key={dindex+"-"+tindex} className={`relative flex flex-col items-center w-24 h-20 py-2 justify-center border-l-2 ${dindex+1 < days.length && "border-b-2"} border-black/5`}>
                    <p className='opacity-10'>dev-{dindex}:{tindex}</p>
                    {/* temp schedule - show when hover - event: click to filter subject & sect that on time user clicked & not collapse on other subject */}
                    {state.webReady &&
                      <div key={"dt-"+dindex+":"+tindex} className="absolute w-full h-full">

                            <div className={`relative h-full p-1 group`} style={{width: "100%"}}>
                              <div onClick={()=>fnHandleClickedOnCalendar(dindex,tindex)} className={`cursor-pointer rounded-lg border-2 border-white/25 h-full w-full p-1 text-center shadow-md text-white/95 bg-black/40 opacity-0 transition-all duration-500 flex items-center justify-center ${!state.viewSchedule && "hover:opacity-100"} hover:duration-100`}>
                                <p className='text-sm'>กดเพื่อดูรายวิชา</p>
                              </div>
                            </div>

                      </div>
                    }

                    {/* schedule data to show */}
                    {test_data.map((data,dataindex)=>{
                      return dindex == getDayIndex(data.time) && tindex == getHourIndex(data.time) ?
                        <div key={"d-"+dataindex} className="absolute w-full h-full">

                          <div className={`relative h-full z-40 p-2 group`} style={{width: (calculateScale(data.time)*100)+"%"}}>
                            <div className={`cursor-pointer rounded-lg border-2 border-white/25 h-full w-full p-1 text-center shadow-md hover:text-white/95 ${getColorCode(data.code)} transition-all duration-200`}>
                              <p className='text-sm'>({data.credit}) {data.code} sec {data.sec}</p>
                              <p className='pt-3 text-sm'>{getTimeRange(data.time)}</p>
                            </div>
                          </div>

                        </div> : null
                    })}
                  </span>)}
              </div>)}
            </div>
        </div>

      </div>

    {/* Subject selected Section */}
      <div className={`fixed smooth-out overflow-hidden w-full h-[65dvh] ${state.viewSchedule ? "bottom-0" : "-bottom-full"} bg-white rounded-t-3xl z-50`} style={{bottom: (!state.viewSchedule ? (-65)-state.swipedLocated : 0-state.swipedLocated < 0 ? 0-state.swipedLocated : 0) + "%"}}>
        <div className="px-5 h-full relative">
          <section id="header" className="w-full pt-6 pb-2 px-1 flex justify-between border-b-2 border-slate-300/50" {...handlersHeader}>
            <div className="relative">
              <h1 className='font-bold'>เลือกวิชาเรียน</h1>
              <h1 className='text-sm text-black/50'>จันทร์ ตั้งแต่ 08:00 ไม่เกิน 10:00</h1>
            </div>
            <span className='p-2 rounded-lg aspect-square bg-slate-200/70 w-8 h-8 overflow-hidden flex justify-center items-center border-b-2 border-slate-300 hover:bg-slate-300 hover:border-0' onClick={()=>toggleScheduleSpectate(false)}><FontAwesomeIcon icon={faClose} style={{color: "#73787e"}}/></span>
          </section>
          <section id="subjects" className='w-full h-full overflow-y-auto'>
            {test_data.map((data, index)=>{

              return <SubjectCard key={index} />
            })}
          </section>
        </div>
      </div>

    </div>
  )
}