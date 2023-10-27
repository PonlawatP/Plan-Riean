'use client'
import Image from 'next/image'
import Calendar from '../../components/calendar'
import React from 'react';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { CardReducer, WebMainReducer } from '../../reducers/webmainred';
import { useSwipeable } from 'react-swipeable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faCalendar, faCircle, faCircleDot, faCircleExclamation, faCirclePlus, faClose, faExclamationCircle, faFilter, faLayerGroup, faLock, faPaperPlane, faPaperclip, faPencil, faSpinner, faWind } from '@fortawesome/free-solid-svg-icons';
import { TimePicker } from '../../vendor/react-ios-time-picker/src';
import SubjectSelectorFilter from '../../components/modal/subjectSelectorFilter';
import { GoogleAnalytics } from 'nextjs-google-analytics';

interface Ifilter {
  firstFilter:boolean,
  type:Array<string>,
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

async function getGroupOfSubjectData(group:string, signal:any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal
  };

  const res = await fetch('api/seccount/'+group , requestOptions)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

async function getUpdatedData(signal:any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal
  };

  const res = await fetch('api/updated/' , requestOptions)
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
  const app_version = "0.1.3"
  const ge_subject_group_name = [
    {
      type: "GE-1",
      code: "0041",
      name: "ทักษะการเรียนรู้ตลอดชีวิต",
      detail: {
        forced: 3,
        opened: 21,
        sub: 2
      }
    },
    {
      type: "GE-2",
      code: "0042",
      name: "คุณภาพชีวิตและสิ่งแวดล้อม",
      detail: {
        forced: 3,
        opened: 21,
        sub: 2
      }
    },
    {
      type: "GE-3",
      code: "0043",
      name: "นวัตกรรมและการสร้างสรรค์",
      detail: {
        forced: 3,
        opened: 21,
        sub: 2
      }
    },
    {
      type: "GE-4",
      code: "0044",
      name: "พลเมืองเข้มแข็ง",
      detail: {
        forced: 3,
        opened: 21,
        sub: 2
      }
    },
    {
      type: "GE-5",
      code: "0045",
      name: "วิถีสังคม",
      detail: {
        forced: 3,
        opened: 21,
        sub: 2
      }
    }
  ];
  const name_days = [
    {
      date_th: "จันทร์",
      date_3: "Mon",
      date_2: "Mo",
      date_1: "M",
    },
    {
      date_th: "อังคาร",
      date_3: "Tue",
      date_2: "Tu",
      date_1: "t",
    },
    {
      date_th: "พุธ",
      date_3: "Wed",
      date_2: "We",
      date_1: "W",
    },
    {
      date_th: "พฤหัสฯ",
      date_3: "Thu",
      date_2: "Th",
      date_1: "Th",
    },
    {
      date_th: "ศุกร์",
      date_3: "Fri",
      date_2: "Fr",
      date_1: "F",
    }
  ];


  const times_m = [8,9,10,11,12,13,14,15,16,17,18,19];

  const [scrolled, setScrolled] = useState(0);

  const [my_plan_index, setPlanIndex] = useState(0); //TODO: use useReducer
  const [my_plan, setPlan] = useState<any>({0: {data: []}}); //TODO: use useReducer
  const [subjectData, setSubjectData] = useState([]);
  const [subjectUpdatedData, setSubjectUpdatedData] = useState("none");
  const [subjectShowData, setSubjectShowData] = useState([]);
  const [subjectGroupData, setSubjectGroupData] = useState<any>({});

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

