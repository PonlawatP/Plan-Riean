'use client'
import Image from 'next/image'
import Calendar from '../../components/calendar'
import { useState } from 'react';

export default function Home() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const days_scrolled = ["M", "T", "W", "Th", "F"];
  
  const times = ["08:00"];
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
      "time":"Th10:00-12:00 RN1-501",
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
      "credit":4,
      "time":"Tu08:00-12:00 RN1-501",
      "mid":" 2/9/2566 เวลา 8:00:00 ถึง 10:00:00",
      "Final":"4/11/2566 เวลา 8:00:00 ถึง 10:00:00",
      "sec":1,
      "lecturer":"อ.ดร.เรณุมาศ จันทรศิริรัตน์",
      "receive":160
    }
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
        return "bg-pink-400"
      case "0042":
        return "bg-orange-400"
      case "0043":
        return "bg-green-400"
      case "0044":
        return "bg-blue-400"
      case "0045":
        return "bg-purple-400"
      default:
        return "bg-red-400"
    }
  };

  return (
    <body className='bg-slate-300'>
      <div className="w-full h-full flex justify-center items-center">






        <div className="calendar-container relative overflow-hidden rounded-2xl w-11/12 border-2 bg-white/80 border-slate-200 shadow-2xl">
            <div className="days absolute z-50 h-full w-16 z-10 transition-all duration-300" style={{transform: 'translateX(-'+scrolled+'px)'}}>
              <div className="border-b-2 border-black/5 "><p className='opacity-0 py-2'>a</p></div>
                {days.map((d,dindex)=><div key={dindex} className={`bg-slate-700 h-20 flex items-center shadow-lg ${dindex+1 < days.length && "border-b-2"} border-white/10`}>
                  <p className='transition-all duration-300 pl-4 text-white' style={{opacity: 1-(scrolled/38)}}>{d}</p>
                  <p className='transition-all duration-300 pl-[2.6rem] text-white absolute' style={{opacity: scrolled/38}}>{days_scrolled[dindex]}</p>
                </div>)}
            </div>
            <div className="header-day relative overflow-x-auto" onScroll={fnHandleScrollCalendar} onScrollCapture={fnHandleScrollCalendar}>

              <div className="days absolute h-full w-16 ">
              <div className="border-b-2 border-black/5 bg-yellow-400"><p className='opacity-0 py-2'>a</p></div>
              </div>

              <div className="pl-16 inline-flex ">
                  {times_m.map((time,tindex)=><span key={tindex} className='h-full flex items-center w-32 py-2 justify-center border-l-2 border-b-2 border-black/5 bg-yellow-400 text-orange-950'>{time.toString().padStart(2, '0')} - {(times_m[tindex+1] || 20).toString().padStart(2, '0')}</span>)}
              </div>

              {days.map((d,dindex)=><div key={dindex} className="pl-16 inline-flex">
                  {times_m.map((time,tindex)=><span key={tindex} className={`relative flex flex-col items-center w-32 h-20 py-2 justify-center border-l-2 ${dindex+1 < days.length && "border-b-2"} border-black/5`}>
                    <p className=''>{dindex}:{tindex}</p>
                    {test_data.map((data,dataindex)=>{
                      return dindex == getDayIndex(data.time) && tindex == getHourIndex(data.time) ?
                        <div key={"d-"+dataindex} className="absolute w-full h-full">
                          <div className={`relative h-full z-40 p-2`} style={{width: (calculateScale(data.time)*100)+"%"}}>
                            <div className={`rounded-lg border-2 border-white/25 h-full w-full p-1 text-center shadow-md ${getColorCode(data.code)}`}>
                              <p className='text-sm'>({data.credit}) {data.code} sec {data.sec}</p>
                              <p className='pt-3 text-sm'>{getTimeRange(data.time)}</p>
                            </div>
                          </div>
                        </div> : <></>
                    })}
                  </span>)}
              </div>)}
            </div>
        </div>







      </div>
    </body>
  )
}
