import PRCalendarSubject from '@/components/PRCalendarSubject';
import { ThemeContext } from '@/providers';
import { CalendarContext } from '@/providers/calendarProvider';
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useReducer, useState } from 'react';

export default function Home() {
  const {theme, setTheme} = useContext(ThemeContext);

  function toggleTheme(){
    console.log("switched to " + theme);
    setTheme(theme === 'day' ? "night" : "day")
  }

  const [viewSchedule, setViewState] = useState(false)
  const [webReady, setWebReady] = useState(false)
  const [scrolled, setScrolled] = useState(0)

  useEffect(()=>{
    setWebReady(true)
  },[])

  return (
    <CalendarContext.Provider value={{viewSchedule, setViewState, webReady, setWebReady, scrolled, setScrolled}}>
      <div className={`relative w-full h-full ${viewSchedule ? "bg-black/70" : ""}`}>
        {/* <Link href={"test"}>
        <button>Test</button>
        </Link> */}
        {/* <button onClick={toggleTheme}>Dark</button> */}


        <div className={`smooth-out ${viewSchedule ? "h-[35dvh] overflow-hidden" : "w-full h-full"} flex justify-center items-center relative`} 
          // onClick={()=>{if(state.viewSchedule) {toggleScheduleSpectate(false); toggleScheduleNameFilter(false); toggleScheduleTimeFilter(false); }}} {...handlers}
        >
          {/* Summary Calendar Component */}
            {/* <PRCalendarSubject/> */}
          </div>
        </div>
    </CalendarContext.Provider>
  )
}
