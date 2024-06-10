import { CalendarFilterContext } from '@/app/providers/CalendarProvider';
import { useContext } from 'react';
import { name_days } from '../PRCalendarSubject';

export default function FilterPreview(props: any) {
  const f = useContext(CalendarFilterContext);
  const { group, subject, day, time, room, master } = f.filter;

  function getGroupFormat() {
    if (group.includes('total') || group.length == 0 || group.length == 9) {
      return 'ทุกหมวด GE';
    }

    const res: any[] = [];

    const geNumbers = group
      .filter((groupItem: any) => groupItem.startsWith('004'))
      .map((groupItem: any) => {
        const match = groupItem.match(/004(\d+)/);
        return match ? parseInt(match[1], 10) : -1;
      })
      .filter((number: any) => number !== -1);

    group.map((g: string) => {
      if (!g.startsWith('004')) {
        // res += " "+g;
        if (g === 'mainf') {
          res.push('บังคับ');
        } else if (g === 'mainc') {
          res.push('เลือก');
        } else if (g === 'free') {
          res.push('เสรี');
        } else {
          res.push('พื้น');
        }
      }
    });

    if (geNumbers.length > 0) {
      if (geNumbers.length == 5) {
        res.push('GE');
      } else {
        geNumbers.sort((a: number, b: number) => a - b);

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
        res.push(`GE ${ranges.join(', ')}`);
      }
    }

    if (res.length >= 3) {
      return `${group.length} กลุ่ม`;
    }

    return res.join(', ').trim();
  }
  function getDayFormat() {
    if (day.length == name_days.length) {
      return 'ทุกวัน';
    } else if (day.length >= 3) {
      return day.length + ' วัน';
    }
    const temp_day: Array<string> = [];
    day.map((d: string) => {
      temp_day.push(name_days.filter((n) => n.date_en_2 === d)[0].date_th_1);
    });
    return temp_day.join(', ');
  }

  function getTimeFormat() {
    const temp_time = time.filter((t: string) => t === t.replaceAll('-', '')).map((t: string) => t.split(':')[0]);
    return temp_time.length == 1 ? temp_time + ':00' : temp_time.join(' - ');
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 pt-3 pb-5 text-pr-gray-1 bg-gradient-to-t from-transparent via-white/50 via-20% to-white/80 to-50% sticky top-0 backdrop-blur-sm z-10">
      {subject.length == 0 && (
        <span className="flex gap-1 items-center">
          <i className="bx bxs-book text-2xl"></i>
          <p>{getGroupFormat()}</p>
        </span>
      )}
      {subject.length > 0 && (
        <span className="flex gap-1 items-center">
          <i className="bx bx-search-alt-2 text-2xl"></i>
          <p>{subject.length} วิชา</p>
        </span>
      )}
      {day.length > 0 && (
        <span className="flex gap-1 items-center">
          <i className="bx bx-calendar text-2xl"></i>
          <p>{getDayFormat()}</p>
        </span>
      )}
      {time.filter((t: string) => t === t.replaceAll('-', '')).length > 0 && !time.includes('total') && (
        <span className="flex gap-1 items-center">
          <i className="bx bx-time-five text-2xl"></i>
          <p>{getTimeFormat()}</p>
        </span>
      )}
      {room.length > 0 && (
        <span className="flex gap-1 items-center">
          <i className="bx bx-buildings text-2xl"></i>
          <p>ทั้งหมด</p>
        </span>
      )}
      {master.length > 0 && (
        <span className="flex gap-1 items-center">
          <i className="bx bx-id-card text-2xl"></i>
          <p>{master.length} คน</p>
        </span>
      )}
    </div>
  );
}
