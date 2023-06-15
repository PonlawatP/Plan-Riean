import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ge_subject_group_name, name_days } from "./shared/variables";
import { faClose, faExclamationCircle, faLayerGroup, faSpinner } from "@fortawesome/free-solid-svg-icons";
import SubjectSectCard from "./subjectSectCard";

const SubjectView = (props:any) => {
    const {state, filter, subjectShowData, my_plan, my_plan_index} = props;
    
    return (
        <div className={`fixed smooth-out overflow-hidden w-full h-[65dvh] ${state.viewSchedule ? "bottom-0" : "-bottom-full"} bg-white rounded-t-3xl z-50`} style={{bottom: (!state.viewSchedule ? (-65)-state.swipedLocated : 0-state.swipedLocated < 0 ? 0-state.swipedLocated : 0) + "%"}}>
        <div className="px-5 h-full grid grid-rows-[auto_1fr] relative">
          <section id="header" className="relative w-full pt-6 pb-2 px-1 flex justify-between border-b-2 border-slate-300/50">
            <div className="relative w-[inherit] flex gap-6" {...props.handlersHeader}>
              <div className="w-fit">
                <h1 className='font-bold'>เลือกรายวิชา</h1>
                <h1 className='text-sm text-black/50'>ไม่ได้คัดกรอง</h1>
              </div>
            </div>
            <div className="">
              <div className="flex gap-4">
                <span className='p-2 rounded-lg aspect-square bg-slate-200/70 w-8 h-8 overflow-hidden flex justify-center items-center border-b-2 border-slate-300 hover:bg-slate-300 hover:border-0' onClick={()=>props.fnHandleClickedOnFilter()}><FontAwesomeIcon icon={faLayerGroup} style={{color: "#73787e", transform: "rotate(0deg)"}}/></span>
                <span className='p-2 rounded-lg aspect-square bg-slate-200/70 w-8 h-8 overflow-hidden flex justify-center items-center border-b-2 border-slate-300 hover:bg-slate-300 hover:border-0' onClick={()=>props.toggleScheduleSpectate(false)}><FontAwesomeIcon icon={faClose} style={{color: "#73787e"}}/></span>
              </div>
            </div>
            <div className={`absolute top-full left-0 w-full h-fit max-h-[30dvh] overflow-auto pb-6 px-3 sm:grid grid-cols-2 gap-4 backdrop-blur-md z-10 bg-white/80 border-b-2 border-slate-300/30 smooth ${!state.filter.popupToggle &&"opacity-0 pointer-events-none"}`}>
              <div className="">
                <div className="pt-6">
                  หมวดหมู่รายวิชา

                  <span className='flex flex-wrap gap-2 items-center pt-1 relative'>
                    {ge_subject_group_name.map((gsg,gindex)=><span key={gindex} onClick={()=>props.fnHandleChangeFilterType(gsg.type)} className={`smooth w-16 text-center ${filter.type === gsg.type ? "bg-slate-700/60 text-white" : "bg-slate-400/30" } lg:hover:bg-slate-700/60 lg:hover:text-white px-2 py-1 rounded-lg cursor-pointer text-sm`}>หมวด {gsg.type.split("-")[1]}</span>)}
                    {/* <span className='w-16 text-center bg-slate-400/30 hover:bg-slate-700/60 hover:text-white px-2 py-1 rounded-lg cursor-pointer text-sm'>+</span> */}
                  </span>
                </div>
                <div className="pt-6">
                  เฉพาะวิชาที่เลือก

                  <span className='flex flex-wrap gap-2 items-center pt-1 relative'>
                    <span className='w-16 text-center text-center bg-slate-400/30 hover:bg-slate-700/60 hover:text-white px-2 py-1 rounded-lg cursor-pointer text-sm'>+</span>
                    {/* {ge_subject_group_name.map((gsg,gindex)=><span key={gindex} className='bg-slate-400/30 hover:bg-slate-700/60 hover:text-white px-2 rounded-lg cursor-pointer text-sm'>หมวด {gsg.type.split("-")[1]}</span>)} */}
                  </span>
                </div>
              </div>
              <div className="">
                <div className="pt-6">
                  วันที่เรียน

                  <span className='flex flex-wrap gap-2 items-center pt-1 relative'>
                    {name_days.map((item, iin)=><span key={iin} onClick={()=>props.fnHandleChangeFilterDate(item.date_2, props.checkFilterDateSelected(item.date_2))} className={`smooth w-16 text-center ${props.checkFilterDateSelected(item.date_2) ? "bg-slate-700/60 text-white" : "bg-slate-400/30"} lg:hover:bg-slate-700/60 lg:hover:text-white px-2 py-1 rounded-lg cursor-pointer text-sm`}>{item.date_th}</span>)}
                  </span>
                </div>
                <div className="pt-6">
                  เวลาที่เริ่มเรียน

                  <span className='flex flex-wrap gap-2 items-center pt-1 relative'>
                    <span className='w-16 text-center bg-slate-400/30 lg:hover:bg-slate-700/60 lg:hover:text-white px-2 py-1 rounded-lg cursor-pointer text-sm'>ทั้งหมด</span>
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section id="subjects" className='w-full h-full overflow-y-auto'>
            {
            !filter.firstFilter ? 
            <div className='w-full h-full flex flex-col justify-center items-center text-slate-400'>
              <FontAwesomeIcon icon={faLayerGroup} style={{color: "rgb(148 163 184)"}} size='6x'/>
              <div className="pt-8 text-center">
                ยังไม่ได้เลือกการกรองข้อมูล
                <br />
                โปรดคัดกรองข้อมูลก่อน
              </div>
            </div> 
            :
            !state.dataLoaded ?
            <div className='w-full h-full flex flex-col justify-center items-center text-slate-400'>
              <FontAwesomeIcon className='animate-spin' icon={faSpinner} style={{color: "rgb(148 163 184)"}} size='4x'/>
            </div> 
            :
            subjectShowData.length > 0 ?
              subjectShowData.map((data:any, index:any)=>{
                return <div key={index} className={`${index == subjectShowData.length-1 ? "mb-3" : ""}`}>
                  <SubjectSectCard data={data} checkSubjectSchedule={props.checkSubjectSchedule} removeSubjectFromPlan={props.removeSubjectFromPlan} checkSubjectCollapsed={props.checkSubjectCollapsed} getCurrentPlan={props.getCurrentPlan} setPlan={props.setPlan} getSplitedData={props.getSplitedData} my_plan={my_plan} my_plan_index={my_plan_index} updateUserStorage={props.updateUserStorage} fnHandleClickedCard={props.fnHandleClickedCard} />
                </div>
              })
            :
            <div className='w-full h-full flex flex-col justify-center items-center text-slate-400'>
              <FontAwesomeIcon icon={faExclamationCircle} style={{color: "rgb(148 163 184)"}} size='6x'/>
              <div className="pt-8 text-center">
                ไม่มีข้อมูล
              </div>
            </div> 
            }
          </section>
        </div>
      </div>
    )
}

export default SubjectView