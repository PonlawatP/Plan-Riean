import { CalendarContext, CalendarFilterContext } from '@/app/providers/CalendarProvider';
import { useContext, useEffect, useState } from 'react';
import FilterPreview from './filterPreview';
import { isMobile } from 'react-device-detect';
import PRSubjectFilter from '../PRSubjectFilter';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default function PRSubjectSelector(props: any) {
  const { isShowDialog, children } = props;
  const { viewSchedule, viewFilter, setViewFilter, topbarToggle, calsel_data, toggleSidebar, setTooggleSidebar } =
    useContext(CalendarContext);
  const { fnHandleClickedOnCalendar, closeAllViewFilter, countingRefresh } = useContext(CalendarFilterContext);

  const { updated, isLoading, isError } = calsel_data;

  function handleFilterPanel() {
    setViewFilter(!viewFilter);

    closeAllViewFilter();
  }

  const [tempOn, setTempOn] = useState(false);
  useEffect(() => {
    if (viewSchedule) {
      setTempOn(viewSchedule);
    } else {
      setTimeout(() => {
        setTempOn(false);
      }, 150);
    }
  }, [viewSchedule]);

  return (
    <>
      <section
        className={`pr-subject-select smooth-all absolute md:p-8 w-full md:w-auto h-full grid ${
          !viewSchedule
            ? 'opacity-0 translate-y-10 md:translate-y-0 md:-translate-x-10 invisible'
            : topbarToggle.init
            ? 'opacity-20'
            : ''
        }`}
      >
        {viewSchedule || tempOn ? (
          <div className="pr-subject-select-body relative grid grid-rows-[auto_1fr] md:w-[450px] h-full overflow-auto p-1 pb-0 rounded-t-3xl lg:rounded-b-3xl border-[1px] border-pr-bg-1 bg-white/90">
            {/* header */}
            <section className="pr-subject-header flex justify-between p-2 py-3 border-b-[1px] border-slate-400/50">
              <div className="flex gap-2 items-center font-semibold text-xl">
                <button
                  onClick={() => {
                    fnHandleClickedOnCalendar(-1, -1, false);
                  }}
                  className="hover:bg-pr-bg active:bg-slate-300 rounded-lg aspect-square w-10"
                >
                  <i className={`bx ${isMobile ? 'bx-x' : 'bx-chevron-left'}  text-3xl translate-y-[2px]`}></i>
                </button>
                <div className="">
                  <h1>เลือกรายวิชา</h1>
                  {updated === 'null' ? null : (
                    <div className="text-sm font-normal text-pr-gray-1 flex gap-2">
                      <div className="smooth-all h-5 w-5">
                        <CircularProgressbar
                          value={countingRefresh}
                          strokeWidth={15}
                          maxValue={Number.parseInt(process.env.NEXT_PUBLIC_REFRESH_INTERVAL as string) * 1000}
                          styles={buildStyles({
                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 0.5,

                            // Colors
                            pathColor: `#0075F7`,
                            textColor: '#f88',
                            trailColor: '#CACFD9',
                            backgroundColor: '#3e98c7',
                          })}
                        />
                      </div>{' '}
                      <p>{updated}</p>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={handleFilterPanel}
                className={`h-fit px-2 py-1 mr-2 rounded-lg ${
                  viewFilter
                    ? 'text-white/80 bg-pr-bg-3 border-b-[3px] border-slate-600/50 hover:bg-slate-600 active:border-0 active:bg-slate-600 active:text-white/80'
                    : 'text-pr-text-menu bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80'
                }`}
              >
                <i className="bx bx-layer text-xl translate-y-[3px] mr-1"></i> คัดกรอง
              </button>
            </section>
            {/* content */}
            <section className="pr-subject-content relative h-full overflow-auto pb-4">
              {isShowDialog ? <FilterPreview /> : null}
              {children}
            </section>
          </div>
        ) : null}
      </section>
      <PRSubjectFilter />
    </>
  );
}
