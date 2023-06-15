import { useReducer } from "react";
import { CardReducer } from "../reducers/webmainred";

export default function SubjectSectCard(props: any){
    const {data, my_plan_index} = props;
    const cardInitialState = {
      index: 0,
      smooth: false,
      status: "not-select"
    };

    const [cardState, cardDispatch] = useReducer(CardReducer, cardInitialState);

    // TODO: Next-Phase - swipe to options
    // const setSlide = (index:number) => {
    //   cardDispatch({
    //     type: 'SET_SLIDE_INDEX',
    //     payload: index,
    //   });
    // };
    // const toggleSmooth = (status:boolean) => {
    //   cardDispatch({
    //     type: 'SET_SLIDE_SMOOTH',
    //     payload: status,
    //   });
    // };

    // const handlerSubject = useSwipeable({
    //   onSwiping: (event) => {
    //     setSlide(event.deltaX*.15);
    //   },
    //   onTouchEndOrOnMouseUp: (event) => {
    //     setSlide(0)
    //     toggleSmooth(true)
    //   },
    //   onTouchStartOrOnMouseDown: (event) => {
    //     toggleSmooth(false)
    //   },
    // });

    // return <div className={`${cardState.smooth && "smooth-out"} mt-3 h-20 rounded-xl overflow-hidden bg-slate-100 relative border-[2px] border-black/10`} style={{transform: 'translateX('+cardState.index+'px)'}}>

    const setStatus = (status:string) => {
      cardDispatch({
        type: 'SET_SLIDE_FOCUS',
        payload: status,
      });
    };

    const fnHandleClickedCard = () => {
      // if already had subject in schedule
      if(props.checkSubjectSchedule(data)){
        props.removeSubjectFromPlan(data)
        return
      }

      if(props.checkSubjectCollapsed(data)){
        return
      }

      // add new subject
      const old_plan = props.getCurrentPlan();
      old_plan.data.push(data);
      const updated = {[my_plan_index]: old_plan}
      props.setPlan((prev:any) => ({...prev, ...updated}))
      props.updateUserStorage();
    }

    const dateData = props.getSplitedData(data.time);

    return <div className={`mt-3 min-h-[5rem] rounded-xl overflow-hidden flex items-end bg-slate-100 relative border-[2px] cursor-pointer ${props.checkSubjectSchedule(data) ? "border-green-400/90 shadow-green-400/40 shadow-md" : "border-black/10"} ${props.checkSubjectCollapsed(data) && !props.checkSubjectSchedule(data) ? "opacity-40 brightness-75" : "opacity-100 brightness-100"}`} onClick={fnHandleClickedCard}>
      <span className="flex absolute left-0 top-0">
        <span className='w-16 border-b-2 border-r-2 border-black/20 rounded-br-xl bg-slate-500 text-white/90'>
          <h3 className='text-center opacity-80'>sec {data.sec}</h3>
        </span>
        <p className='text-black/40 text-[12px] pt-1 pl-2'>{data.code} {data.name}</p>
      </span>
      <span className='absolute top-1 right-2 text-sm text-black/40'>
        รับ {data.receive} ที่นั่ง
      </span>
      <div className='pt-[1.8rem] pb-1 px-2 w-full text-sm'>
        {data.lecturer.split("-").map((lect:any,lindex:any)=><p key={lindex} className='text-black/40'>{lect}</p>)}
        <div className="">
          {dateData.map((date:any,dateindex:any)=>
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