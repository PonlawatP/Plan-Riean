import { CalendarContext } from '@/app/providers/CalendarProvider';
import { name_days } from '@/components/PRCalendarSubject';
import { useContext, useState } from 'react';

export interface ISubjectColor {
  color: string;
  iconColor: string;
  bgColor: string;
}
export interface IsubjectSectDate {
  day: string;
  dayName: string;
  dayColor: string;
  from: string;
  to: string;
  room: string;
  fullDate: string;
}

export function getSubjectColor(code: string): ISubjectColor {
  const factCode = code.substring(0, 2);
  const subFactCode = code.substring(2, 4);

  return { color: 'text-black', iconColor: 'text-pink-300', bgColor: 'bg-pink-300' };
}
export const getSplitedData = (str_raw: string) => {
  let res: Array<IsubjectSectDate> = [];

  str_raw.split(';').map((str: string) => {
    let data_result: IsubjectSectDate = {
      dayName: '',
      dayColor: '',
      day: '',
      from: '',
      to: '',
      room: '',
      fullDate: '',
    };

    const room = str.split(' ')[1];

    switch (str.slice(0, 2)) {
      case 'Mo':
        data_result.dayName = name_days[0].date_th;
        data_result.dayColor = 'bg-[#ffd56b]';
        break;
      case 'Tu':
        data_result.dayName = name_days[1].date_th;
        data_result.dayColor = 'bg-[#ffa1a1]';
        break;
      case 'We':
        data_result.dayName = name_days[2].date_th;
        data_result.dayColor = 'bg-[#c2f784]';
        break;
      case 'Th':
        data_result.dayName = name_days[3].date_th;
        data_result.dayColor = 'bg-[#f8a978]';
        break;
      default:
        data_result.dayName = name_days[4].date_th;
        data_result.dayColor = 'bg-[#afc5ff]';
        break;
    }

    data_result.day = str.slice(0, 2);
    data_result.from = getTimeRange(str).split(' - ')[0];
    data_result.to = getTimeRange(str).split(' - ')[1];
    data_result.room = room;
    data_result.fullDate = str;

    res.push(data_result);
  });

  return res;
};

export const calculateScale = (str: string) => {
  const timeRange = str.match(/\d{2}:\d{2}-\d{2}:\d{2}/);
  if (timeRange) {
    const [startTime, endTime] = timeRange[0].split('-');
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const duration = endHour - startHour + (endMinute - startMinute) / 60;
    return duration;
  }
  return 0;
};

export const getHourIndex = (str: string) => {
  const hour = str.slice(2, 4);
  return hour ? parseInt(hour) - 8 : 0;
};

export const getDayIndex = (str: string) => {
  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr'];
  const dayName = str.slice(0, 2);
  const index = daysOfWeek.indexOf(dayName);
  // console.log(daysOfWeek, dayName, index)
  return index >= 0 ? index : 0;
};

export const getTimeRange = (str: string) => {
  const timeRange = str.match(/\d{2}:\d{2}-\d{2}:\d{2}/);
  return timeRange ? timeRange[0].replace('-', ' - ') : '00:00 - 00:00';
};

export const getColorCode = (str: string, bubble = false) => {
  if (bubble) {
    switch (str.slice(0, 2)) {
      case '01':
        return 'bg-[#FF9CA7] group-hover/suj:bg-[#FFDADE]';
      case '02':
        return 'bg-[#FFE376] group-hover/suj:bg-[#FFF5CE]';
      case '03':
        return 'bg-[#C83F3F] group-hover/suj:bg-[#FFDDDD]';
      case '04':
        return 'bg-[#E2E2FF] group-hover/suj:bg-[#FFFFFF]';
      case '05':
        return 'bg-[#FFC251] group-hover/suj:bg-[#FFE4B2]';
      case '07':
        return 'bg-[#A8A800] group-hover/suj:bg-[#FFFFCE]';
      case '08':
        return 'bg-[#D87093] group-hover/suj:bg-[#FFCADC]';
      case '09':
        return 'bg-[#0000FF] group-hover/suj:bg-[#D6D6FF]';
      case '10':
        return 'bg-[#A068FF] group-hover/suj:bg-[#C3B1E1]';
      case '11':
        return 'bg-[#A0522D] group-hover/suj:bg-[#FFDFD0]';
      case '12':
        return 'bg-[#000080] group-hover/suj:bg-[#D5E6FF]';
      case '13':
        return 'bg-[#A08060] group-hover/suj:bg-[#FFEFDF]';
      case '14':
        return 'bg-[#FFB347] group-hover/suj:bg-[#FFEFD8]';
      case '15':
        return 'bg-[#008000] group-hover/suj:bg-[#DEFFDE]';
      case '17':
        return 'bg-[#9ACD32] group-hover/suj:bg-[#F0FFD2]';
      case '20':
        return 'bg-[#FFD700] group-hover/suj:bg-[#FFF8D2]';
      case '22':
        return 'bg-[#6AAFFF] group-hover/suj:bg-[#FFFBE6]';
      case '23':
        return 'bg-[#3A3A3A] group-hover/suj:bg-[#FFFBE4]';
      case '24':
        return 'bg-[#FFA858] group-hover/suj:bg-[#E6E6E6]';
      default:
        return 'bg-red-400/80 hover:bg-red-700';
    }
  }

  switch (str.slice(0, 4)) {
    case '0041':
      return 'bg-pink-400/80 hover:bg-pink-700';
    case '0042':
      return 'bg-orange-400/80 hover:bg-orange-700';
    case '0043':
      return 'bg-green-400/80 hover:bg-green-700';
    case '0044':
      return 'bg-blue-400/80 hover:bg-blue-700';
    case '0045':
      return 'bg-purple-400/80 hover:bg-purple-700';
    default:
      switch (str.slice(0, 2)) {
        case '01':
          return 'bg-[#FFDADE] hover:bg-[#FF9CA7]';
        case '02':
          return 'bg-[#FFF5CE] hover:bg-[#FFE376]';
        case '03':
          return 'bg-[#FFDDDD] hover:bg-[#C83F3F]';
        case '04':
          return 'bg-[#FFFFFF] hover:bg-[#E2E2FF]';
        case '05':
          return 'bg-[#FFE4B2] hover:bg-[#FFC251]';
        case '07':
          return 'bg-[#FFFFCE] hover:bg-[#A8A800]';
        case '08':
          return 'bg-[#FFCADC] hover:bg-[#D87093]';
        case '09':
          return 'bg-[#D6D6FF] hover:bg-[#0000FF]';
        case '10':
          return 'bg-[#C3B1E1] hover:bg-[#A068FF]';
        case '11':
          return 'bg-[#FFDFD0] hover:bg-[#A0522D]';
        case '12':
          return 'bg-[#D5E6FF] hover:bg-[#000080]';
        case '13':
          return 'bg-[#FFEFDF] hover:bg-[#A08060]';
        case '14':
          return 'bg-[#FFEFD8] hover:bg-[#FFB347]';
        case '15':
          return 'bg-[#DEFFDE] hover:bg-[#008000]';
        case '17':
          return 'bg-[#F0FFD2] hover:bg-[#9ACD32]';
        case '20':
          return 'bg-[#FFF8D2] hover:bg-[#FFD700]';
        case '22':
          return 'bg-[#FFFBE6] hover:bg-[#6AAFFF]';
        case '23':
          return 'bg-[#FFFBE4] hover:bg-[#3A3A3A]';
        case '24':
          return 'bg-[#E6E6E6] hover:bg-[#FFA858]';
        default:
          return 'bg-red-400/80 hover:bg-red-700';
      }
  }
};
