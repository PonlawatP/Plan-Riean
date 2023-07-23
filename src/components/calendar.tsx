import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { name_days, times_m } from '../helpers/global_variables';
import { getDayIndex, getHourIndex } from '@/helpers/globalFn';
import ScheduleCard from './cards/scheduleCard';

export default function CalendarView(props) {
  const {state, fnState} = props;
  const [scrolled, setScrolled] = useState(0);

  function fnHandleScrollCalendar(e:any){
    const scr = e.target.scrollLeft;
    
    if(scr < 0){
      setScrolled(0)
    } else if(scr <= 38){
      setScrolled(scr)
    } else {
      setScrolled(38)
    }

    const scrllvalue = e.target.scrollLeft / (e.target.scrollWidth - e.target.offsetWidth);
    if(scrllvalue < 0){
      e.preventDefault();
      // e.target.scrollLeft = 0
    } else if(scrllvalue > 1){
      e.preventDefault();
      // e.target.scrollLeft = e.target.scrollWidth - e.target.offsetWidth
    }

    // console.log(e.target.scrollLeft/(e.target.scrollWidth-e.target.offsetWidth))
  }
  const fnHandleClickedOnCalendar = (x:number, y:number) => {
    // if(state.viewSchedule){
    //   fnState.toggleScheduleSpectate(false);
    //   return
    // }
    
    fnState.toggleScheduleSpectate(true);

    // TODO: filter real time
    fnState.filterChangeDate(name_days[y].date_2)
    fnState.filterChangeTime((8+x).toString().padStart(2, "0")+":00")
    fnState.toggleScheduleFilter(true)
  }

  // handlering for swipable
  const swipeHandlers = useSwipeable({
    onSwiping: (event) => {
      fnState.setSwipeLocation(event.deltaY);
    },
    onSwiped: (eventData) => {
      fnState.setSwipeLocation(0);
      if(eventData.dir === 'Down' && eventData.deltaY > 100){
        fnState.toggleScheduleSpectate(false)
      }

      if(eventData.dir === 'Up' && eventData.deltaY < -80){
        fnState.toggleScheduleSpectate(true)
      }
    },
  });

  return (
    <>
      {/* Summary Calendar section */}
      <div className={`smooth-out ${state.viewSchedule ? "h-[35dvh] lg:w-full lg:h-[100dvh] overflow-hidden" : "w-full h-[100dvh]"} flex justify-center items-center relative`} onClick={()=>{if(state.viewSchedule) {fnState.toggleScheduleSpectate(false); fnState.toggleScheduleNameFilter(false); fnState.toggleScheduleTimeFilter(false); }}} {...swipeHandlers}>
      {/* Summary Calendar Component */}

        <div className={`calendar-container overflow-clip rounded-2xl absolute ${state.viewSchedule ? "w-min scale-[.24] sm:scale-[.5] lg:scale-100 lg:w-11/12" : "w-11/12 smooth-out"} max-w-min border-2 border-slate-200 shadow-2xl backdrop-blur-md`}>
            
            <div className="days absolute h-full w-16 z-50 transition-all duration-200 ease-out" style={{transform: 'translateX(-'+scrolled+'px)'}}>
              <div className="border-b-2 border-black/5 "><p className='invisible py-2'>a</p></div>
                {name_days.map((d,dindex)=><div key={dindex} className={`bg-slate-700 h-20 flex items-center shadow-lg ${dindex+1 < name_days.length && "border-b-2"} border-white/10`}>
                  <p className='pl-4 text-white' style={{opacity: 1-(scrolled/38)}}>{d.date_3}</p>
                  <p className='pl-[2.55rem] text-white absolute' style={{opacity: scrolled/38}}>{d.date_1}</p>
                </div>)}
            </div>
            <div className="header-day relative overflow-x-auto w-auto" onScroll={fnHandleScrollCalendar} onScrollCapture={fnHandleScrollCalendar}>

              <div className="days absolute h-full w-16 ">
                <div className="border-b-2 border-black/5 bg-yellow-400"><p className='invisible py-2'>a</p></div>
              </div>

              <div className="pl-16 inline-flex ">
                  {times_m.map((time,tindex)=><span key={tindex} className='h-full flex items-center w-24 py-2 pl-3 border-l-2 border-b-2 border-black/5 bg-yellow-400 text-orange-950/40'>{time.toString().padStart(2, '0')}:00</span>)}
              </div>

              {name_days.map((d,dindex)=><div key={dindex} className="pl-16 inline-flex bg-white/60">
                  {times_m.map((time,tindex)=><span key={dindex+"-"+tindex} className={`relative flex flex-col items-center w-24 h-20 py-2 justify-center border-l-2 ${(dindex+1 < name_days.length && tindex != 4) && "border-b-2"} ${tindex != 4 && "bg-white/20"} border-black/5`}>
                    <p className='invisible'>{dindex}:{tindex}</p>
                    {/* temp schedule - show when hover - event: click to filter subject & sect that on time user clicked & not collapse on other subject */}
                    {(state.webReady && ((tindex < 4 && tindex%2 == 0) || (tindex > 4 && tindex%2 == 1))) &&
                      <div className="absolute w-full h-full" key={"dt-"+dindex+":"+tindex}>

                        <div className={`relative h-full z-40 p-2`} style={{width: "200%"}}>
                          {/* <div className={`cursor-pointer h-full w-full p-1 group`} onClick={()=>alert("Test -> " + d.date_th + " " + (tindex+8).toString().padStart(2, "0") + ":00" + " - " + (tindex+9).toString().padStart(2, "0") + ":00")}> */}
                          <div className={`cursor-pointer h-full w-full p-1 group`} onClick={()=>fnHandleClickedOnCalendar(tindex,dindex)}>
                            <div className={`rounded-lg border-2 border-white/25 text-white/95 bg-black/40 text-center shadow-md w-full h-full flex items-center justify-center opacity-0 transition-all duration-500 ${!state.viewSchedule && "group-hover:opacity-100"} group-hover:duration-100`}>
                              <p className='text-sm'>กดเพื่อดูรายวิชา</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    }

                    {/* schedule data to show */}
                    {/* {getCurrentPlan().data.map((data:any,dataindex:any)=>{
                      return getSplitedData(data.time).map((split_date, spindex)=>{
                        return dindex == getDayIndex(split_date.fullDate) && tindex == getHourIndex(split_date.fullDate) ?
                        <ScheduleCard position={{x:tindex, y:dindex}} key={"d-"+dataindex} data={data} time={split_date.fullDate}/>
                        : null
                      })
                    })} */}
                  </span>)}
              </div>)}
            </div>
        </div>
      </div>
    </>
  );
};
