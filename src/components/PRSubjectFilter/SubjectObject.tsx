import { CalendarFilterContext } from "@/app/providers/CalendarProvider";
import { useContext } from "react";

export default function SubjectObject(props:any) {
    const {code = "0000000", title="Title", desc="Subtitle", color="pink"} = props;

    const {SubjectFilterTogglePRC, isSubjectFilterOn} = useContext(CalendarFilterContext)
    const isActive = isSubjectFilterOn(code)

    return  <button onClick={()=>SubjectFilterTogglePRC(code)} className={`px-2 py-1 group w-full border-b-[1px]`}>
                <div className={`px-3 py-1 rounded-lg flex gap-2 ${isActive ? "bg-green-200 group-hover:bg-green-100 group-active:bg-green-300" : "group-hover:bg-black/10 group-active:bg-pr-bg-3"}`}>
                    <div className="flex items-center gap-2 h-min">
                        <i className={`bx bxs-circle text-`+color+`-300`}></i>
                        <span className={`px-2 rounded-lg bg-`+color+`-300`}>
                            {code}
                        </span>
                    </div>
                    <span className={`text-left ${isActive ? "" : "group-active:text-white"}`}>
                        <p>{title}</p>
                        <p className={`text-sm text-pr-gray-1 ${isActive ? "" : "group-active:text-white/70"}`}>{desc}</p>
                    </span>
                </div>
            </button>
}