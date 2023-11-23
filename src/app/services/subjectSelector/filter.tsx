import { CalendarContext, CalendarFilterContext, ICalendarFilter } from "@/app/providers/CalendarProvider";
import { useContext, useState } from "react";

export default function SubjectSelectorFilterModel(props:any){
    const {children} = props
    const {
      viewFilter,
      calsel_data,
      setCalselData
    } = useContext(CalendarContext)
    const {
      topbarToggle,
      focusTime,

      viewSchedule,

      setViewState,
      setViewFilter,
      resizePlan,
      toggleHold,
      setTopbarToggle
    } = useContext(CalendarContext)

    const [filter, setFilter] = useState<ICalendarFilter>({
      group: [],
      subject: [],
      day: [],
      time: [],
      room: [],
      master: []
    })

    const {
      group,
      subject,
      day,
      time,
      room,
      master
  } = filter;

    function handleOpenSubjectSelect(){
      setViewState(true)
      setViewFilter(false)

      setTimeout(()=>{resizePlan()},250)
    }

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


    function handleFilterPanel(){
      setViewFilter(!viewFilter)
    }

    function handleFilterSubmit(clear=false){
      if(clear){
        setFilter({
          group: [],
          subject: [],
          day: [],
          time: [],
          room: [],
          master: []
      })
        return
      }
      handleSearch()
      // setViewFilter(!viewFilter)
      
    }
    function handleSearch(){
      console.log(filter)
      setCalselData({...calsel_data, isLoading: true, current_filter: filter, isFirstLoading: false})
      setTimeout(()=>{
        setCalselData({...calsel_data, isLoading: false})
      },1000)
    }

    function fnHandleClickedOnCalendar(tindex: number, dindex: number) {
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

    function isGroupFilterOn(name: string = ""){
      return group.includes(name);
    }

    function GroupFilterTogglePRC(name:string){
      let temp_group = group;

      if(group.includes(name)){
        temp_group = group.filter((item:string) => item !== name)
      } else {
        temp_group.push(name);
      }

      setFilter({...filter, group: temp_group})
    }
      
    function isDayFilterOn(name: string = ""){
      return day.includes(name);
    }

    function DayFilterTogglePRC(name:string){
      let temp_day = day;

      if(day.includes(name)){
        temp_day = day.filter((item:string) => item !== name)
      } else {
        temp_day.push(name);
      }

      setFilter({...filter, day: temp_day})
    }

    function isTimeFilterOn(all:boolean = false, time_num:string = ""){
      if(all){
        return time.length == 0 || (time.length > 0 && time.includes("all")) || time.filter((t:string)=>t===t.replaceAll("-","")).length == 0
      }

      return time.includes("all") ? false : time.filter((t:string)=> t === time_num.replaceAll("-","")).length > 0;
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
  
      if(!filter.time.includes(time_num) || forceToggle){
        temp_time = [time_num]
      } else {
        temp_time = temp_time.filter((t:string)=>t!=="all")
  
        temp_time = temp_time.map((tt:string)=>{
          if(tt === time_num){
            return time_num.includes("-") ? tt.slice(1) : "-"+tt
          }
          return tt
        })
      }
  
  
      setFilter({...filter, time: temp_time})
    }

    return <CalendarFilterContext.Provider value={{
      fnHandleClickedOnCalendar, handleReleaceHoldClick, handleFilterPanel, handleFilterSubmit, handleOpenSubjectSelect,
      filter, setFilter,
      isGroupFilterOn, isDayFilterOn, isTimeFilterOn,
      GroupFilterTogglePRC, DayFilterTogglePRC, TimeFilterTogglePRC, SingleTimeFilterTogglePRC,
      }}>
        <div
        className={"pr-layout h-[100dvh] grid grid-rows-[auto_1fr] "+props.classname}
        onMouseUp={handleReleaceHoldClick}
        >
            {children}
        </div>
    </CalendarFilterContext.Provider>
}