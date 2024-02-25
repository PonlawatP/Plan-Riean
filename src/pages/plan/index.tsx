import PRCalendarSubject from '@/components/PRCalendarSubject';
import { ThemeContext } from '@/app/providers';
import { CalendarContext, CalendarFilterContext } from '@/app/providers/CalendarProvider';
import Head from 'next/head';
import { ReactElement, useContext, useEffect, useReducer, useRef, useState } from 'react';
import PlanPageLayout from '@/app/layout/planlayout';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { List } from 'postcss/lib/list';
import { toast } from 'react-toastify';

function PlanPage() {
  const {theme, setTheme} = useContext(ThemeContext);

  const {
    createNewPlan
  } = useContext(CalendarContext);

  function toggleTheme(){
    console.log("switched to " + theme);
    setTheme(theme === 'day' ? "night" : "day")
  }

  // TODO: setwebready when load plan in new page
  // useEffect(()=>{
  //   setWebReady(true)
  // },[])

  const { data:session, status:session_status} = useSession();
  const redirect = useRouter()
  
  const animationURL = "/assets/lotties/loading.json";

  function getPlanListElem(){
    const elems:Array<any> = []

    for (let index = 0; index < 20; index++) {
            {/* plan folder */}
    //   elems.push(<button className="plan-folder relative w-[9em] h-[9em] p-2 rounded-2xl flex flex-col items-center group text-pr-dark hover:bg-pr-gray-1 hover:text-white">
    //   <div className="relative flex justify-center items-center w-full h-4/6">
    //     <i className="bx bxs-folder text-[4em]"></i>
    //   </div>
    //   <p className='relative whitespace-normal line-clamp-2 text-center'>ชื่อโฟลเดอร์ทดสอบ 1234567 asdasdasdasd</p>
    // </button>)
    //         {/* plan file */}
    //   elems.push(<button className="plan-folder relative w-[9em] h-[9em] p-2 rounded-2xl flex flex-col items-center group text-pr-dark hover:bg-pr-gray-1 hover:text-white">
    //   <div className="relative flex justify-center items-center w-full h-4/6 pointer-events-none">
    //     <Image src={"/assets/svg/plan_ico.svg"} className='group-hover:hidden' alt='Plan' width={70} height={70}></Image>
    //     <Image src={"/assets/svg/plan_white_ico.svg"} className='hidden group-hover:block' alt='Plan' width={70} height={70}></Image>
    //     {/* <i className="bx bxs-folder text-[4em]"></i> */}
    //   </div>
    //   <p className='relative whitespace-normal line-clamp-2 text-center'>แพลนเรียนที่รัก สวัสดีครับ</p>
    // </button>)
    }

    return elems
  }

  return (
      <div 
        className={`relative w-full h-full whitespace-nowrap overflow-auto`}
      >
        <Head>
          <title>รายการแผนของคุณ : Planriean</title>
        </Head>
        {/* <button onClick={toggleTheme}>Dark</button> */}

        {/* loading overlay */}
        <div className={`transition-opacity duration-300 fixed top-0 left-0 w-full h-full z-50 bg-white flex items-center justify-center ${session_status == 'authenticated' ? "opacity-0 pointer-events-none" : ""}`}>
          <div className="box text-pr-blue text-center">
            <Player
              src={animationURL}
              autoplay
              loop
              speed={1}
              style={{height: 100}}
            />
            Loading
          </div>
        </div>

        <div className={`smooth-out w-full h-full relative grid grid-rows-[auto_minmax(0,1fr)] p-8 gap-4`} 
        >
          {/* Summary Calendar Component */}  
          <h1 className='text-2xl font-medium'>แผนการเรียนของคุณ</h1>
          <div className="bg-white/60 border-[1px] rounded-3xl drop-shadow-xl p-6 flex flex-wrap gap-2 relative overflow-auto">
            {getPlanListElem().length == 0 ? <div className="h-full w-full flex flex-col justify-center items-center text-pr-text-menu/60">
              <i className='bx bx-task text-[6rem]'></i>
              <p>ยังไม่มีแพลนเรียนเหรอ</p>
              <p>ลองเพิ่มดูซักอันสิ</p>
              <button onClick={()=>createNewPlan()} className='mt-4 text-pr-text-menu h-fit px-2 py-1 mr-2 rounded-lg bg-pr-msu-1 border-b-[3px] border-slate-400/50 hover:bg-white hover:border-[2px] hover:border-b-[4px] hover:border-pr-msu-1 active:border-0 active:bg-pr-msu-1-60 active:text-white/80'>
                <i className="bx bx-plus text-xl translate-y-[3px] mr-1"></i> สร้างแผนใหม่
              </button>
            </div> : getPlanListElem()}
          </div>
          </div>
        </div>
  )
}

PlanPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PlanPageLayout>
       {page}
    </PlanPageLayout>
  )
}

export default PlanPage