import { CalendarContext, CalendarFilterContext } from '@/app/providers/CalendarProvider';
import { time } from 'console';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import ScheduleCard from './PRScheduleCard';
import { getDayIndex, getHourIndex, getSplitedData } from '@/app/utils/msu/subjectUtils';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useBreakpoint } from '@/app/utils/useBreakpoint';
import { isMobile } from 'react-device-detect';

export const name_days = [
  {
    date_th: 'จันทร์',
    date_th_1: 'จ',
    date_en_3: 'Mon',
    date_en_2: 'Mo',
    date_en_1: 'M',
  },
  {
    date_th: 'อังคาร',
    date_th_1: 'อ',
    date_en_3: 'Tue',
    date_en_2: 'Tu',
    date_en_1: 't',
  },
  {
    date_th: 'พุธ',
    date_th_1: 'พ',
    date_en_3: 'Wed',
    date_en_2: 'We',
    date_en_1: 'W',
  },
  {
    date_th: 'พฤหัสฯ',
    date_th_1: 'พฤ',
    date_en_3: 'Thu',
    date_en_2: 'Th',
    date_en_1: 'Th',
  },
  {
    date_th: 'ศุกร์',
    date_th_1: 'ศ',
    date_en_3: 'Fri',
    date_en_2: 'Fr',
    date_en_1: 'F',
  },
];

