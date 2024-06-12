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
import { isMobile } from 'react-device-detect';

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

  const [swipeStates, setSwipeStates] = useState<any>([]);
  const [currentPlan, setCurrentPlan] = useState<any>({ ...getCurrentPlan() });
  const [currentPlanRemoved, setCurrentPlanRemoved] = useState<any[]>([]);

  // useEffect(() => {
  //   if (currentPlanRemoved.length === 0) return;

  //   const removedItem = currentPlanRemoved[0];
  //   removeSubjectSchedule(removedItem);
  // }, [currentPlanRemoved]);

  useEffect(() => {
    setSwipeStates(
      getCurrentPlan().subjects.map((data: any) => ({
        toggle: false,
        code: data.code,
        sec: data.sec,
        x: 0,
        dir: 'center',
      })),
    );
  }, [getCurrentPlan]);

  const UseSwipedHandlers = (data: any) => {
    const t = useSwipeable({
      onSwiped: (eventData) => {
        const elem = swipeStates.filter((state: any) => state.code === data.code && state.sec === data.sec)[0].x;
        if (Math.abs(elem) >= 100) {
          setCurrentPlanRemoved((prev) => [...prev, data]);
          removeSubjectSchedule(data);
          setSwipeStates((prev: any) =>
            prev.map((state: any) =>
              state.code === data.code && state.sec === data.sec ? { ...state, toggle: false, x: 0 } : state,
            ),
          );
        } else {
          setSwipeStates((prev: any) =>
            prev.map((state: any) =>
              state.code === data.code && state.sec === data.sec ? { ...state, toggle: false, x: 0 } : state,
            ),
          );
        }
      },
      onSwiping: (e: any) => {
        setSwipeStates((prev: any) =>
          prev.map((state: any) =>
            state.code === data.code && state.sec === data.sec ? { ...state, toggle: true, x: e.deltaX * 0.4 } : state,
          ),
        );
      },
      delta: 80,
      preventScrollOnSwipe: true,
      trackTouch: true,
      trackMouse: false,
      rotationAngle: 0,
      swipeDuration: Infinity,
      touchEventOptions: { passive: false },
    });
    return t;
  };

  return currentPlan.subjects.map((data: any, dind: number) => {
    const date_data = getSplitedData(data.time);
    const isDup = getDuplicatedSubject(data.code);

    const incommingRemoving =
      currentPlanRemoved.filter((c: any) => c.code == data.code && c.sec == data.sec).length > 0;

    const swipeState = swipeStates.find((state: any) => state.code === data.code && state.sec === data.sec);

    return (
      <div
        key={dind}
        className={`relative group transition-all duration-300 ${incommingRemoving ? 'opacity-0 scale-0 h-0' : ''}`}
      >
        <div
          className={`pr-subject-object transition-all duration-300 absolute w-full h-full bg-red-200 rounded-xl border-yellow-400/90 shadow-yellow-400/40 shadow-md text-pr-dark/50 ${
            swipeState && swipeState.toggle ? '' : 'scale-90 opacity-0'
          }`}
        >
          <div
            className={`relative w-full h-full px-4 flex flex-col justify-center transition-all duration-300 ${
              swipeState && swipeState.x < 0 ? 'items-end' : 'items-start'
            } ${swipeState && Math.abs(swipeState.x) < 100 ? 'translate-y-2' : 'translate-y-0'}`}
          >
            <div className="relative w-fit flex flex-col justify-center items-center">
              <p>ปัดเพื่อลบ</p>
              <p className={`transition-all ${swipeState && Math.abs(swipeState.x) < 100 ? 'opacity-0' : ''}`}>
                ลบเพื่อลืม
              </p>
              <div
                className={`absolute ${
                  swipeState && swipeState.x < 0 ? '-right-2' : '-left-2'
                } flex justify-center transition-opacity mt-2 text-lg ${
                  swipeState && Math.abs(swipeState.x) >= 100 ? 'opacity-0' : ''
                }`}
                style={
                  swipeState
                    ? {
                        transform: `translateX(${Math.abs(swipeState.x) >= 100 ? swipeState.x : swipeState.x * 0.4}px)`,
                        opacity: `${Math.abs(swipeState.x) * 3.5}%`,
                      }
                    : {}
                }
              >
                <i className={`bx bx-${swipeState && swipeState.x < 0 ? 'left' : 'right'}-arrow-alt`}></i>
              </div>
              <div
                className={`w-full relative flex justify-center transition-all ${
                  swipeState && Math.abs(swipeState.x) < 100 ? 'opacity-0 translate-y-2' : 'translate-y-0'
                }`}
              >
                <i className="bx bx-trash"></i>
              </div>
            </div>
          </div>
        </div>
        <div
          // data-subject-code={data.code}
          // data-subject-sec={data.sec}
          {...UseSwipedHandlers(data)}
          // onClick={() => {
          //   removeSubjectSchedule(data);
          // }}
          className={`${
            incommingRemoving ? 'mt-0' : 'mt-3'
          } py-1 min-h-[5rem] rounded-xl overflow-hidden flex items-end bg-pr-bg relative border-[2px] ${
            isDup ? 'border-yellow-400/90 shadow-yellow-400/40 shadow-md' : 'border-black/10'
          } transition-transform ease-out`}
          style={swipeState ? { transform: `translateX(${swipeState.x}px)` } : {}}
        >
          <span className="absolute left-0 top-0 w-full justify-between grid grid-flow-col">
            <div className="relative grid grid-flow-col grid-cols-[auto_1fr]">
              <span className="w-16 border-b-2 border-r-2 border-black/20 rounded-tl-[10px] rounded-br-xl bg-pr-bg-3 text-white/90">
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
        {isMobile ? null : (
          <button
            onClick={() => {
              setCurrentPlanRemoved((prev) => [...prev, data]);
              removeSubjectSchedule(data);
            }}
            className="pr-subject-remove transition-all ease-pr-bounce scale-0 group-hover:scale-100 absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white drop-shadow-pr-shadow-text flex justify-center items-center rounded-full"
          >
            <i className="bx bx-x"></i>
          </button>
        )}
      </div>
    );
  });
}
