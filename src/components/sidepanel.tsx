import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SidePanel(props){
    const {state, fnState} = props;
    
    return <>
        <div className={`smooth-out relative h-full ${state.viewSchedule ? "w-side-l" : "w-[0rem]"}`}>
            <div className="absolute right-0 h-full bg-white w-side-l">
                <header className="w-full h-16 px-4 flex justify-between items-center border-b-2 border-black/10">
                    <h3>เลือกวิชาเรียน</h3>
                    <button className='bg-plate-4 aspect-square w-8 rounded-md' onClick={()=>{fnState.toggleScheduleSpectate(false)}}><FontAwesomeIcon icon={faClose} className="text-black/40"/></button>
                </header>
            </div>
         </div>
    </>
}