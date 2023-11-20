import PRCalendarSubject from '@/components/PRCalendarSubject';
import { ThemeContext } from '@/providers';
import { CalendarContext, CalendarFilterContext } from '@/providers/CalendarProvider';
import Head from 'next/head';
import { useContext, useEffect, useReducer, useState } from 'react';

export default function Home() {
  const {theme, setTheme} = useContext(ThemeContext);

  const {
    viewSchedule,
    setViewState,
    webReady,
    setWebReady,
    scrolled,
    setScrolled,
    topbarToggle, 
    setTopbarToggle, 
    topbarCord, 
    setTopbarCord,
    topbarHtml, 
    setTopbarHtml
  } = useContext(CalendarContext);

  function toggleTheme(){
    console.log("switched to " + theme);
    setTheme(theme === 'day' ? "night" : "day")
  }

  // TODO: setwebready when load plan in new page
  // useEffect(()=>{
  //   setWebReady(true)
  // },[])

  return (
      <div 
        className={`relative w-full h-full whitespace-nowrap`}
        onMouseMove={(e)=>{
            setTopbarCord([e.clientX + document.body.scrollLeft, e.clientY + document.body.scrollTop])
        }}
        onTouchMove={(e)=>{
            setTopbarCord([e.targetTouches[0].clientX + document.body.scrollLeft, e.targetTouches[0].clientY-60 + document.body.scrollTop])
        }}
      >
        <Head>
          <title>แผนเรียนใหม่</title>
        </Head>
        {/* <button onClick={toggleTheme}>Dark</button> */}

        <span 
          className={`pr-popbar smooth-opacity ${topbarToggle.pre || topbarToggle.init ? "opacity-100" : "opacity-0"} fixed pointer-events-none select-none py-1 px-3 min-w-[10px] min-h-[15px] backdrop-blur-sm bg-black/60 border-[1px] border-gray-600 rounded-xl overflow-hidden -translate-x-1/2 -translate-y-full z-50 text-white/90 flex flex-col justify-center items-center text-sm`}
          style={{left: topbarCord[0], top: topbarCord[1]-10}}
        >
          {topbarHtml}
        </span>

        <div className={`smooth-out w-full h-full flex justify-center items-center relative`} 
          // onClick={()=>{if(state.viewSchedule) {toggleScheduleSpectate(false); toggleScheduleNameFilter(false); toggleScheduleTimeFilter(false); }}} {...handlers}
        >
          {/* Summary Calendar Component */}
            <PRCalendarSubject/>
          </div>
        </div>
  )
}
