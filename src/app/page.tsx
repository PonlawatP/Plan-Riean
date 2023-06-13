'use client'
import Image from 'next/image'
import Calendar from '../../components/calendar'
import { useEffect, useReducer, useRef, useState } from 'react';
import { CardReducer, WebMainReducer } from '../../reducers/webmainred';
import { useSwipeable } from 'react-swipeable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClose, faFilter } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

async function getData() {
  const res = await fetch('api/datamajor')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default function Home({props} :any) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const days_scrolled = ["M", "T", "W", "Th", "F"];

  const times_m = [8,9,10,11,12,13,14,15,16,17,18,19];

  const [scrolled, setScrolled] = useState(0);

  const [my_plan_index, setPlanIndex] = useState(0); //TODO: use useReducer
  const [my_plan, setPlan] = useState<any>({0: {data: []}}); //TODO: use useReducer
  const [subjectData, setSubjectData] = useState([]);

  function fnHandleScrollCalendar(e:any){
    const scr = e.target.scrollLeft;
    if(scr < 40){
      setScrolled(0)
    } else {
      setScrolled(38)
    }
    // console.log(e.target.scrollLeft/(e.target.scrollWidth-e.target.offsetWidth))
  }

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
    return timeRange ? timeRange[0].replace("-", " - ") : "00:00 - 00:00";
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

  const getSplitedData = (str:string) => {
    const room = str.substring(14);
    let res = [
        {
          day: "",
          dayName: "",
          dayColor: "",
          from: "",
          to: "",
          room
        }
      ]

    const res_data = res[0];

    switch (str.slice(0,2)) {
      case 'Mo':
        res_data.dayName = "จันทร์";
        res_data.dayColor = "bg-[#ffd56b]";
        break;
      case 'Tu':
        res_data.dayName = "อังคาร";
        res_data.dayColor = "bg-[#ffa1a1]";
        break;
      case 'We':
        res_data.dayName = "พุธ";
        res_data.dayColor = "bg-[#c2f784]";
        break;
      case 'Th':
        res_data.dayName = "พฤหัสฯ";
        res_data.dayColor = "bg-[#f8a978]";
        break;
      default:
        res_data.dayName = "ศุกร์";
        res_data.dayColor = "bg-[#afc5ff]";
        break;
    }

    res_data.day = str.slice(0,2);
    res_data.from = getTimeRange(str).split(" - ")[0];
    res_data.to = getTimeRange(str).split(" - ")[1];

    return res;
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
    let test = true;
    getData().then(res=>{
      if(test){
        setSubjectData(res);
      }
    })

    setWebReady(true);

    return (()=>{test = false})
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

// Plan self schedule
  const getCurrentPlan = () => {
    return my_plan[my_plan_index] ? my_plan[my_plan_index] : {data: []};
  }
  const checkSubjectSchedule = (subject: any) => {
    const plan = getCurrentPlan();
    return plan.data.filter((data:any) => data.code.trim() === subject.code.trim() && data.sec === subject.sec).length > 0
  }
  const removeSubjectFromPlan = (subject: any) => {
    const plan = getCurrentPlan();
    plan.data = plan.data.filter((data:any) => data.code.trim() !== subject.code.trim() || data.sec !== subject.sec)
    return plan
  }
  // getDayIndex getHourIndex calculateScale
  const checkSubjectCollapsed = (subject: any) => {
    const plan = getCurrentPlan();
    return plan.data.filter((data:any) =>
      (getDayIndex(data.time) == getDayIndex(subject.time))
      &&
      (getHourIndex(data.time) == getHourIndex(subject.time))
    ).length > 0
  }


// Component subject card
  function SubjectCard(props: any){
    const {data} = props;
    const cardInitialState = {
      index: 0,
      smooth: false,
      status: "not-select"
    };

    const [cardState, cardDispatch] = useReducer(CardReducer, cardInitialState);

    // TODO: Next-Phase - swipe to options
    // const setSlide = (index:number) => {
    //   cardDispatch({
    //     type: 'SET_SLIDE_INDEX',
    //     payload: index,
    //   });
    // };
    // const toggleSmooth = (status:boolean) => {
    //   cardDispatch({
    //     type: 'SET_SLIDE_SMOOTH',
    //     payload: status,
    //   });
    // };

    // const handlerSubject = useSwipeable({
    //   onSwiping: (event) => {
    //     setSlide(event.deltaX*.15);
    //   },
    //   onTouchEndOrOnMouseUp: (event) => {
    //     setSlide(0)
    //     toggleSmooth(true)
    //   },
    //   onTouchStartOrOnMouseDown: (event) => {
    //     toggleSmooth(false)
    //   },
    // });

    // return <div className={`${cardState.smooth && "smooth-out"} mt-3 h-20 rounded-xl overflow-hidden bg-slate-100 relative border-[2px] border-black/10`} style={{transform: 'translateX('+cardState.index+'px)'}}>

    const setStatus = (status:string) => {
      cardDispatch({
        type: 'SET_SLIDE_FOCUS',
        payload: status,
      });
    };

    const fnHandleClickedCard = () => {
      // if already had subject in schedule
      if(checkSubjectSchedule(data)){
        const new_plan = removeSubjectFromPlan(data);
        const updated = {[my_plan_index]: new_plan}
        setPlan((prev:any) => ({...prev, ...updated}))
        return
      }

      if(checkSubjectCollapsed(data)){
        return
      }

      // add new subject
      const old_plan = getCurrentPlan();
      old_plan.data.push(data);
      const updated = {[my_plan_index]: old_plan}
      setPlan((prev:any) => ({...prev, ...updated}))
    }

    const dateData = getSplitedData(data.time);

    return <div className={`mt-3 min-h-[5rem] rounded-xl overflow-hidden bg-slate-100 relative border-[2px] cursor-pointer ${checkSubjectSchedule(data) ? "border-green-400/90 shadow-green-400/40 shadow-md" : "border-black/10"} ${checkSubjectCollapsed(data) && !checkSubjectSchedule(data) ? "opacity-40 brightness-75" : "opacity-100 brightness-100"}`} onClick={fnHandleClickedCard}>
      <span className="flex absolute left-0 top-0">
        <span className='w-16 border-b-2 border-r-2 border-black/20 rounded-br-xl bg-slate-500 text-white/90'>
          <h3 className='text-center opacity-80'>sec {data.sec}</h3>
        </span>
        <p className='text-black/40 text-[12px] pt-1 pl-2'>{data.code}</p>
      </span>
      <span className='absolute top-1 right-2 text-sm text-black/40'>
        รับ {data.receive.trim()} ที่นั่ง
      </span>
      <div className='absolute bottom-1 left-0 px-2 w-full text-sm '>
        <p className='text-black/40'>{data.lecturer}</p>
        <div className="">
          {dateData.map((date,dateindex)=>
            <span key={dateindex} className='flex gap-4 items-center pt-1 relative'>
              <span className={date.dayColor+' px-2 rounded-lg text-center w-16'}>{date.dayName}</span>
              <span className='bg-slate-400/30 px-2 rounded-lg'>{date.from} - {date.to}</span>
              <div className="absolute right-0">
                <span className='bg-slate-400/30 px-2 rounded-lg'>{date.room}</span>
              </div>
            </span>
          )}
        </div>
      </div>
    </div>
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
                    {getCurrentPlan().data.map((data:any,dataindex:any)=>{
                      return dindex == getDayIndex(data.time) && tindex == getHourIndex(data.time) ?
                        <div key={"d-"+dataindex} className="absolute w-full h-full">

                          <div className={`relative h-full z-40 p-2 group`} style={{width: (calculateScale(data.time)*100)+"%"}}>
                            <div className={`cursor-pointer rounded-lg border-2 border-white/25 h-full w-full p-1 text-center shadow-md hover:text-white/95 ${getColorCode(data.code)} transition-all duration-200`}>
                              <p className='text-sm'>({data.credit.split(" ")[0].trim()}) {data.code} sec {data.sec}</p>
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
        <div className="px-5 h-full grid grid-rows-[auto_1fr] relative">
          <section id="header" className="w-full pt-6 pb-2 px-1 flex justify-between border-b-2 border-slate-300/50" {...handlersHeader}>
            <div className="relative">
              <h1 className='font-bold'>เลือกวิชาเรียน</h1>
              <h1 className='text-sm text-black/50'>จันทร์ ตั้งแต่ 08:00 ไม่เกิน 10:00</h1>
            </div>
            <span className='p-2 rounded-lg aspect-square bg-slate-200/70 w-8 h-8 overflow-hidden flex justify-center items-center border-b-2 border-slate-300 hover:bg-slate-300 hover:border-0' onClick={()=>toggleScheduleSpectate(false)}><FontAwesomeIcon icon={faClose} style={{color: "#73787e"}}/></span>
          </section>
          <section id="subjects" className='w-full h-full overflow-y-auto'>
            {subjectData.map((data, index)=>{
              return <div key={index} className={`${index == subjectData.length-1 ? "mb-3" : ""}`}>
                <SubjectCard data={data}/>
              </div>
            })}
          </section>
        </div>
      </div>

    </div>
  )
}