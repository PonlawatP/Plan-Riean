import { CalendarContext, CalendarFilterContext } from '@/app/providers/CalendarProvider';
import { useContext } from 'react';
import { useRouter } from 'next/router';

export default function PRPlanFootbar(props: any) {
  const { handleOpenSubjectSelect, closeAllViewFilter } = useContext(CalendarFilterContext);
  const { viewSchedule, viewSummary, setViewState, setViewSummary, setViewFilter, toggleSummaryZone, createNewPlan } =
    useContext(CalendarContext);

  const redirect = useRouter();
  function getBarActive(path = '', icon = false) {
    // console.log(path, redirect.pathname, path == redirect.pathname);
    const act = path == redirect.pathname;
    if (icon) {
      return act ? 'drop-shadow-pr-shadow-text' : 'group-hover:drop-shadow-pr-shadow-text';
    } else {
      return act ? 'bg-pr-msu-1 text-pr-msu-2' : 'hover:bg-pr-msu-1 text-pr-msu-2';
    }
  }
  return (
    <div className={`md:hidden w-full h-14 bg-white overflow-hidden rounded-t-lg text-pr-gray-1 grid grid-cols-3`}>
      {redirect.pathname != '/plan/[plan_id]' ? (
        <>
          <button
            onClick={() => {
              setViewState(false);
              setViewFilter(false);
              setViewSummary(false);
              closeAllViewFilter();
            }}
            className={`relative border-b-[1px] border-white`}
          >
            <i className={`bx bx-home text-2xl`} />
            <p className="-mt-1 text-xs text-black/50">หน้าหลัก</p>
          </button>
          <button
            onClick={() => {
              createNewPlan();
            }}
            className={`bg-pr-msu-1 text-pr-msu-2 relative border-b-[1px] border-white rounded-t-3xl`}
          >
            <i className={`bx bx-plus text-2xl`} />
            <p className="-mt-1 text-xs text-black/50">สร้างแผนใหม่</p>
          </button>
          <button
            onClick={() => {
              // TODO: subjects mapping
            }}
            className={`${
              !viewSchedule && viewSummary ? 'bg-pr-msu-1 text-pr-msu-2' : ''
            }relative border-b-[1px] border-white`}
          >
            <i className={`bx bx-git-repo-forked rotate-90 text-2xl`} />
            <p className="-mt-1 text-xs text-black/50">แผนเปิดรายวิชา</p>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setViewState(false);
              setViewFilter(false);
              setViewSummary(false);
              closeAllViewFilter();
            }}
            className={`${
              !viewSchedule && !viewSummary ? 'bg-pr-msu-1 text-pr-msu-2' : ''
            } relative border-b-[1px] border-white after:block after:contents-[''] after:bg-pr-bg after:top-1/2 after:-translate-y-1/2 after:right-0 after:w-[1px] after:h-3/5 after:absolute`}
          >
            <i className={`bx bx-calendar text-2xl`} />
            <p className="-mt-1 text-xs text-black/50">ตารางเรียน</p>
          </button>
          <button
            onClick={() => {
              setViewSummary(false);
              handleOpenSubjectSelect();
            }}
            className={`${
              viewSchedule && !viewSummary ? 'bg-pr-msu-1 text-pr-msu-2' : ''
            } relative border-b-[1px] border-white after:block after:contents-[''] after:bg-pr-bg after:top-1/2 after:-translate-y-1/2 after:right-0 after:w-[1px] after:h-3/5 after:absolute`}
          >
            <i className={`bx bx-objects-horizontal-left text-2xl`} />
            <p className="-mt-1 text-xs text-black/50">เลือกรายวิชา</p>
          </button>
          <button
            onClick={() => {
              toggleSummaryZone(true);
              closeAllViewFilter();
            }}
            className={`${
              !viewSchedule && viewSummary ? 'bg-pr-msu-1 text-pr-msu-2' : ''
            }relative border-b-[1px] border-white after:block after:contents-[''] after:bg-pr-bg after:top-1/2 after:-translate-y-1/2 after:right-0 after:w-[1px] after:h-3/5 after:absolute`}
          >
            <i className={`bx bx-task text-2xl`} />
            <p className="-mt-1 text-xs text-black/50">สรุปตารางเรียน</p>
          </button>
        </>
      )}
    </div>
  );
}
