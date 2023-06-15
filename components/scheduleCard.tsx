"use client"
export const ScheduleCard = (props:any) => {
    const {state, data, time} = props
    // const [clicked, setClicked] = useState(false);

    function fnHandleClickedOnScheduleCard(){
      // setClicked(!clicked)
      if(!state.viewSchedule) props.removeSubjectFromPlan(data)
    }

    return (
      <div className="absolute w-full h-full">

        <div className={`relative h-full z-40 p-2 group`} style={{width: (props.calculateScale(time)*100)+"%"}}>
          <div onClick={fnHandleClickedOnScheduleCard} className={`z-10 relative cursor-pointer rounded-lg border-2 border-white/25 h-full w-full p-1 text-center shadow-md hover:text-white/95 ${props.getColorCode(data.code)} transition-all duration-200`}>
            <p className='text-sm'>({data.credit.split(" ")[0].trim()}) {data.code} sec {data.sec}</p>
            <p className='pt-3 text-sm'>{props.getTimeRange(time)}</p>
          </div>
          {/* <div className={`smooth absolute left-0 ${clicked ? "bottom-full pointer-events-none" : "bottom-1/3 opacity-0"} w-full h-12 flex justify-center`}>
            <div className="bg-white rounded-md h-full aspect-square shadow-md p-1 pointer-events-auto border-2 border-black/10">
              <div className="smooth bg-red-500 hover:bg-red-600 rounded-md h-full aspect-square shadow-sm cursor-pointer flex justify-center items-center border-2 border-black/10">
              x
              </div>
            </div>
          </div> */}
        </div>
      </div>
    )
  }