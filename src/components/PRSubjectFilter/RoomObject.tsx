import { CalendarFilterContext } from "@/app/providers/CalendarProvider";
import { getSubjectColor } from "@/app/utils/msu/subjectUtils";
import { useContext } from "react";

export default function RoomObject(props:any) {
    const {title="title", desc="subtitle"} = props;

    const {RoomFilterTogglePRC, isRoomFilterOn} = useContext(CalendarFilterContext)
    const isActive = isRoomFilterOn(title)

    return  <button onClickCapture={()=>RoomFilterTogglePRC(title)} className={`px-2 py-1 group w-full border-b-[1px]`}>
                <div className={`px-3 py-1 rounded-lg flex gap-2 ${isActive ? "bg-green-200 group-hover:bg-green-100 group-active:bg-green-300" : "group-hover:bg-black/10 group-active:bg-pr-bg-3"}`}>
                    <span className={`text-left ${isActive ? "" : "group-active:text-white"}`}>
                        {title !== "title" ? <p>{title}</p> : null}
                        {desc !== "subtitle" ? <p className={`text-sm text-pr-gray-1 ${isActive ? "" : "group-active:text-white/70"}`}>{desc}</p> : null}
                    </span>
                </div>
            </button>
}