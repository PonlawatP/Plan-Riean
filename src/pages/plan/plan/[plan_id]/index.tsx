import PRCalendarSubject from '@/components/PRCalendarSubject';
import { ThemeContext } from '@/app/providers';
import { CalendarContext, CalendarFilterContext } from '@/app/providers/CalendarProvider';
import Head from 'next/head';
import { ReactElement, useContext, useEffect, useReducer, useState } from 'react';
import PlanPageLayout from '@/app/layout/planlayout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Player } from '@lottiefiles/react-lottie-player';

function PlanPage(props: any) {
  const { theme, setTheme } = useContext(ThemeContext);

  const {
    viewSchedule,
    setViewState,
    webReady,
    setWebReady,
    scrolled,
    setScrolled,
    topbarToggle,
    setTopbarToggle,
    topbarCord,
    setTopbarCord,
    topbarHtml,
    setTopbarHtml,
    openPlan,
    getCurrentPlan,
  } = useContext(CalendarContext);

  function toggleTheme() {
    console.log('switched to ' + theme);
    setTheme(theme === 'day' ? 'night' : 'day');
  }

  // TODO: setwebready when load plan in new page
  useEffect(() => {
    setWebReady(true);
  }, []);

  const { data: session, status: session_status } = useSession();

  const redirect = useRouter();
  if (session_status == 'unauthenticated') {
    redirect.push({ pathname: '/login', query: { fallbackUrl: redirect.asPath } });
  }
  const animationURL = '/assets/lotties/loading.json';

  const { plan_id } = useRouter().query;

  useEffect(() => {
    if (plan_id != undefined && session_status == 'authenticated') {
      openPlan(plan_id);
    }
  }, [plan_id, session_status]);

  return (
    <div
      className={`relative w-full h-full whitespace-nowrap`}
      onMouseMove={(e) => {
        setTopbarCord([e.clientX + document.body.scrollLeft, e.clientY + document.body.scrollTop]);
      }}
      onTouchMove={(e) => {
        setTopbarCord([
          e.targetTouches[0].clientX + document.body.scrollLeft,
          e.targetTouches[0].clientY - 60 + document.body.scrollTop,
        ]);
      }}
    >
      <Head>
        <title>แผนเรียนใหม่</title>
      </Head>
      {/* <button onClick={toggleTheme}>Dark</button> */}

      {/* loading overlay */}
      <div
        className={`transition-opacity duration-300 fixed top-0 left-0 w-full h-full z-50 bg-white flex items-center justify-center ${
          session_status != 'loading' && getCurrentPlan().detail != null ? 'opacity-0 pointer-events-none' : ''
        }`}
      >
        <div className="box text-pr-blue text-center">
          <Player src={animationURL} autoplay loop speed={1} style={{ height: 100 }} />
          Loading
        </div>
      </div>

      <span
        className={`pr-popbar smooth-opacity ${
          topbarToggle.pre || topbarToggle.init ? 'opacity-100' : 'opacity-0'
        } fixed pointer-events-none select-none py-1 px-3 min-w-[10px] min-h-[15px] backdrop-blur-sm bg-black/60 border-[1px] border-gray-600 rounded-xl overflow-hidden -translate-x-1/2 -translate-y-full z-50 text-white/90 flex flex-col justify-center items-center text-sm`}
        style={{ left: topbarCord[0], top: topbarCord[1] - 10 }}
      >
        {topbarHtml}
      </span>

      <div
        className={`smooth-out w-full h-full flex justify-center items-center relative`}
        // onClick={()=>{if(state.viewSchedule) {toggleScheduleSpectate(false); toggleScheduleNameFilter(false); toggleScheduleTimeFilter(false); }}} {...handlers}
      >
        {/* Summary Calendar Component */}
        <PRCalendarSubject />
      </div>
    </div>
  );
}

PlanPage.getLayout = function getLayout(page: ReactElement) {
  return <PlanPageLayout>{page}</PlanPageLayout>;
};

export default PlanPage;
