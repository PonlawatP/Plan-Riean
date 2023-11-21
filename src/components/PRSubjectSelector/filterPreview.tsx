export default function FilterPreview(props:any){
const {
    group = [],
    subject = [],
    day = [],
    time = [],
    place = [],
    room = []
} = props;

function getGroupFormat(){
  if(group.includes("all") || group.length == 0){
      return "ทั้งหมด"
  }

  const geNumbers = group
  .filter((groupItem:any) => groupItem.startsWith("GE"))
  .map((groupItem:any) => {
    const match = groupItem.match(/GE-(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  })
  .filter((number:any) => number !== null);
    
  // TODO: will check user is logged in later *in (ge == 0)
  console.log(geNumbers);
  
  if (geNumbers.length == 5 || (geNumbers.length == 0)){
    return "GE"
  } else if(geNumbers.length > 0){
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
    return `GE ${ranges.join(', ')}`;
  }
  
    return "null"
}

return <div className="flex flex-wrap gap-2 p-2 pt-3 pb-5 text-pr-gray-1 bg-gradient-to-t from-transparent via-white/50 via-20% to-white/80 to-50% sticky top-0 backdrop-blur-sm z-10">
        <span className="flex gap-1 items-center">
            <i className="bx bxs-book text-2xl"></i>
            <p>{getGroupFormat()}</p>
        </span>
        <span className="flex gap-1 items-center">
            <i className="bx bx-search-alt-2 text-2xl"></i>
            <p>ทั้งหมด</p>
        </span>
        <span className="flex gap-1 items-center">
            <i className="bx bx-calendar text-2xl"></i>
            <p>ทั้งหมด</p>
        </span>
        <span className="flex gap-1 items-center">
            <i className="bx bx-time-five text-2xl"></i>
            <p>ทั้งหมด</p>
        </span>
        <span className="flex gap-1 items-center">
            <i className="bx bx-buildings text-2xl"></i>
            <p>ทั้งหมด</p>
        </span>
        <span className="flex gap-1 items-center">
            <i className="bx bx-door-open text-2xl"></i>
            <p>ทั้งหมด</p>
        </span>
    </div>
}