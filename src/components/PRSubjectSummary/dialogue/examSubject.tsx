import { CalendarContext } from '@/app/providers/CalendarProvider';
import React, { useContext } from 'react';

const ExamSubject = React.forwardRef((props, ref: any) => {
  const { getCurrentPlan, getDuplicatedSubject } = useContext(CalendarContext);

  return (
    <table ref={ref} className="border-collapse table-auto w-full my-4">
      <thead className="">
        <tr>
          <th className="border-b font-medium p-4 pl-4 pt-0 pb-3 text-left">รายวิชา</th>
          <th className="border-b font-medium p-4 pt-0 pb-3 text-left">กลุ่มที่เรียน</th>
        </tr>
      </thead>
      <tbody className="">
        {getCurrentPlan().subjects.map((m: any, mIndex: number) => (
          <tr
            key={mIndex}
            className={`relative border-b fade-x border-pr-gray-2/50 ${
              getDuplicatedSubject(m.code) ? 'bg-yellow-100 text-slate-700' : 'text-slate-500'
            }`}
          >
            <td className={`p-4 pl-4`}>
              {m.code}
              {getDuplicatedSubject(m.code) ? <i className="ml-4 bx bx-duplicate"></i> : null}
            </td>
            <td className={`p-4`}>{m.sec}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

ExamSubject.displayName = 'ExamSubject';

export default ExamSubject;
