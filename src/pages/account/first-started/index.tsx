import PlainPageLayout from "@/app/layout/plainlayout"
import { Player } from "@lottiefiles/react-lottie-player";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react"

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ProfileFSPage(props:any){

    const { data:session, status:session_status} = useSession();
    const redirect = useRouter()
    if(session_status == "unauthenticated"){
        redirect.push({pathname:"/login", query:{fallbackUrl:redirect.asPath}});
    }
    const animationURL = "/assets/lotties/loading.json";
    
    const [step, setStep] = useState({index: 0, process: 0, pre_process: 1})
    const stepContent = [
        {
            step: 0,
            title: "test",
            content: <>
                <h2 className="text-lg font-medium">กรอกชื่อผู้ใช้ของคุณ</h2>
                <form className="text-sm flex flex-col gap-4 mt-4">
                    <input
                    type="username"
                    className="p-2 rounded-xl border"
                    placeholder="ชื่อผู้ใช้ ที่คุณอยากไช้"
                    />
                </form>
            </>
        },
        {
            step: 1,
            title: "test",
            content: <>
                <h2 className="text-lg font-medium">ทดสอบ</h2>
                <form className="text-sm flex flex-col gap-4 mt-4">
                    <input
                    type="username"
                    className="p-2 rounded-xl border"
                    placeholder="ชื่อผู้ใช้ ที่คุณอยากไช้"
                    />
                </form>
            </>
        }
    ]
    useEffect(()=>{
        if(step.process == 0){
            setTimeout(()=>{
                setStep({...step, process: 1})
            }, 30)
        } else if(step.process == 2){
            setTimeout(()=>{
                setStep({index: step.index+1, process: 0, pre_process: 1})
            }, 300)
        } else if(step.process == 3){
            setTimeout(()=>{
                setStep({index: step.index-1, process: 0, pre_process: -1})
            }, 300)
        }
    }, [step])
    
    function handleNextStep(){
        if(step.index+1 >= stepContent.length) return
        setStep({...step, process: 2})
    }
    function handleBackStep(){
        if(step.index <= 0) return
        setStep({...step, process: 3})
    }

    const value = 0.66;

    return <>
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

        {/* process section */}
        <section className="container mx-auto px-4 h-full relative">
            <div className="flex flex-col justify-between h-full">
                <div className="relative">
                    <h2 className="mt-4 font-bold text-2xl text-pr-blue">เริ่มต้นใช้งาน</h2>
                    <div className="h-10 w-10 absolute right-0 top-2 flex justify-center items-center">
                        <p className="absolute mt-1 font-bold text-md text-pr-blue">{step.index+1}</p>
                        <CircularProgressbar 
                            value={step.index+1/stepContent.length} strokeWidth={15} maxValue={1}
                            styles={buildStyles({
                            
                                // Text size
                                textSize: '16px',
                            
                                // How long animation takes to go from one percentage to another, in seconds
                                pathTransitionDuration: 0.5,
                            
                                // Colors
                                pathColor: `#0075F7`,
                                textColor: '#f88',
                                trailColor: '#CACFD9',
                                backgroundColor: '#3e98c7',
                            }
                          )} />
                    </div>
                </div>
                <div className="content-step px-4">
                    <div className={` ${step.process == 0 ? "" : "transition-all duration-300"} ${(step.process == 0 && step.pre_process == 1) || step.process == 3 ? '-translate-x-4 opacity-0' : (step.process == 0 && step.pre_process == -1) || step.process == 2 ? 'translate-x-4 opacity-0' : ''}`}>
                        {stepContent[step.index].content}
                    </div>
                </div>
                <section className="buttons mb-6 flex justify-end">
                    <button disabled={step.index <= 0} onClick={()=>{handleBackStep()}} className={`smooth-all ${step.index <= 0 ? "opacity-50" : ""} mt-4 text-pr-text-menu h-10 w-24 px-2 py-1 mr-2 rounded-lg bg-pr-bg border-b-[3px] border-slate-400/50 hover:bg-slate-300 active:border-0 active:bg-slate-400 active:text-white/80`}>
                        ย้อนกลับ
                    </button>
                    <button onClick={()=>{handleNextStep()}} className={`smooth-all mt-4 text-white h-10 w-24 px-2 py-1 mr-2 rounded-lg bg-pr-blue border-b-[3px] border-slate-800/50 hover:bg-white hover:border-[2px] hover:border-b-[4px] hover:border-pr-blue hover:text-pr-blue active:border-0 active:bg-pr-msu-1-60 active:text-white/80`}>
                        {step.index+1 >= stepContent.length ? "เสร็จสิ้น" : "ถัดไป"}
                    </button>
                </section>
            </div>
        </section>
    </>
}

ProfileFSPage.getLayout = function getLayout(page: ReactElement) {
    return (
      <PlainPageLayout>
         {page}
      </PlainPageLayout>
    )
  }
  
export default ProfileFSPage