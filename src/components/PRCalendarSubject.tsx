import { CalendarContext } from "@/providers/calendarProvider";
import { useContext } from "react";

export default function PRCalendarSubject(props: any) {
  const {
    viewSchedule,
    setViewState,
    webReady,
    setWebReady,
    scrolled,
    setScrolled,
  } = useContext(CalendarContext);
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
    },
  ];

  const times_m = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

  function fnHandleClickedOnCalendar(tindex: number, dindex: number) {
    alert("test");
  }

  function fnHandleScrollCalendar(e: any) {
    setScrolled(
      e.target.scrollLeft <= 0
        ? 0
        : e.target.scrollLeft >= 37
        ? 37
        : e.target.scrollLeft
    );
  }

  return (
    <div
      className={`calendar-container overflow-hidden rounded-2xl ${
        viewSchedule
          ? "absolute w-min scale-[.24] sm:scale-[.5]"
          : "relative w-11/12 smooth-out"
      } xl:w-min border-2 bg-white/80 border-slate-200 shadow-2xl`}
    >
      <div
        className="days absolute h-full w-16 z-50 transition-all duration-300"
        style={{ transform: "translateX(-" + scrolled + "px)" }}
      >
        <div className="border-b-2 border-black/5 ">
          <p className="opacity-0 py-2">a</p>
        </div>
        {name_days.map((d, dindex) => (
          <div
            key={dindex}
            className={`bg-slate-700 h-20 flex items-center shadow-lg ${
              dindex + 1 < name_days.length && "border-b-2"
            } border-white/10`}
          >
            <p
              className="transition-all duration-300 pl-4 text-white"
              style={{ opacity: 1 - scrolled / 38 }}
            >
              {d.date_3}
            </p>
            <p
              className="transition-all duration-300 pl-[2.55rem] text-white absolute"
              style={{ opacity: scrolled / 38 }}
            >
              {d.date_1}
            </p>
          </div>
        ))}
      </div>
      <div
        className="header-day relative overflow-x-auto"
        onScroll={fnHandleScrollCalendar}
        onScrollCapture={fnHandleScrollCalendar}
      >
        <div className="days absolute h-full w-16 bg-slate-700">
          <div className="border-b-2 border-black/5 bg-yellow-400">
            <p className="opacity-0 py-2">a</p>
          </div>
        </div>

        <div className="pl-16 inline-flex ">
          {times_m.map((time, tindex) => (
            <span
              key={tindex}
              className="h-full flex items-center w-24 py-2 pl-3 border-l-2 border-b-2 border-black/5 bg-yellow-400 text-orange-950/40"
            >
              {time.toString().padStart(2, "0")}:00
            </span>
          ))}
          {/* {times_m.map((time,tindex)=><span key={tindex} className='h-full flex items-center w-32 py-2 justify-center border-l-2 border-b-2 border-black/5 bg-yellow-400 text-orange-950'>{time.toString().padStart(2, '0')} - {(times_m[tindex+1] || 20).toString().padStart(2, '0')}</span>)} */}
        </div>

        {name_days.map((d, dindex) => (
          <div key={dindex} className="pl-16 inline-flex align-top">
            {times_m.map((time, tindex) => (
              <span
                key={dindex + "-" + tindex}
                className={`relative flex flex-col items-center w-24 h-20 py-2 justify-center border-l-2 ${
                  dindex + 1 < name_days.length && tindex != 4 && "border-b-2"
                } border-black/5`}
              >
                {/* <p className='opacity-1'>{dindex}:{tindex}</p> */}
                {/* temp schedule - show when hover - event: click to filter subject & sect that on time user clicked & not collapse on other subject */}
                {webReady &&
                  ((tindex < 4 && tindex % 2 == 0) ||
                    (tindex > 4 && tindex % 2 == 1)) && (
                    <div
                      key={"dt-" + dindex + ":" + tindex}
                      className="absolute left-0 w-full h-full"
                      style={{
                        width: tindex == times_m.length - 1 ? "100%" : "200%",
                      }}
                      onClick={() => fnHandleClickedOnCalendar(tindex, dindex)}
                    >
                      <div className={`relative h-full p-1 group`}>
                        <div
                          className={`cursor-pointer z-10 relative rounded-lg border-2 border-white/25 h-full w-full p-1 text-center shadow-md text-white/95 bg-black/40 opacity-0 transition-all duration-500 flex items-center justify-center ${
                            !viewSchedule && "hover:opacity-100"
                          } hover:duration-100`}
                        >
                          <p className="text-sm">กดเพื่อดูรายวิชา</p>
                        </div>
                      </div>
                    </div>
                  )}

                {/* schedule data to show */}
                {/* {getCurrentPlan().data.map((data:any,dataindex:any)=>{
                        return getSplitedData(data.time).map((split_date, spindex)=>{
                          return dindex == getDayIndex(split_date.fullDate) && tindex == getHourIndex(split_date.fullDate) ?
                          <ScheduleCard position={{x:tindex, y:dindex}} key={"d-"+dataindex} data={data} time={split_date.fullDate}/>
                          : null
                        })
                      })} */}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
