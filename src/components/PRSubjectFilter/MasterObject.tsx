import { CalendarFilterContext } from '@/app/providers/CalendarProvider';
import { getSubjectColor } from '@/app/utils/msu/subjectUtils';
import { useContext } from 'react';

export default function MasterObject(props: any) {
  const { profile = '', name = 'Name Surname', other_name = '' } = props;

  const { MasterFilterTogglePRC, isMasterFilterOn } = useContext(CalendarFilterContext);
  const isActive = isMasterFilterOn(name);

  return (
    <div className={`px-2 py-1 w-full border-b-[1px] group`}>
      <button
        onClickCapture={() => MasterFilterTogglePRC(name)}
        className={`group w-full px-3 py-1 ${
          other_name === '' ? 'min-h-[2.3rem]' : 'min-h-[3.3rem]'
        } rounded-lg flex flex-col justify-center ${
          isActive
            ? 'bg-green-200 group-hover:bg-green-100 group-active:bg-green-300'
            : 'group-hover:bg-black/10 group-active:bg-pr-bg-3 group-active:text-white'
        }`}
      >
        <p>{name}</p>
        {other_name === '' ? null : (
          <p className={`text-sm text-pr-gray-1 ${isActive ? '' : 'group-active:text-white/70'}`}>{other_name}</p>
        )}
      </button>
    </div>
  );
}
