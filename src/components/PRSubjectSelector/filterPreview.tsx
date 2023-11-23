import { CalendarFilterContext } from "@/providers/CalendarProvider";
import { useContext } from "react";

export default function FilterPreview(props:any){
  const {filter, setFilter} = useContext(CalendarFilterContext);
  const {
    group,
    subject,
    day,
    time,
    room,
    master
} = filter

function getGroupFormat(){
  if(group.includes("all") || group.length == 0 || group.length == 9){
      return "ทั้งหมด"
  }

  const res:any[] = [];

  const geNumbers = group
  .filter((groupItem:any) => groupItem.startsWith("ge"))
  .map((groupItem:any) => {
    const match = groupItem.match(/ge-(\d+)/);
    return match ? parseInt(match[1], 10) : -1;
  })
  .filter((number:any) => number !== -1);

  group.map((g:string)=>{
    if(!g.startsWith("ge")){
      // res += " "+g;
      if(g === "mainf"){
        res.push("บังคับ")
      } else if(g === "mainc"){
        res.push("เลือก")
      } else if(g === "free") {
        res.push("เสรี")
      } else {
        res.push("พื้น")
      }
    }
  })
  
  if(geNumbers.length > 0){
    if (geNumbers.length == 5){
      res.push("GE")
    } else {
      geNumbers.sort((a:number, b:number) => a - b);

      const ranges = [];
      let start = geNumbers[0];
      let end = geNumbers[0];
  
      for (let i = 1; i < geNumbers.length; i++) {
        if (geNumbers[i] === end + 1) {
          end = geNumbers[i];
        } else {
          ranges.push(end > start ? `${start}-${end}` : `${start}`);
          start = geNumbers[i];
          end = geNumbers[i];
        }
      }
  
      ranges.push(end > start ? `${start}-${end}` : `${start}`);
      res.push(`GE ${ranges.join(', ')}`)
    }
  }

  if(res.length >= 3){
    return `${group.length} กลุ่ม`
  }

  return res.join(", ").trim();
}

return <div className="flex flex-wrap gap-2 p-2 pt-3 pb-5 text-pr-gray-1 bg-gradient-to-t from-transparent via-white/50 via-20% to-white/80 to-50% sticky top-0 backdrop-blur-sm z-10">
        <span className="flex gap-1 items-center">
            <i className="bx bxs-book text-2xl"></i>
            <p>{getGroupFormat()}</p>
        </span>
        {subject.length > 0 &&
          <span className="flex gap-1 items-center">
              <i className="bx bx-search-alt-2 text-2xl"></i>
              <p>ทั้งหมด</p>
          </span>
        }
        {day.length > 0 &&
          <span className="flex gap-1 items-center">
              <i className="bx bx-calendar text-2xl"></i>
              <p>ทั้งหมด</p>
          </span>
        }
        {time.length > 0 &&
          <span className="flex gap-1 items-center">
              <i className="bx bx-time-five text-2xl"></i>
              <p>ทั้งหมด</p>
          </span>
        }
        {room.length > 0 &&
          <span className="flex gap-1 items-center">
              <i className="bx bx-buildings text-2xl"></i>
              <p>ทั้งหมด</p>
          </span>
        }
        {master.length > 0 &&
          <span className="flex gap-1 items-center">
              <i className="bx bx-id-card text-2xl"></i>
              <p>ทั้งหมด</p>
          </span>
        }
    </div>
}