'use client'
import Calendar from '../components/calendar'
import React, { useEffect } from 'react';
import { useReducer } from 'react';
import { WebMainFunctions, WebMainReducer, initWebReducerState } from '../reducers/web_main';
import { Introduced } from '../components/introduced';
import app_version from '../helpers/global_variables';

export default function Home({props} :any) {
  const [state, dispatch] = useReducer(WebMainReducer, initWebReducerState);

  const fnState = WebMainFunctions((payloads)=>{dispatch({...payloads})});

  // set status if web is ready
  useEffect(()=>{
    // if(localStorage.getItem("plans") != null && localStorage.getItem("plan_index") != null){
    //   setPlanIndex(Number.parseInt(localStorage.getItem("plan_index") || "0"))
    //   setPlan(JSON.parse(localStorage.getItem("plans") || "{0:{data:[]}}"))
    // }

    fnState.setWebReady(true);
    return (()=>{})
  },[fnState])

  return (
    <div className="w-full h-full relative bg-gradient-to-t from-purple-200/80 to-blue-400/20">
      <div className={`transition-all duration-1000 w-full h-full relative ${state.viewSchedule ? "bg-black/70" : ""}`}>
        <Introduced app_version={app_version} state={state}/>

        <Calendar state={state} fnState={fnState} />
      </div>
    </div>
  )
}