import { CalendarSelectorDataContext, ICalendarData } from "@/providers/CalendarSelectorDataProvider";
import PRSubjectSelector from "../../components/PRSubjectSelector";
import DialogLoading from "../../components/PRSubjectSelector/dialogue/loading";
import DialogError from "../../components/PRSubjectSelector/dialogue/error";
import DialogFirstSearch from "../../components/PRSubjectSelector/dialogue/firstSearch";
import DialogSearchNotFound from "../../components/PRSubjectSelector/dialogue/searchNotFound";
import PRSubjectFilter from "../../components/PRSubjectFilter";
import { useState } from "react";

export default function SubjectSelectorModel({children}:any){

    return <CalendarSelectorDataContext.Provider value={{calsel_data, setCalselData, calsel_data_func: {}}}>
      {children}
  </CalendarSelectorDataContext.Provider>
}