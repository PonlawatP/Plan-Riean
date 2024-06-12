'use client';

import { CalendarContext } from '@/app/providers/CalendarProvider';
import {
  IsubjectSectDate,
  calculateScale,
  getDayIndex,
  getHourIndex,
  getSplitedData,
} from '@/app/utils/msu/subjectUtils';
import { useContext, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

export default function SubjectSelectedList(props: any) {
  const {
    getCurrentPlan,
    checkSubjectSchedule,
    checkSubjectCollapsed,
    toggleSubjectSchedule,
    getDuplicatedSubject,
    removeSubjectSchedule,
  } = useContext(CalendarContext);

  function getDateMidterm(data: any) {
    let start_time = data.exam_mid.split(' ')[2].substring(0, 5);
    let start_time_f = start_time.split(':')[0].padStart(2, '0') + ':' + start_time.split(':')[1];
    let end_time = data.exam_mid.split(' ')[4].substring(0, 5);
    let end_time_f = end_time.split(':')[0].padStart(2, '0') + ':' + end_time.split(':')[1];
    return `${start_time_f} - ${end_time_f}`;
  }

  function getDateFinal(data: any) {
    let start_time = data.exam_final.split(' ')[2].substring(0, 5);
    let start_time_f = start_time.split(':')[0].padStart(2, '0') + ':' + start_time.split(':')[1];
    let end_time = data.exam_final.split(' ')[4].substring(0, 5);
    let end_time_f = end_time.split(':')[0].padStart(2, '0') + ':' + end_time.split(':')[1];
    return `${start_time_f} - ${end_time_f}`;
  }

  const [swipetState, setSwipetState] = useState({ toggle: false, code: 'null', sec: 0, x: 0, dir: 'center' });

  // const [s, sS] = useState(false);
  // useEffect(() => {
  //   if (s) {
  //     console.log('removeSec', swipetState);
  //     sS(false);
  //     removeSubjectSchedule({ code: swipetState.code, sec: swipetState.sec });
  //     setSwipetState((prev: any) => ({ ...prev, toggle: false, code: 'null', sec: 0, x: 0, dir: 'center' }));
  //   }
  // }, [s]);

  const [currentPlanRightNow, sCRN] = useState({ ...getCurrentPlan() });
  const [currentPlanRemoved, sCR] = useState([]);

  return currentPlanRightNow.subjects.map((data: any, dind: number) => {
    const date_data = getSplitedData(data.time);
    const isDup = getDuplicatedSubject(data.code);

    const handlers = useSwipeable({
      onSwiped: (eventData) => {
        console.log(swipetState.x, data);
        if (Math.abs(swipetState.x) >= 100) {
          // sS(true);
          removeSubjectSchedule(data);
          sCR((prev: any) => {
            prev.push({ code: data.code, sec: data.sec });
            return prev;
          });
          setSwipetState((prev: any) => ({ ...prev, toggle: false, code: 'null', sec: 0, x: 0, dir: 'center' }));
          // TODO: swipe to remove data inside (error right now whytf?)
          // setTimeout(() => {
          //   sCRN((prev: any) => {
          //     // prev.push({ code: data.code, sec: data.sec });
          //     return { ...prev, subjects: prev.subjects.filter((p: any) => p.code != data.code && p.sec != data.sec) };
          //   });
          // }, 500);
        } else {
          setSwipetState((prev: any) => ({ ...prev, toggle: false, code: 'null', sec: 0, x: 0, dir: 'center' }));
        }
        // console.log('User Swiped!', eventData);
      },
      onSwiping: (e: any) => {
        // console.log('User Swiping!', e);
        setSwipetState((prev: any) => ({
          ...prev,
          toggle: true,
          code: data.code,
          sec: data.sec,
          x: e.deltaX * 0.4,
          dir: e.dir,
        }));
      },
      delta: 80, // min distance(px) before a swipe starts. *See Notes*
      preventScrollOnSwipe: true, // prevents scroll during swipe (*See Details*)
      trackTouch: true, // track touch input
      trackMouse: false, // track mouse input
      rotationAngle: 0, // set a rotation angle
      swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
      touchEventOptions: { passive: false }, // options for touch listeners (*See Details*)
    });

    return (
      <div key={dind} className="relative">
        <div
          className={`transition-all duration-300 absolute w-full h-full bg-red-200 rounded-xl border-yellow-400/90 shadow-yellow-400/40 shadow-md text-pr-dark/50 ${
            swipetState.code == data.code && swipetState.sec == data.sec && swipetState.toggle
              ? ''
              : 'scale-90 opacity-0'
          }`}
        >
          <div
            className={`relative h-full px-4 flex flex-col justify-center ${
              swipetState.x < 0 ? 'items-end' : 'items-start'
            }`}
          >
            <p>ปัดเพื่อลบ</p>
            <p>ลบเพื่อลืม</p>
          </div>
        </div>
        <div
          data-subject-code={data.code}
          data-subject-sec={data.sec}
          {...handlers}
          className={`mt-3 py-1 min-h-[5rem] rounded-xl overflow-hidden flex items-end bg-pr-bg relative border-[2px] ${
            isDup ? 'border-yellow-400/90 shadow-yellow-400/40 shadow-md' : 'border-black/10'
          } transition-transform ease-out`}
          style={
            swipetState.code == data.code && swipetState.sec == data.sec
              ? { transform: `translateX(${swipetState.x}px)` }
              : {}
          }
        >
          <span className="absolute left-0 top-0 w-full justify-between grid grid-flow-col">
            <div className="relative grid grid-flow-col grid-cols-[auto_1fr]">
              <span className="w-16 border-b-2 border-r-2 border-black/20 rounded-br-xl bg-pr-bg-3 text-white/90">
                <h3 className="text-center opacity-80">sec {data.sec}</h3>
              </span>
              {isDup ? <i className="bx bx-duplicate pl-2 pt-1" /> : null}

              {/* {data.note.trim() !== "" && data.note.includes("+") &&
                (
                  <FontAwesomeIcon className='pl-2 pt-1' icon={faLock} style={{color: "#73787e"}}/>
                )
              } */}
              <p className="text-black text-[12px] pt-1 pl-2 overflow-hidden text-ellipsis whitespace-nowrap">
                {data.code} {data['name_en']}
              </p>
            </div>
            {/* <span
              className={`pt-1 pr-2 text-sm text-right ${
                data.seat_remain > 10 ? 'text-pr-gray-1' : data.seat_remain != 0 ? 'text-orange-600' : 'text-red-700'
              }`}
            >
              {data.seat_remain}/{data.seat_available} <i className="bx bx-chair translate-y-[1px]"></i>
            </span> */}
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
                  <span className="bg-pr-bg-1 px-2 rounded-lg">
                    {data.exam_mid
                      .split(' ')[0]
                      .split('/')
                      .map((t: string, tIndex: number) => (tIndex == 2 ? t.slice(2) : t.padStart(2, '0')))
                      .join('/')}
                  </span>
                  <div className="absolute right-0">
                    <span className="bg-slate-400/30 px-2 rounded-lg">{getDateMidterm(data)}</span>
                  </div>
                </span>
              ) : null}
              {data.exam_final != null ? (
                <span className="flex gap-4 items-center pt-1 relative">
                  <span className={'bg-white px-2 rounded-lg text-center font-medium w-16'}>Final</span>
                  <span className="bg-pr-bg-1 px-2 rounded-lg">
                    {data.exam_final
                      .split(' ')[0]
                      .split('/')
                      .map((t: string, tIndex: number) => (tIndex == 2 ? t.slice(2) : t.padStart(2, '0')))
                      .join('/')}
                  </span>
                  <div className="absolute right-0">
                    <span className="bg-slate-400/30 px-2 rounded-lg">{getDateFinal(data)}</span>
                  </div>
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  });
}
