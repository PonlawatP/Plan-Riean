import { CalendarContext } from "@/providers/CalendarProvider";
import { time } from "console";
import { useContext, useEffect, useMemo, useRef, useState } from "react";

export default function PRCalendarSubject(props: any) {
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


  const [MAX_SUBJECT_TIME, setMAX_SUBJECT_TIME] = useState(18);

  function getTimeTable(added: number = 18){
    const times_m: Array<number> = [];
    for (let i = 8; i <= added; i++) {
      times_m.push(i);
    }
    return times_m;
  }

  const memoizedTimeTable = useMemo(() => getTimeTable(MAX_SUBJECT_TIME), [MAX_SUBJECT_TIME]);

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

  const canvasElemRef = useRef<HTMLElement | null>(null);
  const planElemRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const canvasElem = document.querySelector(".p-canvas-plan");
    const planElem = document.querySelector(".p-planmain");
    
    if (canvasElem && canvasElem instanceof HTMLElement && planElem && planElem instanceof HTMLElement) {
      canvasElemRef.current = canvasElem;
      planElemRef.current = planElem;
    }

    resizePlan()
  }, []);
  
  const resizePlan = () => {
    const canvasElem = canvasElemRef.current
    const planElem = planElemRef.current
    if(canvasElem instanceof HTMLElement && planElem instanceof HTMLElement){
      const canvas = canvasElem?.offsetWidth || 0
      const plan = planElem?.offsetWidth || 0

      if(canvas/plan <= 1){
        setPlanSize(canvas/plan)
        setPlanWidth(canvas)
      } else {
        setPlanSize(1)
        setPlanWidth(-1)
      }
    }
  };

  const [planSize, setPlanSize] = useState(1);
  const [planWidth, setPlanWidth] = useState(1);
  useEffect(() => {
    window.addEventListener('resize', resizePlan);
  
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', resizePlan);
    };
  });

  const [focusTime, setFocusTime] = useState({
    day: 0,
    start_time: 8,
    end_time: 8
  })

  function handleDragToSelectPlanTime(e:any){
    const target = e.target as HTMLElement | null;
    const id = target?.id;
    if(id !== undefined){
        const time = parseInt(id.split("-")[1]);
        const dayindex = parseInt(id.split("-")[2]);
        if(!Number.isNaN(time) && !Number.isNaN(dayindex)){
          setFocusTime({...focusTime, end_time: time})
          if(!topbarToggle.pre){
            setTopbarHtml(<>
              <p>วัน{name_days[focusTime.day].date_th}</p>
              <p>{
                focusTime.start_time == focusTime.end_time
                ?
                  focusTime.start_time.toString().padStart(2, "0")+":00 - " + (focusTime.end_time+1).toString().padStart(2, "0")+":00"
                  :
                  focusTime.start_time > focusTime.end_time 
                  ?
                  focusTime.end_time.toString().padStart(2, "0")+":00 - " + (focusTime.start_time+1).toString().padStart(2, "0")+":00"
                  :
                  focusTime.start_time.toString().padStart(2, "0")+":00 - " + (focusTime.end_time+1).toString().padStart(2, "0")+":00"
                }
              </p>
            </>)
          }
        }
    }
  }

  const [toggleHold, setTooggleHold] = useState<any>(null);

  return <>
    <div className={`
      p-canvas-plan relative w-full h-full m-8 md:ml-0 flex justify-center items-center overflow-hidden  drop-shadow-xl
    `}
    >
      <div className="absolute flex flex-col gap-8 items-center" style={{width: planWidth > 0 ? planWidth+"px" : undefined}}>
        {/* main schedule */}
        <div 
          className="p-planmain select-none min-w-[4rem] min-h-[4rem] bg-white/60 border-2 border-white/80 text-black/30 font-medium rounded-2xl overflow-clip" 
          style={{scale: planSize.toString()}}
          onMouseEnter={()=>{
            setTopbarToggle({pre: false, init: false});
          }}
          onMouseLeave={()=>{
            setTopbarToggle({pre: false, init: false});
          }}
          onMouseMove={handleDragToSelectPlanTime}
        >
          
          {/* row for timer */}
          <span 
            className="grid grid-flow-col"
            onMouseEnter={()=>{
              setTopbarToggle({pre: false, init: false});
            }}
          >
            <span className="w-16 bg-pr-msu-1 border-b-2 border-black/10"></span>
            {memoizedTimeTable.map((t,tindex)=><span key={`pr-time-${tindex}`} className="bg-pr-msu-1 w-20 p-2 border-2 border-t-0 border-r-0 border-black/10">{t.toString().padStart(2, "0")}:00</span>)}
          </span>

          {name_days.map((day, dindex) => 
            <span key={`pr-day-${day.date_1}`} className="grid grid-flow-col">
              <span 
                className={`w-16 bg-pr-msu-2 ${dindex != name_days.length-1 ? "border-b-2" : ""} border-black/10 flex items-center text-white`}
                onMouseEnter={()=>{
                  setTopbarToggle({pre: false, init: false});
                }}
              >
                <p className="ml-3">{day.date_3}</p>
              </span>
              {
                memoizedTimeTable.map((t,tindex)=><span key={`pr-day-${day.date_1}-${t}`} className="relative">
                  <span 
                    id={"plan-"+t.toString().padStart(2, "0")+"-"+dindex}
                    className={`block w-20 h-16 p-2 border-l-2 ${dindex != name_days.length-1 && tindex != 4 ? "border-b-2" : ""} border-black/10 group text-black/10`}
                    onMouseUp={()=>{
                      setTopbarToggle({pre: false, init: false});
                    }}
                  >
                  </span>

                  {/* hover to guide user clicked */}
                  {
                    tindex != 4
                    ?
                    <button 
                      className={`pr-hover-toclick group absolute select-none left-0 top-0 w-[100%] h-full flex justify-center items-center z-10`}
                      id={"planhover-"+t.toString().padStart(2, "0")+"-"+dindex}
                      onMouseDown={(e)=>{

                        setFocusTime({ day: dindex, start_time: t, end_time: t });
                        setTopbarHtml(<>
                          <p>กดค้างไว้</p>
                          <p>เพื่อค้นหาตามเวลา</p>
                        </>)
                        setTopbarToggle({pre: true, init: false});
                        
                        setTooggleHold(setTimeout(() => {
                          setTopbarToggle({pre: false, init: true});
                      
                          // Clear the timeout to prevent the function from running if the click is released before 0.5 seconds
                          clearTimeout(toggleHold);
                        }, 500));
                      }}
                      onMouseUp={()=>{
                        clearTimeout(toggleHold);
                        setTopbarToggle({pre: false, init: false});
                      }}
                    >
                      <span 
                        className={`smooth-opacity opacity-0 ${!topbarToggle.init ? "group-hover:opacity-100" : ""} relative rounded-lg text-sm w-11/12 h-5/6 bg-black/40 text-white/80 flex justify-center items-center`}
                        id={"planhover-"+t.toString().padStart(2, "0")+"-"+dindex}
                      >
                        ดูรายวิชา
                      </span>
                    </button>
                    :
                    null
                  }
                  {/* TODO: badge of subjects here */}
                  <></>

                  {/* hover when user drag clicked */}
                  { 
                    dindex === focusTime.day && t === focusTime.start_time
                    ?
                      <span 
                        className={`pr-hover-dragged smooth-all pointer-events-none select-none absolute h-full flex justify-center items-center top-0`}
                        style={{
                          width: (focusTime.start_time > focusTime.end_time ? ((focusTime.start_time - focusTime.end_time)+1)*100 : ((focusTime.end_time - focusTime.start_time)+1)*100)+"%",
                          left: (focusTime.start_time > focusTime.end_time ? (focusTime.end_time - focusTime.start_time)*100 : 0)+"%"
                        }}
                      >
                        <span 
                          className={`smooth-opacity pr-border-dotspace ${!topbarToggle.init ? "opacity-0" : ""} pointer-events-none select-none relative rounded-lg text-sm w-[calc(100%-10px)] h-5/6 bg-black/60 text-white/80 flex justify-center items-center`}
                        >{
                          focusTime.start_time == focusTime.end_time
                          ?
                            focusTime.start_time.toString().padStart(2, "0")+" - " + (focusTime.end_time+1).toString().padStart(2, "0")
                            :
                            focusTime.start_time > focusTime.end_time 
                            ?
                            focusTime.end_time.toString().padStart(2, "0")+":00 - " + (focusTime.start_time+1).toString().padStart(2, "0")+":00"
                            :
                            focusTime.start_time.toString().padStart(2, "0")+":00 - " + (focusTime.end_time+1).toString().padStart(2, "0")+":00"
                          }
                        </span>
                      </span>
                    :
                    null  
                  }
                </span>
                )
              }
            </span>)
          }

        </div>

        {/* summary plan detail */}
        <span className={`pr-plandetail select-none flex gap-10 text-black/40 smooth-opacity ${topbarToggle.init ? "opacity-20" : "opacity-100"}`}>
          <span>0 วิชา</span>
          <span>0/21 หน่วยกิต</span>
        </span>
        {/* action button */}
        <span className={`pr-planaction absolute bottom-0 right-0 flex gap-4 text-black/30 smooth-opacity ${topbarToggle.init ? "opacity-20" : "opacity-100"}`}>
          <button className="hover:text-black/60"><i className="text-2xl bx bx-download"></i></button>
          <button className="hover:text-black/60"><i className="text-2xl bx bx-share"></i></button>
        </span>
      </div>
    </div>
  </>
}
