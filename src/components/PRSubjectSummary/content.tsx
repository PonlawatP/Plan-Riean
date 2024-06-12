import { CalendarContext } from '@/app/providers/CalendarProvider';
import { useContext, useEffect, useRef, useState } from 'react';
import DialogNoSubjects from './dialogue/noSubjects';
import { toast } from 'react-toastify';
import copy from 'copy-text-to-clipboard';
import TableSubject from './dialogue/tableSubject';
import ExamSubject from './dialogue/examSubject';
import SubjectSelectedList from '../SubjectSelectedList';

export default function PRSummaryContent() {
  const { getCurrentPlan } = useContext(CalendarContext);

  const tableRef = useRef<any>(null);

  const handleCopy = async () => {
    if (tableRef.current) {
      //   const tableHTML = tableRef.current.outerHTML;

      const rows = Array.from(tableRef.current.querySelectorAll('tr'));
      const tableText = rows
        .map((row: any) => {
          const cells = Array.from(row.querySelectorAll('th, td'));
          return cells.map((cell: any) => cell.textContent.trim()).join('\t');
        })
        .join('\n');

      try {
        await navigator.clipboard.writeText(tableText);

        // const blob = new Blob([tableHTML], { type: 'text/html' });
        // const clipboardItem = new ClipboardItem({ 'text/html': blob });

        // await navigator.clipboard.write([clipboardItem]);

        toast.success(
          <div className="ml-2">
            <p>คัดลอกข้อมูลวิชาแล้ว</p>
            <p>เอาไปวางได้เลย</p>
          </div>,
        );
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };
  return (
    <>
      <section className="pr-subject-filter-content relative h-full overflow-auto fade-y p-5 pt-0">
        <div className="pr-filter-group pt-4 pb-6 h-full relative">
          {getCurrentPlan() == null || getCurrentPlan().subjects.length > 0 ? (
            <>
              <div className="flex justify-between items-center">
                <p className="font-semibold text-lg text-pr-blue">ข้อมูลรายวิชา</p>
                {/* <p className="font-semibold text-pr-text-menu">ข้อมูลรายวิชา</p> */}
                <button
                  onClick={() => {
                    handleCopy();
                  }}
                  className={`smooth-all text-white h-10 w-24 px-2 py-1 rounded-lg bg-pr-blue border-b-[3px] border-slate-800/50 hover:bg-white hover:border-[2px] hover:border-b-[4px] hover:border-pr-blue hover:text-pr-blue active:border-0 active:bg-pr-msu-1-60 active:text-white/80`}
                >
                  คัดลอก
                </button>
              </div>
              {/* feat: button for change format subject section */}
              {/* <div className="">
                <button
                  onClick={() => {
                    // handleNextStep();
                  }}
                  className={`smooth-all mt-4 text-white h-10 w-24 px-2 py-1 mr-2 rounded-lg bg-pr-blue border-b-[3px] border-slate-800/50 hover:bg-white hover:border-[2px] hover:border-b-[4px] hover:border-pr-blue hover:text-pr-blue active:border-0 active:bg-pr-msu-1-60 active:text-white/80`}
                >
                  แบบที่ 1
                </button>
                <button
                  onClick={() => {
                    // handleBackStep();
                  }}
                  className={`smooth-all mt-4 text-pr-text-menu h-10 w-24 px-2 py-1 mr-2 rounded-lg bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80`}
                >
                  แบบที่ 2
                </button>
              </div> */}
              {/* <h2 className="text-xl font-semibold text-pr-blue">ข้อมูลรายวิชา</h2> */}
              <div className="bg-white w-full relative mt-2 px-4 border border-pr-bg-1 rounded-lg">
                <TableSubject ref={tableRef}></TableSubject>
              </div>
              <div className="mt-8 pb-8">
                {/* <p className="font-semibold text-lg text-pr-blue">วันสอบ</p> */}
                <div className="bg-white w-full relative pb-3 px-4 border border-pr-bg-1 rounded-lg">
                  {/* <ExamSubject></ExamSubject> */}
                  <SubjectSelectedList></SubjectSelectedList>
                </div>
              </div>
            </>
          ) : (
            <DialogNoSubjects></DialogNoSubjects>
          )}

          {/* <p className="font-semibold text-pr-text-menu">วิชาที่เลือกลง</p>
          <div className={`mt-2 grid grid-cols-4gap-2`}>adasd</div> */}
        </div>
      </section>
    </>
  );
}
