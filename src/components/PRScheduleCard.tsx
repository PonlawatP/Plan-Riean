import { k2dfont } from '@/app/layout/planlayout';
import { CalendarContext } from '@/app/providers/CalendarProvider';
import { calculateScale, getColorCode, getTimeRange } from '@/app/utils/msu/subjectUtils';
import { useContext } from 'react';

export default function ScheduleCard(props: any) {
  const { data, time } = props;
  const { viewSchedule, viewSummary, removeSubjectSchedule } = useContext(CalendarContext);
  // const [clicked, setClicked] = useState(false);

  function fnHandleClickedOnScheduleCard(data: any) {
    // setClicked(!clicked)
    if (!viewSchedule && !viewSummary) {
      removeSubjectSchedule(data);
    }
  }

  return (
    <div className={`absolute top-0 w-full h-full ${viewSchedule || viewSummary ? 'pointer-events-none' : ''}`}>
      <div
        className={`relative h-full z-40 p-2 text-[13px] font-normal group`}
        style={{ width: calculateScale(time) * 100 + '%' }}
      >
        <div
          onMouseDown={() => {
            fnHandleClickedOnScheduleCard(data);
          }}
          onClick={() => {
            fnHandleClickedOnScheduleCard(data);
          }}
          className={`z-10 relative group/suj cursor-pointer rounded-lg overflow-hidden border-2 ${
            data.code.startsWith('00') ? 'border-white/25' : 'border-black/10'
          } h-full w-full p-1 text-center shadow-md text-pr-dark hover:text-white/95 ${getColorCode(
            data.code,
          )} transition-all duration-200`}
        >
          {!data.code.startsWith('00') ? (
            <>
              <span
                className={`absolute w-10 h-10 bottom-1/2 left-0 transition-all duration-200 -translate-x-[40%] group-hover/suj:-translate-x-[50%] rounded-full drop-shadow-pr-shadow-text ${getColorCode(
                  data.code,
                  true,
                )}`}
              ></span>
              <span
                className={`absolute w-10 h-10 top-1/2 right-0 transition-all duration-200 translate-x-[30%] group-hover/suj:translate-x-[40%] rounded-full drop-shadow-pr-shadow-text ${getColorCode(
                  data.code,
                  true,
                )}`}
              ></span>
            </>
          ) : null}
          <p className="">
            ({data.credit.split(' ')[0].trim()}) {data.code} sec {data.sec}
          </p>
          <p className="">{getTimeRange(time)}</p>
        </div>
      </div>
    </div>
  );
}
