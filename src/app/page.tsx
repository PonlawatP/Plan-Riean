'use client'
import Image from 'next/image'
import Calendar from '../../components/calendar'
import { useEffect, useReducer, useRef, useState } from 'react';
import { CardReducer, WebMainReducer } from '../../reducers/webmainred';
import { useSwipeable } from 'react-swipeable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCirclePlus, faClose, faExclamationCircle, faFilter, faLayerGroup, faPaperPlane, faPaperclip, faPencil, faSpinner, faWind } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ge_subject_group_name, name_days } from '../../components/shared/variables';
import SubjectView from '../../components/subjectView';

interface Ifilter {
  firstFilter:boolean,
  type:string,
  code:Array<string>,
  date:Array<string>,
  time:string
}
interface IsubjectSectDate 
{
  day: string
  dayName: string
  dayColor: string
  from: string
  to: string
  room: string
  fullDate:string
}

async function getData(filter:Ifilter, signal:any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...filter
    }),
    signal
  };

  const res = await fetch('api/Filter', requestOptions)
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


  const [my_plan_index, setPlanIndex] = useState(0); //TODO: use useReducer
  const [my_plan, setPlan] = useState<any>({0: {data: []}}); //TODO: use useReducer
  const [subjectData, setSubjectData] = useState([]);
  const [subjectShowData, setSubjectShowData] = useState([]);

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

  const getSplitedData = (str_raw:string) => {
    let res:Array<IsubjectSectDate> = []
    
    str_raw.split(" & ").map((str:string)=>{
      let data_result:IsubjectSectDate = {
        dayName: "",
        dayColor: "",
        day: "",
        from: "",
        to: "",
        room: "",
        fullDate: ""
      }

      const room = str.split(" ")[1];

      switch (str.slice(0,2)) {
        case 'Mo':
          data_result.dayName = name_days[0].date_th;
          data_result.dayColor = "bg-[#ffd56b]";
          break;
        case 'Tu':
          data_result.dayName = name_days[1].date_th;
          data_result.dayColor = "bg-[#ffa1a1]";
          break;
        case 'We':
          data_result.dayName = name_days[2].date_th;
          data_result.dayColor = "bg-[#c2f784]";
          break;
        case 'Th':
          data_result.dayName = name_days[3].date_th;
          data_result.dayColor = "bg-[#f8a978]";
          break;
        default:
          data_result.dayName = name_days[4].date_th;
          data_result.dayColor = "bg-[#afc5ff]";
          break;
      }

      data_result.day = str.slice(0,2);
      data_result.from = getTimeRange(str).split(" - ")[0];
      data_result.to = getTimeRange(str).split(" - ")[1];
      data_result.room = room;
      data_result.fullDate = str;

      res.push(data_result)
    })

    return res;
  };

  // use useReducer to reduce components reload
  const initialState = {
    webReady: false,
    viewSchedule: false,
    subjectViewType: "subject",
    swipedLocated: 0,
    scrollableIndex: 0,
    dataLoaded: false,
    filter: {
      popupToggle: false,
      popupDelay: 0
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
    if(!status){
      toggleScheduleFilter(false);
    }
    dispatch({
      type: 'SET_SCHEDULE_TOGGLE',
      payload: status,
    });
  };

  const toggleScheduleFilter = (status:boolean) => {
    dispatch({
      type: 'SET_FILTER_POPUP',
      payload: status,
    });
  };

  const toggleDataLoaded = (status:boolean) => {
    dispatch({
      type: 'SET_DATA_LOADED',
      payload: status
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
    if(localStorage.getItem("plans") != null && localStorage.getItem("plan_index") != null){
      setPlanIndex(Number.parseInt(localStorage.getItem("plan_index") || "0"))
      setPlan(JSON.parse(localStorage.getItem("plans") || "{0:{data:[]}}"))
    }

    setWebReady(true);

    return (()=>{})
  },[])
  const fnHandleClickedOnFilter = () => {
    if(state.filter.popupToggle){
      toggleScheduleFilter(false);
      return
    }
    
    toggleScheduleFilter(true);
  }

// handlering for swipable
  const handlers = useSwipeable({
    onSwiping: (event) => {
      setSwipeLocation(event.deltaY);
    },
    onSwiped: (eventData) => {
      setSwipeLocation(0);
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
    onSwiped: (eventData) => {
      setSwipeLocation(0);
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
  const preRemoveSubjectFromPlan = (subject: any) => {
    const plan = getCurrentPlan();
    plan.data = plan.data.filter((data:any) => data.code.trim() !== subject.code.trim() || data.sec !== subject.sec)
    return plan
  }
  const removeSubjectFromPlan = (data: any) => {
    const new_plan = preRemoveSubjectFromPlan(data);
    const updated = {[my_plan_index]: new_plan}
    setPlan((prev:any) => ({...prev, ...updated}))
    updateUserStorage();
  }
  // getDayIndex getHourIndex calculateScale
  const checkSubjectCollapsed = (subject: any) => {
    const plan = getCurrentPlan();
    const res = plan.data.filter((data:any) =>
      getSplitedData(data.time).filter((df:IsubjectSectDate)=>
        getSplitedData(subject.time).filter((sf:IsubjectSectDate)=>
          getDayIndex(df.fullDate) == getDayIndex(sf.fullDate)
          &&
          (
            getHourIndex(df.fullDate) == getHourIndex(sf.fullDate)
            ||
            (
              getHourIndex(sf.fullDate)+(calculateScale(sf.fullDate)-1) > getHourIndex(df.fullDate)
              &&
              getHourIndex(df.fullDate)+(calculateScale(df.fullDate)-1) > getHourIndex(sf.fullDate)
            )
          )
        ).length > 0
      ).length > 0
    )

    return res.length > 0
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

    const fnHandleClickedCard = () => {
      // // if already had subject in schedule
      // if(checkSubjectSchedule(data)){
      //   const new_plan = preRemoveSubjectFromPlan(data);
      //   const updated = {[my_plan_index]: new_plan}
      //   setPlan((prev:any) => ({...prev, ...updated}))
      //   return
      // }

      // if(checkSubjectCollapsed(data)){
      //   return
      // }

      // // add new subject
      // const old_plan = getCurrentPlan();
      // old_plan.data.push(data);
      // const updated = {[my_plan_index]: old_plan}
      // setPlan((prev:any) => ({...prev, ...updated}))
    }


    return <div className={`mt-3 min-h-[5rem] rounded-xl overflow-hidden bg-slate-100 relative border-[2px] cursor-pointer border-black/10`} onClick={fnHandleClickedCard}>
      <span className="flex absolute left-0 top-0">
        <span className={`px-3 py-[2px] border-b-2 border-r-2 border-black/20 rounded-br-xl text-black/90 ${getColorCode(data.code)}`}>
          <h3 className='text-center opacity-80 text-[13px]'>หมวดหมู่ที่ {data.type.split("-")[1]}</h3>
        </span>
        {/* <p className='text-black/40 text-[12px] pt-1 pl-2'>หมวดหมู่ที่ {data.type.split("-")[1]}</p> */}
      </span>
      <span className='absolute top-1 right-2 text-sm text-black/40'>
        24 วิชา
      </span>
      <div className='absolute bottom-1 left-0 px-2 w-full text-sm '>
        <p className='text-black/60'>{data.name}</p>
        <div className="">
          <span className='flex gap-4 items-center pt-1 relative'>
            <span className='bg-slate-400/30 px-2 rounded-lg'>ทั้งหมด {data.detail.opened}</span>
            <span className='bg-slate-400/30 px-2 rounded-lg'>หมวดย่อย {data.detail.sub}</span>
            <span className='bg-slate-400/30 px-2 rounded-lg'>บังคับ {data.detail.forced}</span>
            {/* <div className="absolute right-0">
              <span className='bg-slate-400/30 px-2 rounded-lg'>{date.room}</span>
            </div> */}
          </span>
        </div>
      </div>
    </div>
  }

// filter
  const [filter, setFilter] = useState<Ifilter>({
      firstFilter: false,
      type: "",
      code: [],
      date: [],
      time: "total"
    });

  const fnHandleChangeFilterType = (type: string) => {
    if(filter.type === type) return;
    
    const temp = {
      ...filter,
      type,
      firstFilter: true
    }
    setFilter(temp);
    
    updateSubjectList(temp);
  }

  const fnHandleChangeFilterDate = (date: string, active = false) => {
    let temp_date:Array<string> = filter.date;

    if(active){
      temp_date = temp_date.filter(idate => idate !== date)
    } else {
      temp_date.push(date)
    }

    const temp = {
      ...filter,
      date: temp_date,
      firstFilter: true
    }
    setFilter(temp);

    updateSubjectList(temp);
  }

  const checkFilterDateSelected = (date:string) => {
    return filter.date.includes(date)
  }
  let abortController:any;
  async function updateSubjectList(check_filt: Ifilter) {
    if (abortController) {
      // If there is an ongoing request, cancel it
      abortController.abort();
    }
  
    toggleDataLoaded(false);
    abortController = new AbortController(); // Create a new AbortController instance
  
    try {
      const res = await getData(check_filt, abortController.signal); // Pass the signal to the getData function
  
      setSubjectShowData(res);
    } catch (error:any) {
      if (error.name === 'AbortError') {
        // Request was aborted, handle cancellation as needed
        console.log('Request was cancelled.');
        return;
      }
  
      // Handle other errors
      console.error('An error occurred:', error);
    } finally {
      toggleDataLoaded(true);
      abortController = null; // Reset the abortController variable
    }
  }

// user storage
  const updateUserStorage = () => {
    localStorage.setItem("plan_index", JSON.stringify(my_plan_index));
    localStorage.setItem("plans", JSON.stringify(my_plan));
  }



  return (
    <div className={`transition-all duration-1000 w-full h-full relative ${state.viewSchedule ? "bg-black/70" : "bg-slate-300"}`}>
      <div className={`absolute bottom-5 right-6 aspect-square w-12 flex justify-center items-center rounded-full bg-slate-200 shadow-lg z-50 hover:bg-slate-300 ${state.viewSchedule && "hidden"}`} onClick={()=>toggleScheduleSpectate(true)}>
        <FontAwesomeIcon icon={faCalendar} style={{color: "#73787e"}}/>
      </div>

      <div className={`smooth-out ${state.viewSchedule ? "h-[35dvh] overflow-hidden" : "w-full h-[100dvh]"} flex justify-center items-center relative`} onClick={()=>{if(state.viewSchedule) toggleScheduleSpectate(false);}} {...handlers}>
      {/* <div className={`absolute w-full bottom-4 animate-bounce flex justify-center items-center text-slate-500`}> {!state.viewSchedule && "เลื่อนขึ้น"} </div> */}

      {/* Summary Calendar section */}
        
        <Calendar 
          state={state} 
          toggleScheduleSpectate={toggleScheduleSpectate} 
          getCurrentPlan={getCurrentPlan} 
          getSplitedData={getSplitedData} 
          removeSubjectFromPlan={removeSubjectFromPlan} 
          calculateScale={calculateScale} 
          getTimeRange={getTimeRange} 
          getColorCode={getColorCode} 
          getDayIndex={getDayIndex} 
          getHourIndex={getHourIndex}
        ></Calendar>

      </div>

    {/* Subject selected Section */}
      <SubjectView 
        state={state} 
        handlersHeader={handlersHeader} 
        fnHandleChangeFilterType={fnHandleChangeFilterType} 
        fnHandleClickedOnFilter={fnHandleClickedOnFilter} 
        toggleScheduleSpectate={toggleScheduleSpectate} 
        fnHandleChangeFilterDate={fnHandleChangeFilterDate} 
        checkFilterDateSelected={checkFilterDateSelected} 
        filter={filter} 
        setFilter={setFilter} 
        subjectShowData={subjectShowData} 
        checkSubjectSchedule={checkSubjectSchedule} 
        removeSubjectFromPlan={removeSubjectFromPlan} 
        checkSubjectCollapsed={checkSubjectCollapsed} 
        getCurrentPlan={getCurrentPlan} 
        my_plan={my_plan} 
        my_plan_index={my_plan_index} 
        setPlan={setPlan} 
        getSplitedData={getSplitedData} 
        updateUserStorage={updateUserStorage}
      ></SubjectView>

    </div>
  )
}