export default function PRCalendarSubject(props: any) {
  const {
    webReady,
    viewSchedule,
    topbarToggle,
    setTopbarToggle,
    setTopbarHtml,
    toggleHold,
    setTooggleHold,
    planWidth,
    planSize,
    resizePlan,
    canvasElemRef,
    planElemRef,
    focusTime,
    setFocusTime,
    getTimeTable,
    MAX_SUBJECT_TIME,
    setMAX_SUBJECT_TIME,
    toggleSidebar,
    getCurrentPlan,
  } = useContext(CalendarContext);

  const { fnHandleClickedOnCalendar, handleReleaceHoldClick, pinch_ref } = useContext(CalendarFilterContext);

  const memoizedTimeTable = useMemo(() => getTimeTable(MAX_SUBJECT_TIME), [MAX_SUBJECT_TIME, getTimeTable]);

  useEffect(() => {
    const canvasElem = document.querySelector('.p-canvas-plan');
    const planElem = document.querySelector('.p-planmain');

    if (canvasElem && canvasElem instanceof HTMLElement && planElem && planElem instanceof HTMLElement) {
      canvasElemRef.current = canvasElem;
      planElemRef.current = planElem;
    }

    resizePlan();
  }, [canvasElemRef, planElemRef, resizePlan]);

  useEffect(() => {
    window.addEventListener('resize', resizePlan);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', resizePlan);
    };
  });

  function getRangeTimeFormat(start_time: number, end_time: number, short_start = false) {
    if (short_start) {
      return start_time == end_time
        ? start_time.toString().padStart(2, '0') + ' - ' + (end_time + 1).toString().padStart(2, '0')
        : start_time > end_time
        ? end_time.toString().padStart(2, '0') + ':00 - ' + (start_time + 1).toString().padStart(2, '0') + ':00'
        : start_time.toString().padStart(2, '0') + ':00 - ' + (end_time + 1).toString().padStart(2, '0') + ':00';
    }

    return start_time == end_time
      ? start_time.toString().padStart(2, '0') + ':00 - ' + (end_time + 1).toString().padStart(2, '0') + ':00'
      : start_time > end_time
      ? end_time.toString().padStart(2, '0') + ':00 - ' + (start_time + 1).toString().padStart(2, '0') + ':00'
      : start_time.toString().padStart(2, '0') + ':00 - ' + (end_time + 1).toString().padStart(2, '0') + ':00';
  }

  function handleDragToSelectPlanTime(e: any, touched = false) {
    let target = e.target as HTMLElement | null;

    if (touched) {
      let event = e.changedTouches[0];
      var touchElement = document.elementFromPoint(event.clientX, event.clientY);
      // console.log(secondElement?.id || undefined)
      target = touchElement as HTMLElement | null;
    } else {
      target = e.target as HTMLElement | null;
    }

    const id = target?.id;
    if (id !== undefined) {
      const time = parseInt(id.split('-')[1]);
      const dayindex = parseInt(id.split('-')[2]);
      if (!Number.isNaN(time) && !Number.isNaN(dayindex)) {
        if (topbarToggle.pre && focusTime.start_time != time) {
          setTopbarToggle({ pre: false, init: true });
          clearTimeout(toggleHold);
        }

        setFocusTime({ ...focusTime, end_time: time });
        if (!topbarToggle.pre) {
          setTopbarHtml(
            <>
              <p>วัน{name_days[focusTime.day].date_th}</p>
              <p>{getRangeTimeFormat(focusTime.start_time, focusTime.end_time)}</p>
            </>,
          );
        }
      }
    }
  }

  function handleHoldClick(e: any, dindex: number, t: number) {
    setTooggleHold(
      setTimeout(() => {
        // feat: pinch & pan plan ratio
        // it counting per tick while moving plan. so if it not gather than 5 = not meant to filter => just ignore it
        if (isMobile) {
          if (pinch_ref.current.sad > 2) return;

          pinch_ref.current.instance.setup.disabled = true;
          pinch_ref.current.instance.setup.panning.disabled = true;
        }
        setFocusTime({ day: dindex, start_time: t, end_time: t });
        setTopbarHtml(
          <>
            <p>กดค้างไว้</p>
            <p>เพื่อค้นหาตามเวลา</p>
          </>,
        );
        setTopbarToggle({ pre: true, init: false });
        clearTimeout(toggleHold);

        setTooggleHold(
          setTimeout(() => {
            setTopbarToggle({ pre: false, init: true });

            clearTimeout(toggleHold);
          }, 500),
        );
      }, 150),
    );
  }

  return (
    <TransformWrapper
      ref={pinch_ref}
      disabled={!isMobile}
      panning={{ disabled: !isMobile }}
      onPanning={(e) => {
        // console.log('test', e.instance);
        pinch_ref.current.sad = pinch_ref.current.sad == undefined ? 1 : pinch_ref.current.sad + 1;
        // console.log(pinch_ref.current.sad);
      }}
      onPanningStop={(e) => {
        setTimeout(() => {
          pinch_ref.current.sad = 0;
          // console.log(pinch_ref.current.sad);
        }, 100);
      }}
      onPinching={(e) => {
        // console.log('test', e.instance);
        pinch_ref.current.sad = pinch_ref.current.sad == undefined ? 1 : pinch_ref.current.sad + 1;
        // console.log(pinch_ref.current.sad);
      }}
      onPinchingStop={(e) => {
        setTimeout(() => {
          pinch_ref.current.sad = 0;
          // console.log(pinch_ref.current.sad);
        }, 100);
      }}
    >
      <TransformComponent
        contentStyle={{ width: '100%', height: '100%' }}
        wrapperStyle={{ width: '100%', height: '100%' }}
      >
        <div className="w-full h-full relative flex flex-col items-center">
          <div
            className={`
      p-canvas-plan relative w-11/12 h-full ${toggleSidebar ? '' : ''} md:ml-0 flex justify-center items-center
    `}
          >
            {/* plan component (schedule & detail) right here */}
            <div
              className="absolute flex flex-col gap-8 items-center"
              style={{ width: planWidth > 0 ? planWidth + 'px' : undefined }}
            >
              {/* main schedule */}
              <div
                className="p-planmain select-none smooth-all min-w-[4rem] min-h-[4rem] bg-white/60 border-2 border-white/80 text-black/30 font-medium rounded-2xl overflow-clip shadow-xl"
                style={{ scale: planSize.toString() }}
                onMouseMove={handleDragToSelectPlanTime}
                onTouchMove={(e) => {
                  handleDragToSelectPlanTime(e, true);
                }}
              >
                {/* row for timer */}
                <span className="grid grid-flow-col">
                  <span className="w-16 bg-pr-msu-1 border-b-2 border-black/10"></span>
                  {memoizedTimeTable.map((t: number, tindex: number) => (
                    <span
                      key={`pr-time-${tindex}`}
                      className="bg-pr-msu-1 w-20 p-2 border-2 border-t-0 border-r-0 border-black/10"
                    >
                      {t.toString().padStart(2, '0')}:00
                    </span>
                  ))}
                </span>
                {/* loop row from days */}
                {name_days.map((day, dindex) => (
                  // row element
                  <span key={`pr-day-${day.date_en_1}`} className="grid grid-flow-col">
                    {/* day element */}
                    <span
                      className={`w-16 bg-pr-msu-2 ${
                        dindex != name_days.length - 1 ? 'border-b-2' : ''
                      } border-black/10 flex items-center text-white`}
                    >
                      <p className="ml-3">{day.date_en_3}</p>
                    </span>
                    {/* loop schedule from timetable */}
                    {memoizedTimeTable.map((t: number, tindex: number) => (
                      <span key={`pr-day-${day.date_en_1}-${t}`} className="relative">
                        <span
                          id={'plan-' + t.toString().padStart(2, '0') + '-' + dindex}
                          className={`block w-20 h-16 p-2 border-l-2 ${
                            dindex != name_days.length - 1 && tindex != 4 ? 'border-b-2' : ''
                          } border-black/10 group text-black/10`}
                          onMouseUp={handleReleaceHoldClick}
                          onTouchEnd={handleReleaceHoldClick}
                        ></span>

                        {/* hover to guide user clicked */}
                        {tindex != 4 ? (
                          <span
                            className={`pr-hover-toclick group absolute select-none cursor-pointer left-0 top-0 w-[100%] h-full flex justify-center items-center z-10`}
                            id={'planhover-' + t.toString().padStart(2, '0') + '-' + dindex}
                            onMouseDown={(e) => {
                              handleHoldClick(e, dindex, t);
                            }}
                            onMouseUp={handleReleaceHoldClick}
                            onTouchStart={(e) => {
                              handleHoldClick(e, dindex, t);
                            }}
                            onTouchEnd={handleReleaceHoldClick}
                            onClick={() => fnHandleClickedOnCalendar(tindex, dindex)}
                          >
                            <span
                              className={`smooth-opacity opacity-0 ${
                                !topbarToggle.init && !viewSchedule ? 'group-hover:opacity-100' : ''
                              } relative rounded-lg text-sm w-11/12 h-5/6 bg-black/40 text-white/80 flex justify-center items-center`}
                              id={'planhover-' + t.toString().padStart(2, '0') + '-' + dindex}
                            >
                              ดูรายวิชา
                            </span>
                          </span>
                        ) : null}
                        {/* TODO: badge of subjects here */}
                        {getCurrentPlan().subjects.map((data: any, dataindex: any) => {
                          return getSplitedData(data.time).map((split_date, spindex) => {
                            return dindex == getDayIndex(split_date.fullDate) &&
                              tindex == getHourIndex(split_date.fullDate) ? (
                              <ScheduleCard
                                position={{ x: tindex, y: dindex }}
                                key={`d-${dataindex}:${spindex}`}
                                data={data}
                                time={split_date.fullDate}
                              />
                            ) : null;
                          });
                        })}

                        {/* hover when user drag clicked */}
                        {dindex === focusTime.day && t === focusTime.start_time ? (
                          <span
                            className={`pr-hover-dragged smooth-all pointer-events-none select-none absolute h-full flex justify-center items-center top-0 z-50`}
                            style={{
                              width:
                                (focusTime.start_time > focusTime.end_time
                                  ? (focusTime.start_time - focusTime.end_time + 1) * 100
                                  : (focusTime.end_time - focusTime.start_time + 1) * 100) + '%',
                              left:
                                (focusTime.start_time > focusTime.end_time
                                  ? (focusTime.end_time - focusTime.start_time) * 100
                                  : 0) + '%',
                            }}
                          >
                            <span
                              className={`smooth-opacity pr-border-dotspace ${
                                !topbarToggle.init ? 'opacity-0' : ''
                              } pointer-events-none select-none relative rounded-lg text-sm w-[calc(100%-10px)] h-5/6 bg-black/60 text-white/80 flex justify-center items-center`}
                            >
                              {getRangeTimeFormat(focusTime.start_time, focusTime.end_time, true)}
                            </span>
                          </span>
                        ) : null}
                      </span>
                    ))}
                  </span>
                ))}
              </div>

              {/* summary plan detail */}
              <span
                className={`pr-plandetail select-none smooth-all flex w-full justify-between text-black/40 smooth-opacity ${
                  topbarToggle.init ? 'opacity-20' : 'opacity-100'
                }`}
                style={{ transform: `translateY(${(1 - planSize) * -200}px)` }}
              >
                <div className="flex gap-10">
                  <span>{getCurrentPlan().subjects.length} วิชา</span>
                  <span>
                    {getCurrentPlan()
                      .subjects.map((s: any) => Number.parseInt(s.credit.split(' ')[0]))
                      .reduce((a: number, b: number) => a + b, 0)}{' '}
                    หน่วยกิต
                  </span>
                </div>

                {/* action button */}
                <span
                  className={`pr-planaction flex gap-4 text-black/30 smooth-opacity ${
                    topbarToggle.init ? 'opacity-20' : 'opacity-100'
                  }`}
                >
                  {/* TODO: download function */}
                  {/* <button id="plan-download" aria-label="plan-download" className="hover:text-black/60">
                <i className="text-2xl bx bx-download"></i>
              </button> */}
                  {/* TODO: share function */}
                  {/* <button id="plan-share" aria-label="plan-share" className="hover:text-black/60">
                <i className="text-2xl bx bx-share"></i>
              </button> */}
                </span>
              </span>
            </div>
          </div>
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}
