import { IsubjectSectDate } from "@/interfaces/subjectSectDate";
import { name_days } from "./global_variables";

export const calculateScale = (str:string) => {
    const timeRange = str.match(/\d{2}:\d{2}-\d{2}:\d{2}/);
    if (timeRange) {
      const [startTime, endTime] = timeRange[0].split('-');
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);
      const duration = (endHour - startHour) + (endMinute - startMinute) / 60;
      return duration;
    }
    return 0;
  };

  export const getHourIndex = (str:string) => {
    const hour = str.slice(2, 4);
    return hour ? parseInt(hour) - 8 : 0;
  };

  export const getDayIndex = (str:string) => {
    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr'];
    const dayName = str.slice(0, 2);
    const index = daysOfWeek.indexOf(dayName);
    return index >= 0 ? index : 0;
  };

  export const getTimeRange = (str:string) => {
    const timeRange = str.match(/\d{2}:\d{2}-\d{2}:\d{2}/);
    return timeRange ? timeRange[0].replace("-", " - ") : "00:00 - 00:00";
  };

  export const getColorCode = (str:string) => {
    switch (str.slice(0,4)) {
      case "0041":
        return "bg-pink-400 hover:bg-pink-700"
      case "0042":
        return "bg-orange-400 hover:bg-orange-700"
      case "0043":
        return "bg-green-400 hover:bg-green-700"
      case "0044":
        return "bg-blue-400 hover:bg-blue-700"
      case "0045":
        return "bg-purple-400 hover:bg-purple-700"
      default:
        return "bg-red-400 hover:bg-red-700"
    }
  };

  export const getTextColorCode = (str:string) => {
    switch (str.slice(0,4)) {
      case "0041":
        return "text-pink-400"
      case "0042":
        return "text-orange-400"
      case "0043":
        return "text-green-400"
      case "0044":
        return "text-blue-400"
      case "0045":
        return "text-purple-400"
      default:
        return "text-red-400"
    }
  };

  export const getSplitedData = (str_raw:string) => {
    let res:Array<IsubjectSectDate> = []
    
    str_raw.split(" & ").map((str:string)=>{
      let data_result:IsubjectSectDate = {
        dayName: "",
        dayColor: "",
        day: "",
        from: "",
        to: "",
        room: "",
        fullDate: ""
      }

      const room = str.split(" ")[1];

      switch (str.slice(0,2)) {
        case 'Mo':
          data_result.dayName = name_days[0].date_th;
          data_result.dayColor = "bg-[#ffd56b]";
          break;
        case 'Tu':
          data_result.dayName = name_days[1].date_th;
          data_result.dayColor = "bg-[#ffa1a1]";
          break;
        case 'We':
          data_result.dayName = name_days[2].date_th;
          data_result.dayColor = "bg-[#c2f784]";
          break;
        case 'Th':
          data_result.dayName = name_days[3].date_th;
          data_result.dayColor = "bg-[#f8a978]";
          break;
        default:
          data_result.dayName = name_days[4].date_th;
          data_result.dayColor = "bg-[#afc5ff]";
          break;
      }

      data_result.day = str.slice(0,2);
      data_result.from = getTimeRange(str).split(" - ")[0];
      data_result.to = getTimeRange(str).split(" - ")[1];
      data_result.room = room;
      data_result.fullDate = str;

      res.push(data_result)
    })

    return res;
  };