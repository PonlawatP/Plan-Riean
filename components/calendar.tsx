"use client"
import React, { useState } from 'react';
import { name_days, times_m } from './shared/variables';
import { ScheduleCard } from './scheduleCard';

const Calendar = (props:any) => {
  const {state} = props;

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

  const fnHandleClickedOnCalendar = (x:number, y:number) => {
    if(state.viewSchedule){
      props.toggleScheduleSpectate(false);
      return
    }
    
    props.toggleScheduleSpectate(true);
  }

  return (
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
                              <div onClick={()=>fnHandleClickedOnCalendar(dindex,tindex)} className={`cursor-pointer rounded-lg border-2 border-white/25 h-full w-full p-1 text-center shadow-md text-white/95 bg-black/40 opacity-0 transition-all duration-500 flex items-center justify-center ${!state.viewSchedule && "hover:opacity-100"} hover:duration-100`}>
                                <p className='text-sm'>กดเพื่อดูรายวิชา</p>
                              </div>
                            </div>

                      </div>
                    }

                    {/* schedule data to show */}
                    {props.getCurrentPlan().data.map((data:any,dataindex:any)=>{
                      return props.getSplitedData(data.time).map((split_date:any, spindex:any)=>{
                        return dindex == props.getDayIndex(split_date.fullDate) && tindex == props.getHourIndex(split_date.fullDate) ?
                        <ScheduleCard key={"d-"+dataindex} data={data} time={split_date.fullDate} state={state} removeSubjectFromPlan calculateScale getColorCode getTimeRange/>
                        : null
                      })
                    })}
                  </span>)}
              </div>)}
            </div>
        </div>
  );
};

export default Calendar;
