import { CalendarContext } from '@/app/providers/CalendarProvider';
import { useContext } from 'react';

export default function DialogNoSubjects({ children }: any, props: any) {
  const { setViewFilter } = useContext(CalendarContext);

  return (
    <div className="pr-dialog-searchfirst relative h-full flex flex-col justify-center items-center text-pr-text-menu/60">
      <i className="bx bx-layer text-[6rem]"></i>
      <p>ยังไม่มีวิชาเลย</p>
      <p>เลือกวิชาลงในตารางเพื่อสรุปข้อมูล</p>
    </div>
  );
}