  const getTextColorCode = (str:string) => {
    switch (str.slice(0,4)) {
      case "0041":
        return "text-pink-400"
      case "0042":
        return "text-orange-400"
      case "0043":
        return "text-green-400"
      case "0044":
        return "text-blue-400"
      case "0045":
        return "text-purple-400"
      default:
        return "text-red-400"
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
      popupNameToggle: false,
      popupTimeToggle: false,
      popupDelay: 0,
      popupNameHeader: "",
      popupNameDesc: "",
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
      toggleScheduleNameFilter(false)
      toggleScheduleTimeFilter(false)
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

  const toggleScheduleNameFilter = (status:boolean) => {
    dispatch({
      type: 'SET_FILTER_NAME_POPUP',
      payload: status,
    });
  };

  const toggleScheduleTimeFilter = (status:boolean) => {
    dispatch({
      type: 'SET_FILTER_TIME_POPUP',
      payload: status,
    });
  };

  const [delay_id, setDelay_id] = useState<NodeJS.Timer | number>(-1);
  const startFilterDelay = (next: () => void) => {
    dispatch({
      type: 'SET_FILTER_DELAY',
      payload: 0,
    });
    let i = 1;

    if(typeof delay_id === 'number' && delay_id >= 0){
      clearInterval(delay_id)
    }
    
    const x = setInterval(()=>{
      dispatch({
        type: 'ADD_FILTER_DELAY',
        payload: 1,
      });
      i++;
      
      if(i > 4){
        dispatch({
          type: 'SET_FILTER_DELAY',
          payload: -1,
        });
        clearInterval(x);
      } else if(i > 3){
        next();
        setDelay_id(-1);
      }
    },1000)

    setDelay_id(x);
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
  
  const fnHandleClickedOnCalendar = (x:number, y:number) => {
    if(state.viewSchedule){
      toggleScheduleSpectate(false);
      return
    }
    
    toggleScheduleSpectate(true);

    // TODO: filter real time
    fnHandleChangeFilterDate(name_days[y].date_2)
    fnHandleChangeFilterTime((8+x).toString().padStart(2, "0")+":00")
    toggleScheduleFilter(true)
  }
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
  

  const fnHandleClickedSubjectCard = (data:any) => {
    // if already had subject in schedule
    if(checkSubjectSchedule(data)){
      removeSubjectFromPlan(data)
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
    updateUserStorage();
  }
  function SubjectSectCard(props: any){
    const {data} = props;

    const dateData = getSplitedData(data.time);

    return <div className={`mt-3 min-h-[5rem] rounded-xl overflow-hidden flex items-end bg-slate-100 relative border-[2px] cursor-pointer ${checkSubjectSchedule(data) ? "border-green-400/90 shadow-green-400/40 shadow-md" : "border-black/10"} ${checkSubjectCollapsed(data) && !checkSubjectSchedule(data) ? "opacity-40 brightness-75" : "opacity-100 brightness-100"}`} onClick={()=>{fnHandleClickedSubjectCard(data)}}>
      <span className="absolute left-0 top-0 w-full justify-between grid grid-flow-col">
        <div className="relative grid grid-flow-col grid-cols-[auto_1fr]">
          <span className='w-16 border-b-2 border-r-2 border-black/20 rounded-br-xl bg-slate-500 text-white/90'>
            <h3 className='text-center opacity-80'>sec {data.sec}</h3>
          </span>
          {data.note.trim() !== "" && data.note.includes("+") &&
            (
              <FontAwesomeIcon className='pl-2 pt-1' icon={faLock} style={{color: "#73787e"}}/>
            )
          }
          <p className='text-black text-[12px] pt-1 pl-2 overflow-hidden text-ellipsis whitespace-nowrap'>{data.code} {data.name}</p>
        </div>
        <span className={`pt-1 pr-2 text-sm text-right ${data.remain > 10 ? "text-black/40" : data.remain != 0 ? "text-orange-600" : "text-red-700"}`}>
        {data.remain}/{data.receive} ที่นั่ง
        </span>
      </span>
      <div className='pt-[1.8rem] pb-1 px-2 w-full text-sm'>
        {data.note.trim() !== "" && (
          <p className='text-slate-700/40 text-[10px]'>{data.note.trim()}</p>
        )}
        {data.lecturer.split(" / ").map((lect:any,lindex:any)=><p key={lindex} className='text-black/40'>{lect}</p>)}
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
  
  const SubjectSectCardList = subjectShowData.map((data: any, index: any) => (
      <div key={index} className={`${index === subjectShowData.length - 1 ? 'mb-3' : ''}`}>
        <SubjectSectCard data={data} />
      </div>
    ));
// filter
  const [filter, setFilter] = useState<Ifilter>({
      firstFilter: false,
      type: [],
      code: [],
      date: [],
      time: "total"
    });

  const fnHandleChangeFilterType = (type: string) => {
    let temp_type:Array<string> = filter.type;

    if(temp_type.includes(type)){
      temp_type = temp_type.filter(subj => subj !== type)
    } else {
      temp_type.push(type)
    }

    const temp = {
      ...filter,
      type: temp_type
    }
    setFilter(temp);

    // startFilterDelay(()=>{
    //   updateSubjectList(temp);
    //   toggleScheduleFilter(false)
    // });
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
      date: temp_date
    }
    setFilter(temp);

    // startFilterDelay(()=>{
    //   updateSubjectList(temp);
    //   toggleScheduleFilter(false)
    // });
  }
  
  const fnHandleChangeFilterTime = (time: string) => {
    const r_time = time.split(":").length > 1 ? time.split(":")[0] : time
    const temp = {
      ...filter,
      time: r_time,
    }
    setFilter(temp);

    // startFilterDelay(()=>{
    //   updateSubjectList(temp);
    //   toggleScheduleFilter(false)
    // });
  }

  const fnHandleSendFilterUpdate = () => {
      updateSubjectList(filter);
      toggleScheduleFilter(false)
      
      const temp = {
        ...filter,
        firstFilter: true
      }
      setFilter(temp);
  }

  const fnHandleClearFilter = () => {
    const temp = {
      firstFilter: false,
      type: [],
      code: [],
      date: [],
      time: "total"
    }
    setFilter(temp);
  }

  const checkFilterDateSelected = (date:string) => {
    return filter.date.includes(date)
  }
  let abortController:any;
  let abortUpdateController:any;
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

      abortUpdateController = new AbortController(); // Create a new AbortController instance
      await getUpdatedData(abortUpdateController.signal).then(res=> {
        
        if (abortUpdateController) {
          // If there is an ongoing request, cancel it
          abortUpdateController.abort();
        }

        setSubjectUpdatedData(res);
      });
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

  let abortSubjController:any;
  async function updateSubjectGroupList() {
    if (abortSubjController) {
      // If there is an ongoing request, cancel it
      abortSubjController.abort();
    }
  
    abortSubjController = new AbortController(); // Create a new AbortController instance
  
    try {

      await ge_subject_group_name.forEach((ge, index)=>{
        getGroupOfSubjectData(ge.type, abortSubjController.signal).then(res=>{
          setSubjectGroupData(prev=>({...prev, [index]: res}));
          // console.log(subjectGroupData);
        })
      })

    } catch (error:any) {
      if (error.name === 'AbortError') {
        // Request was aborted, handle cancellation as needed
        console.log('Request was cancelled.');
        return;
      }
  
      // Handle other errors
      console.error('An error occurred:', error);
    } finally {
      abortSubjController = null; // Reset the abortController variable
    }
  }

// user storage
  const updateUserStorage = () => {
    localStorage.setItem("plan_index", JSON.stringify(my_plan_index));
    localStorage.setItem("plans", JSON.stringify(my_plan));
  }

  function fnHandleClickedOnScheduleCard(data){
    // setClicked(!clicked)
    if(!state.viewSchedule) removeSubjectFromPlan(data)
  }

  const ScheduleCard = (props:any) => {
    const {data, time, position} = props
    // const [clicked, setClicked] = useState(false);

    return (
      <div className="absolute w-full h-full">

        <div className={`relative h-full z-40 p-2 group`} style={{width: (calculateScale(time)*100)+"%"}}>
          <div onClick={()=>{fnHandleClickedOnScheduleCard(data)}} className={`z-10 relative cursor-pointer rounded-lg border-2 border-white/25 h-full w-full p-1 text-center shadow-md hover:text-white/95 ${getColorCode(data.code)} transition-all duration-200`}>
            <p className='text-sm'>({data.credit.split(" ")[0].trim()}) {data.code} sec {data.sec}</p>
            <p className='pt-3 text-sm'>{getTimeRange(time)}</p>
          </div>
        </div>
      </div>
    )
  }
// Subject Name Filter
  const fnHandleFilterSubjectSelected = (e:any) => {
    const subjectsRect = e.target.getBoundingClientRect();
    const childs = e.target.childNodes;

    // console.log(e);
    childs.forEach((cd)=>{
      const typeRect = cd.getBoundingClientRect();

      // Check if "type-ge-1" element reaches the top of "subjects" element
      if (typeRect.top <= subjectsRect.top) {
        const header = cd.children[0].children[0].textContent
        const desc = cd.children[0].children[1].textContent

        setScheduleNameFilterHeader(header);
        setScheduleNameFilterDescription(desc);
        // console.log('now is group: ' + header + " - " + desc);
      }
    })
  }

  const setScheduleNameFilterHeader = (msg:string) => {
    dispatch({
      type: 'SET_FILTER_NAME_HEADER',
      payload: msg,
    });
  };

  const setScheduleNameFilterDescription = (msg:string) => {
    dispatch({
      type: 'SET_FILTER_NAME_DESC',
      payload: msg,
    });
  };
  

  const checkFilterSubjectCodeContains = (code:string) => {
    return filter.code.includes(code)
  }
  

  const fnHandleToggleFilterSubjectCode = (code:string) => {
    let temp_code:Array<string> = filter.code;

    if(temp_code.includes(code)){
      temp_code = temp_code.filter(data_code => data_code !== code)
    } else {
      temp_code.push(code)
    }

    const temp = {
      ...filter,
      type: temp_code.length == 0 ? [] : filter.type,
      code: temp_code
    }
    setFilter(temp);

    // startFilterDelay(()=>{
    //   updateSubjectList(temp);
    //   toggleScheduleFilter(false)
    // });
  }

  function getMessageOfFilters() {
    return "ไม่ได้คัดกรอง"
  }

  function checkGroupCodes(group:string) {
    const res = filter.code.map(e=>e.substring(0,4)).includes(group);
    return res
  }

  return (
    <>
      <GoogleAnalytics strategy="lazyOnload" trackPageViews={true} />
      <div className={`transition-all duration-1000 w-full h-full relative ${state.viewSchedule ? "bg-black/70" : "bg-slate-300"}`}>
        {/* introduce */}
        <div className={`smooth absolute w-full top-3 left-3 z-50 ${state.viewSchedule ? "opacity-0 pointer-events-none" : ""}`}>
          <p className='text-black/40'>เวอร์ชั่นทดสอบ {app_version}</p>
          <a className='smooth text-black/60 font-bold hover:pl-2 hover:text-black/80' href='https://linktr.ee/plutopon'>แจ้งปัญหา / เสนอไอเดีย</a>
        </div>
        {/* slide up overlay */}
        <div className={`absolute bottom-5 w-full flex flex-col gap-3 justify-center items-center rounded-full z-50 pointer-events-none lg:hidden ${state.viewSchedule && "hidden"}`}>
          <p className={`smooth text-slate-500 ${state.webReady ? "opacity-100" : "opacity-0"} ${filter.firstFilter && "hidden"}`}>เลื่อนขึ้นเพื่อดูรายวิชา</p>
          <FontAwesomeIcon className='animate-bounce' icon={faArrowUp} style={{color: "#73787e"}} size={"xl"}/>
        </div>
        {/* calendar button */}
        <div className={`hidden lg:flex justify-center absolute bottom-5 w-full z-50 ${state.viewSchedule && "hidden"}`} onClick={()=>toggleScheduleSpectate(true)}>
          <div className="h-12 px-4 flex gap-2 justify-center items-center rounded-2xl shadow-lg bg-slate-200 hover:bg-slate-300 cursor-pointer">
            <FontAwesomeIcon icon={faCalendar} style={{color: "#73787e"}}/><span className='text-sm text-black/60'>เลือกวิชาเรียน</span>
          </div>
        </div>

        {/* Summary Calendar section */}
        <div className={`smooth-out ${state.viewSchedule ? "h-[35dvh] overflow-hidden" : "w-full h-[100dvh]"} flex justify-center items-center relative`} onClick={()=>{if(state.viewSchedule) {toggleScheduleSpectate(false); toggleScheduleNameFilter(false); toggleScheduleTimeFilter(false); }}} {...handlers}>

        {/* Summary Calendar Component */}
          <div className={`calendar-container overflow-hidden rounded-2xl ${state.viewSchedule ? "absolute w-min scale-[.24] sm:scale-[.5]" : "relative w-11/12 smooth-out"} xl:w-min border-2 bg-white/80 border-slate-200 shadow-2xl`}>
              <div className="days absolute h-full w-16 z-50 transition-all duration-300" style={{transform: 'translateX(-'+scrolled+'px)'}}>
                <div className="border-b-2 border-black/5 "><p className='opacity-0 py-2'>a</p></div>
                  {name_days.map((d,dindex)=><div key={dindex} className={`bg-slate-700 h-20 flex items-center shadow-lg ${dindex+1 < name_days.length && "border-b-2"} border-white/10`}>
                    <p className='transition-all duration-300 pl-4 text-white' style={{opacity: 1-(scrolled/38)}}>{d.date_3}</p>
                    <p className='transition-all duration-300 pl-[2.55rem] text-white absolute' style={{opacity: scrolled/38}}>{d.date_1}</p>
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

                {name_days.map((d,dindex)=><div key={dindex} className="pl-16 inline-flex">
                    {times_m.map((time,tindex)=><span key={dindex+"-"+tindex} className={`relative flex flex-col items-center w-24 h-20 py-2 justify-center border-l-2 ${dindex+1 < name_days.length && "border-b-2"} border-black/5`}>
                      <p className='opacity-0'>{dindex}:{tindex}</p>
                      {/* temp schedule - show when hover - event: click to filter subject & sect that on time user clicked & not collapse on other subject */}
                      {state.webReady &&
                        <div key={"dt-"+dindex+":"+tindex} className="absolute w-full h-full">

                              <div className={`relative h-full p-1 group`} style={{width: "100%"}}>
                                <div onClick={()=>fnHandleClickedOnCalendar(tindex,dindex)} className={`cursor-pointer rounded-lg border-2 border-white/25 h-full w-full p-1 text-center shadow-md text-white/95 bg-black/40 opacity-0 transition-all duration-500 flex items-center justify-center ${!state.viewSchedule && "hover:opacity-100"} hover:duration-100`}>
                                  <p className='text-sm'>กดเพื่อดูรายวิชา</p>
                                </div>
                              </div>

                        </div>
                      }

                      {/* schedule data to show */}
                      {getCurrentPlan().data.map((data:any,dataindex:any)=>{
                        return getSplitedData(data.time).map((split_date, spindex)=>{
                          return dindex == getDayIndex(split_date.fullDate) && tindex == getHourIndex(split_date.fullDate) ?
                          <ScheduleCard position={{x:tindex, y:dindex}} key={"d-"+dataindex} data={data} time={split_date.fullDate}/>
                          : null
                        })
                      })}
                    </span>)}
                </div>)}
              </div>
          </div>

        </div>

        {/* Filter selection Section */}
        <div className={`fixed smooth-out overflow-hidden w-full h-[65dvh] ${state.viewSchedule ? "bottom-0" : "-bottom-full"} bg-white rounded-t-3xl z-50`} style={{bottom: (!state.viewSchedule ? (-65)-state.swipedLocated : 0-state.swipedLocated < 0 ? 0-state.swipedLocated : 0) + "%"}}>
          <div className="h-full grid grid-rows-[auto_1fr] relative">
            <section id="header" className="relative w-full pt-6 pb-2 px-6 flex justify-between border-b-2 border-slate-300/50">
              <div className="relative w-[inherit] flex gap-6" {...handlersHeader}>
                <div className="w-fit">
                  <h1 className='font-bold'>เลือกรายวิชา</h1>
                  <h1 className={`text-sm text-black/50 ${subjectUpdatedData === "none" && "hidden"}`}>อัพเดตล่าสุด: {subjectUpdatedData}</h1>
                  {/* <h1 className='text-sm text-black/50 hidden'>{getMessageOfFilters()}</h1> */}
                </div>
              </div>
              <div className="">
                <div className="flex gap-4">
                  <span className='p-2 rounded-lg bg-slate-200/70 w-24 h-8 overflow-hidden flex gap-2 justify-center items-center border-b-2 border-slate-300 hover:bg-slate-300 hover:border-0 cursor-pointer' onClick={()=>fnHandleClickedOnFilter()}><FontAwesomeIcon icon={faLayerGroup} style={{color: "#73787e"}}/> <span className='text-sm text-black/60'>คัดกรอง</span></span>
                  <span className='p-2 rounded-lg aspect-square bg-slate-200/70 w-8 h-8 overflow-hidden flex justify-center items-center border-b-2 border-slate-300 hover:bg-slate-300 hover:border-0 cursor-pointer' onClick={()=>toggleScheduleSpectate(false)}><FontAwesomeIcon icon={faClose} style={{color: "#73787e"}}/></span>
                </div>
              </div>
              <div className={`absolute top-full left-0 w-full h-fit max-h-[40dvh] overflow-auto pb-6 px-8 sm:grid grid-cols-2 gap-4 backdrop-blur-md z-10 bg-white/80 border-b-2 border-slate-300/30 smooth ${!state.filter.popupToggle &&"opacity-0 pointer-events-none"}`}>
                <div className="">
                  <div className={`pt-6 ${filter.code.length > 0 && "opacity-50"}`}>
                    หมวดหมู่รายวิชา

                    <span className='flex flex-wrap gap-2 items-center pt-1 relative'>
                      {ge_subject_group_name.map((gsg,gindex)=><span key={gindex} onClick={()=>fnHandleChangeFilterType(gsg.type)} className={`smooth w-16 text-center ${(filter.code.length == 0 && filter.type.includes(gsg.type)) || checkGroupCodes(gsg.code) ? "bg-slate-700/60 text-white" : "bg-slate-400/30" } xl:hover:bg-slate-700/60 xl:hover:text-white px-2 py-1 rounded-lg ${filter.code.length > 0 ? "pointer-events-none" : "cursor-pointer"} text-sm`}>หมวด {gsg.type.split("-")[1]}</span>)}
                      {/* <span className='w-16 text-center bg-slate-400/30 hover:bg-slate-700/60 hover:text-white px-2 py-1 rounded-lg cursor-pointer text-sm'>+</span> */}
                    </span>
                    <span className={`${filter.code.length == 0 && "hidden"}`}>
                      <p className='text-black/70 pt-2 text-[13px]'>หากเลือกเฉพาะวิชา จะไม่สามารถเลือกหมวดหมู่รายวิชาได้</p>
                    </span>
                    <span className={`${(filter.code.length != 0 || filter.date.length != 0) && "hidden"}`}>
                      <p className='text-black/40 pt-2 text-[13px]'>หากเลือกเฉพาะหมวดหมู่รายวิชาอย่างเดียว เว็บจะช้ามาก</p>
                    </span>
                  </div>
                  <div className="pt-6">
                    เฉพาะวิชาที่เลือก

                    <span className='flex flex-wrap gap-2 items-center pt-1 relative'>
                      {filter.code.map((gcode,gindex)=><span key={gindex} className={`${getColorCode(gcode)} px-2 py-1 rounded-lg cursor-pointer text-sm text-black/60`} onClick={()=>{fnHandleToggleFilterSubjectCode(gcode)}}> {gcode}</span>)}
                      <span className='w-16 text-center text-center bg-slate-400/30 xl:hover:bg-slate-700/60 xl:hover:text-white px-2 py-1 rounded-lg cursor-pointer text-sm' onClick={()=>{toggleScheduleNameFilter(true); updateSubjectGroupList()}}>+</span>
                    </span>
                  </div>
                </div>
                <div className="">
                  <div className="pt-6">
                    วันที่เรียน

                    <span className='flex flex-wrap gap-2 items-center pt-1 relative'>
                      {name_days.map((item, iin)=><span key={iin} onClick={()=>fnHandleChangeFilterDate(item.date_2, checkFilterDateSelected(item.date_2))} className={`smooth w-16 text-center ${checkFilterDateSelected(item.date_2) ? "bg-slate-700/60 text-white" : "bg-slate-400/30"} xl:hover:bg-slate-700/60 xl:hover:text-white px-2 py-1 rounded-lg cursor-pointer text-sm`}>{item.date_th}</span>)}
                    </span>
                  </div>
                  <div className="py-6">
                    เวลาที่เริ่มเรียน

                    <span className='flex flex-wrap gap-2 items-center pt-1 relative'>
                      <span className={`w-16 text-center bg-slate-400/30 xl:hover:bg-slate-700/60 xl:hover:text-white px-2 py-1 rounded-lg cursor-pointer text-sm ${filter.time == 'total' && "bg-slate-700/60 text-white"}`} onClick={()=>{fnHandleChangeFilterTime("total")}}>ทั้งหมด</span>
                      <div className={`w-16 text-center bg-slate-400/30 xl:hover:bg-slate-700/60 xl:hover:text-white px-2 py-1 rounded-lg cursor-pointer text-sm ${filter.time != 'total' && "bg-slate-700/60 text-white"}`}><TimePicker onChange={fnHandleChangeFilterTime} value={filter.time === 'total' ? '' : filter.time} placeHolder={"เวลา"} isOpen={state.filter.popupTimeToggle}/></div>
                    </span>
                    <span >
                      <p className='text-black/40 pt-2 text-[13px]'>สามารถเลือกกำหนดเวลาเรียนได้ โดยการกดที่ช่อง &quot;เวลา&quot;</p>
                    </span>
                  </div>
                  <div className='w-full flex justify-end gap-4'>
                    <div className='border-2 border-black/20 rounded-md overflow-hidden'>
                      <button className='bg-white hover:bg-black/10 text-black/60 py-1 px-8 cursor-pointer' onClick={()=>{fnHandleClearFilter()}}>ล้าง</button>
                    </div>
                    <button className='bg-slate-700 text-white rounded-md py-1 px-8 cursor-pointer' onClick={()=>{fnHandleSendFilterUpdate()}}>คัดกรอง</button>
                  </div>
                </div>
              </div>
            </section>
            <section id="subjects" className={`px-5 w-full h-full overflow-y-auto smooth ${state.filter.popupToggle && "blur-[2px]"}`} style={{opacity: ((state.filter.popupDelay == -1 || state.filter.popupDelay == 3) && state.filter.popupToggle) || delay_id == -1 ? 1 : 1-((state.filter.popupDelay+1)/3)}} onScroll={()=>{if(state.filter.popupToggle) toggleScheduleFilter(false)}} onClick={()=>{if(state.filter.popupToggle) toggleScheduleFilter(false)}}>
              {
              !filter.firstFilter ? 
              <div className='w-full h-full flex flex-col justify-center items-center text-slate-400'>
                <FontAwesomeIcon icon={faLayerGroup} style={{color: "rgb(148 163 184)"}} size='6x'/>
                <div className="pt-8 text-center">
                  ยังไม่ได้เลือกการกรองข้อมูล
                  <br />
                  โปรดคัดกรองข้อมูลก่อน
                  <p className='underline cursor-pointer hover:text-slate-600 active:text-slate-700' onClick={fnHandleClickedOnFilter}>คัดกรองข้อมูล</p>
                </div>
              </div> 
              :
              !state.dataLoaded ?
              <div className='w-full h-full flex flex-col justify-center items-center text-slate-400'>
                <FontAwesomeIcon className='animate-spin' icon={faSpinner} style={{color: "rgb(148 163 184)"}} size='4x'/>
              </div> 
              :
              subjectShowData.length > 0 ?
                SubjectSectCardList
              :
              <div className='w-full h-full flex flex-col justify-center items-center text-slate-400'>
                <FontAwesomeIcon icon={faExclamationCircle} style={{color: "rgb(148 163 184)"}} size='6x'/>
                <div className="pt-8 text-center">
                  ไม่มีข้อมูล
                  <p className='underline cursor-pointer hover:text-slate-600 active:text-slate-700' onClick={fnHandleClickedOnFilter}>คัดกรองใหม่</p>
                </div>
              </div>
              }
              {/* {subjectData.map((data, index)=>{
                return <div key={index} className={`${index == subjectData.length-1 ? "mb-3" : ""}`}>
                  <SubjectSectCard data={data}/>
                </div>
              })} */}
            </section>
          </div>
        </div>

        {/* Name Filter Modal Section */}
        <div className={`fixed smooth-out flex justify-center items-end w-full h-full ${state.filter.popupNameToggle && "bg-black/20"} z-50 rounded-t-3xl pointer-events-none`}>
              <div className={`smooth-out overflow-hidden pointer-events-auto fixed rounded-t-3xl w-[96%] h-[62dvh] bg-white ${state.filter.popupNameToggle ? "bottom-0" : "-bottom-full"}`}>
              <div className="h-full grid grid-rows-[auto_1fr] relative">
                  <section id="header" className="relative w-full pt-6 pb-2 px-6 flex justify-between border-b-2 border-slate-300/50">
                    <div className="relative flex gap-6">
                        <div className="w-fit flex items-center">
                        <h1 className='font-bold'>เลือกรายวิชา</h1>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex gap-4">
                        <span className='py-2 px-4 rounded-lg bg-slate-200/70 overflow-hidden flex justify-center items-center border-b-2 border-slate-300 hover:bg-slate-300 cursor-pointer' onClick={()=>toggleScheduleNameFilter(false)}>ถัดไป</span>
                        </div>
                    </div>
                    <div className={`absolute top-full left-0 w-full h-[4rem] overflow-auto grid-cols-2 gap-4 backdrop-blur-md z-10 bg-white/80 border-y-2 border-slate-300/30 smooth ${state.filter.popupNameHeader == '' ? "hidden" : "sm:grid"}`}>
                      <article className="pt-2 pb-2 px-5">
                          <h1 className="font-bold">{state.filter.popupNameHeader}</h1>
                          <p className="text-sm">{state.filter.popupNameDesc}</p>
                      </article>
                    </div>
                  </section>
                  <section id="subjects" onScroll={fnHandleFilterSubjectSelected} className={`px-5 w-full h-full overflow-y-auto smooth relative`}>
                    {
                      ge_subject_group_name.map((sgn, sgnindex)=>
                        <section key={sgnindex} id={"type-"+sgn.type} className={`${sgnindex+1 == ge_subject_group_name.length && "mb-6"}`}>
                            <article className="pt-4 pb-2">
                                <h1 className="font-bold">หมวดหมู่ที่ {sgn.code.substring(3,4)}</h1>
                                <p className="text-sm">{sgn.name}</p>
                            </article>
                            {subjectGroupData[sgnindex]?.map((sjg, sjindex)=>
                              <div key={sjindex} className={`smooth border-b-2 border-slate-100 ${checkFilterSubjectCodeContains(sjg.code) && "bg-green-200"} rounded-md cursor-pointer`} onClick={()=>{fnHandleToggleFilterSubjectCode(sjg.code)}} >
                                <button className="pl-2 w-full py-2 text-left flex gap-2 items-center">
                                  <FontAwesomeIcon className={`${getTextColorCode(sgn.code)}`} icon={faCircle} />
                                  <p>{sjg.code} - {sjg.name}</p>
                                </button>
                              </div>
                            )}
                                {/* <div className={`smooth border-b-2 border-slate-100 ${checkFilterSubjectCodeContains("0041001") && "bg-green-200"} rounded-md cursor-pointer`} onClick={()=>{fnHandleToggleFilterSubjectCode("0041001")}} >
                                    <button className="pl-2 w-full py-2 text-left flex gap-2 items-center">
                                      <FontAwesomeIcon className={`${getTextColorCode(sgn.code)}`} icon={faCircle} />
                                      <p>0041001 - ทดสอบคลิก</p>
                                    </button>
                                </div>
                                <div className="border-b-2 border-slate-100 rounded-md">
                                    <button className="pl-2 w-full py-2 text-left flex gap-2 items-center">
                                      <FontAwesomeIcon className={`${getTextColorCode(sgn.code)}`} icon={faCircle} />
                                      <p>0041001 - วิชาบังคับ</p>
                                    </button>
                                </div>
                                <div className="border-b-2 border-slate-100 rounded-md">
                                    <button className="pl-2 w-full py-2 text-left flex gap-2 items-center">
                                      <FontAwesomeIcon className={`${getTextColorCode(sgn.code)} opacity-60`} icon={faCircleDot} />
                                      <p>0041001 - วิชาเลือกเรียน</p>
                                    </button>
                                </div> */}
                        </section>
                      )
                    }
                  </section>
              </div>
              </div>
          </div>
      </div>
    </>
  )
}