import { CalendarContext } from '@/app/providers/CalendarProvider';
import Head from 'next/head';
import { ReactElement, useContext, useEffect, useState } from 'react';
import PlanPageLayout, { newPlanReset } from '@/app/layout/planlayout';
import { useSession } from 'next-auth/react';
import { Player } from '@lottiefiles/react-lottie-player';
import { getUniversityData, getUniversitySeasons } from '@/app/utils/universityAPI';

export type SubjectMapPageProps = {
  plan_id: any;
  subject_codes?: string[];
};
function SubjectsMappingPage(props: SubjectMapPageProps) {
  const { createNewPlan, newPlanData, setNewPlanData } = useContext(CalendarContext);

  const { data: session, status: session_status } = useSession();

  const animationURL = '/assets/lotties/loading.json';

  const [uniFacData, setUniFacData] = useState<any>([]);
  const [uniSeason, setUniSeason] = useState<any>([]);

  // TODO: setwebready when load plan in new page
  useEffect(() => {
    let abortController: any;
    // setWebReady(true)
    // TODO:search from API
    if (abortController) {
      // If there is an ongoing request, cancel it
      abortController.abort();
    }

    abortController = new AbortController(); // Create a new AbortController instance

    return () => {
      if (abortController) {
        // If there is an ongoing request, cancel it
        abortController.abort();
      }
      abortController = null;
    };
  }, [session, session_status]);

  useEffect(() => {
    getUniversityData(1, false, null).then((fac_list: any) => {
      setUniFacData(fac_list.facultys);
    });
    getUniversitySeasons(1, null).then((data: any) => {
      setUniSeason(data.years);
    });
  }, []);

  return (
    <div className={`relative w-full h-full whitespace-nowrap overflow-auto`}>
      <Head>
        <title>แผนเปิดรายวิชา : Planriean</title>
      </Head>
      {/* <button onClick={toggleTheme}>Dark</button> */}

      {/* loading overlay */}
      <div
        className={`transition-opacity duration-300 fixed top-0 left-0 w-full h-full z-50 bg-white flex items-center justify-center ${
          session_status == 'authenticated' ? 'opacity-0 pointer-events-none' : ''
        }`}
      >
        <div className="box text-pr-blue text-center">
          <Player src={animationURL} autoplay loop speed={1} style={{ height: 100 }} />
          Loading
        </div>
      </div>

      <div className={`smooth-out w-full h-full relative grid grid-rows-[auto_minmax(0,1fr)] md:p-8 gap-4`}>
        {/* Summary Calendar Component */}
        <h1 className="text-2xl font-medium text-pr-blue max-md:pt-4 max-md:px-8">แผนเปิดรายวิชา</h1>
        <div className="bg-white/60 border-[1px] md:rounded-3xl drop-shadow-xl p-4 relative overflow-[initial]">
          {/* {getPlanListElem().length == 0 ? (
            <div className="h-full w-full flex flex-col justify-center items-center text-pr-text-menu/60">
              <i className="bx bx-task text-[6rem]"></i>
              <p>ยังไม่มีแพลนเรียนเหรอ</p>
              <p>ลองเพิ่มดูซักอันสิ</p>
              <button
                onClick={() => createNewPlan()}
                className="mt-4 text-pr-text-menu h-fit px-2 py-1 mr-2 rounded-lg bg-pr-msu-1 border-b-[3px] border-slate-400/50 hover:bg-white hover:border-[2px] hover:border-b-[4px] hover:border-pr-msu-1 active:border-0 active:bg-pr-msu-1-60 active:text-white/80"
              >
                <i className="bx bx-plus text-xl translate-y-[3px] mr-1"></i> สร้างแผนใหม่
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">{getPlanListElem()}</div>
          )} */}
        </div>
      </div>
    </div>
  );
}

SubjectsMappingPage.getLayout = function getLayout(page: ReactElement) {
  return <PlanPageLayout>{page}</PlanPageLayout>;
};

export default SubjectsMappingPage;
