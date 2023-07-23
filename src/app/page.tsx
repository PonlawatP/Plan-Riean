'use client'
import Calendar from '@/components/calendar'
import React, { useEffect, useState } from 'react';
import { useReducer } from 'react';
import { WebMainFunctions, WebMainReducer, initWebReducerState } from '@/reducers/web_main';
import { Introduced } from '@/components/introduced';
import app_version from '@/helpers/global_variables';
import intilitizeFnEffects from '@/helpers/intilitizeFnEffects';
import SidePanel from '@/components/sidepanel';
import { Ifilter } from '@/interfaces/filter';

export default function Home({} :any) {
  const [state, dispatch] = useReducer(WebMainReducer, initWebReducerState);

  const fnState = WebMainFunctions((payloads)=>{dispatch({...payloads})});

  // set status if web is ready
  useEffect(()=>{
    intilitizeFnEffects();

    fnState.setWebReady(true);
    console.log("test");
    
    return (()=>{})
  },[state.webReady])

  return (
    <div className='grid grid-cols-[auto_1fr] w-full h-full relative bg-gradient-to-t from-plate-3/80 to-plate-1/80'>
    <SidePanel state={state} fnState={fnState} />
      <div className="h-full relative">
        <Introduced app_version={app_version} state={state}/>
        <Calendar state={state} fnState={fnState} />
      </div>
    </div>
  )
}