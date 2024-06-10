'use client';

import { CalendarContext } from '@/app/providers/CalendarProvider';
import {
  IsubjectSectDate,
  calculateScale,
  getDayIndex,
  getHourIndex,
  getSplitedData,
} from '@/app/utils/msu/subjectUtils';
import { useContext, useState } from 'react';

export default function SubjectSelectedList(props: any) {
  const { getCurrentPlan, checkSubjectSchedule, checkSubjectCollapsed, toggleSubjectSchedule } =
    useContext(CalendarContext);

  return getCurrentPlan().subjects.map((data: any, dind: number) => {
    const date_data = getSplitedData(data.time);
    return (
      <div
        key={dind}
        className={`mt-3 py-1 min-h-[5rem] rounded-xl overflow-hidden flex items-end bg-pr-bg relative border-[2px] cursor-pointer border-black/10`}
      >
        <span className="absolute left-0 top-0 w-full justify-between grid grid-flow-col">
          <div className="relative grid grid-flow-col grid-cols-[auto_1fr]">
            <span className="w-16 border-b-2 border-r-2 border-black/20 rounded-br-xl bg-pr-bg-3 text-white/90">
              <h3 className="text-center opacity-80">sec {data.sec}</h3>
            </span>
            {/* {data.note.trim() !== "" && data.note.includes("+") &&
                (
                  <FontAwesomeIcon className='pl-2 pt-1' icon={faLock} style={{color: "#73787e"}}/>
                )
              } */}
            <p className="text-black text-[12px] pt-1 pl-2 overflow-hidden text-ellipsis whitespace-nowrap">
              {data.code} {data['name_en']}
            </p>
          </div>
          <span
            className={`pt-1 pr-2 text-sm text-right ${
              data.seat_remain > 10 ? 'text-pr-gray-1' : data.seat_remain != 0 ? 'text-orange-600' : 'text-red-700'
            }`}
          >
            {data.seat_remain}/{data.seat_available} <i className="bx bx-chair translate-y-[1px]"></i>
          </span>
        </span>
        <div className="pt-[1.8rem] pb-1 px-2 w-full text-sm">
          {data.note != undefined && data.note.trim() !== '' && (
            <p className="text-pr-gray-1 text-[10px]">{data.note.trim()}</p>
          )}
          {data.lecturer.split(' / ').map((lect: any, lindex: any) => (
            <p key={lindex} className="text-pr-gray-1">
              {lect}
            </p>
          ))}
          <div className="">
            {date_data.map((date, dateindex) => (
              <span key={dateindex} className="flex gap-4 items-center pt-1 relative">
                <span className={date.dayColor + ' px-2 rounded-lg text-center w-16'}>{date.dayName}</span>
                <span className="bg-pr-bg-1 px-2 rounded-lg">
                  {date.from} - {date.to}
                </span>
                <div className="absolute right-0">
                  <span className="bg-slate-400/30 px-2 rounded-lg">{date.room}</span>
                </div>
              </span>
            ))}
          </div>
          <div className="pt-1">
            {data.exam_mid != null ? (
              <span className="flex gap-4 items-center pt-1 relative">
                <span className={'bg-white px-2 rounded-lg text-center font-medium w-16'}>Mid</span>
                <span className="bg-pr-bg-1 px-2 rounded-lg">{data.exam_mid.split(' ')[0]}</span>
                <div className="absolute right-0">
                  <span className="bg-slate-400/30 px-2 rounded-lg">
                    {data.exam_mid.split(' ')[2].substring(0, 5)} - {data.exam_mid.split(' ')[4].substring(0, 5)}
                  </span>
                </div>
              </span>
            ) : null}
            {data.exam_final != null ? (
              <span className="flex gap-4 items-center pt-1 relative">
                <span className={'bg-white px-2 rounded-lg text-center font-medium w-16'}>Final</span>
                <span className="bg-pr-bg-1 px-2 rounded-lg">{data.exam_final.split(' ')[0]}</span>
                <div className="absolute right-0">
                  <span className="bg-slate-400/30 px-2 rounded-lg">
                    {data.exam_final.split(' ')[2].substring(0, 5)} - {data.exam_final.split(' ')[4].substring(0, 5)}
                  </span>
                </div>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  });
}
