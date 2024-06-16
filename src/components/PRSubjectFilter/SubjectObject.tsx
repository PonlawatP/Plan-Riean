import { CalendarFilterContext } from '@/app/providers/CalendarProvider';
import { getSubjectColor } from '@/app/utils/msu/subjectUtils';
import { useContext } from 'react';

export default function SubjectObject(props: any) {
  const { code = '0000000', title = 'title', desc = 'subtitle' } = props;

  const { SubjectFilterTogglePRC, isSubjectFilterOn } = useContext(CalendarFilterContext);
  const isActive = isSubjectFilterOn(code);
  const colors = getSubjectColor(code);

  return (
    <button
      onClickCapture={() => SubjectFilterTogglePRC(code)}
      className={`px-2 py-1 group w-full border-b-[1px] bg-white`}
    >
      <div
        className={`px-3 py-1 rounded-lg flex gap-2 ${
          isActive
            ? 'bg-green-200 group-hover:bg-green-100 group-active:bg-green-300'
            : 'group-hover:bg-black/10 group-active:bg-pr-bg-3'
        }`}
      >
        {code !== '0000000' ? (
          <div className="flex items-center gap-2 h-min">
            <i className={`bx bxs-circle ${colors.iconColor}`}></i>
            <span className={`px-2 rounded-lg ${colors.color} ${colors.bgColor}`}>{code}</span>
          </div>
        ) : null}
        <span className={`text-left ${isActive ? '' : 'group-active:text-white'}`}>
          {title !== 'title' ? <p>{title}</p> : null}
          {desc != null && desc !== 'subtitle' ? (
            <p className={`text-sm text-pr-gray-1 ${isActive ? '' : 'group-active:text-white/70'}`}>{desc}</p>
          ) : null}
        </span>
      </div>
    </button>
  );
}
