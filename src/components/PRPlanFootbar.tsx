import { CalendarContext, CalendarFilterContext } from '@/app/providers/CalendarProvider';
import { useContext } from 'react';

export default function PRPlanFootbar(props: any) {
  const { handleOpenSubjectSelect, closeAllViewFilter } = useContext(CalendarFilterContext);
  const { viewSchedule, viewSummary, setViewState, setViewSummary, setViewFilter, toggleSummaryZone } =
    useContext(CalendarContext);
  return (
    <div className="md:hidden w-full h-14 bg-white overflow-hidden rounded-t-lg text-pr-gray-1 grid grid-cols-3">
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
      </button>
    </div>
  );
}
