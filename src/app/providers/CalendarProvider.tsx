import { Dispatch, SetStateAction, createContext, useState } from "react"

export interface ICalendarFilter {
    group: Array<any>,
    subject: Array<any>,
    day: Array<any>,
    time: Array<any>,
    room: Array<any>,
    master: Array<any>
}
export interface ICalendarData {
    isFirstLoading: boolean,
    isLoading: boolean,
    isError: boolean,
    updated: string,
    current_filter: {
        group: Array<any>,
        subject: Array<any>,
        day: Array<any>,
        time: Array<any>,
        room: Array<any>,
        master: Array<any>
    },
    result: {
        recommanded: Array<any>,
        data: Array<any>
    }
}

export interface ICalendarDataProvider {
    calsel_data: ICalendarData
    setCalselData: Dispatch<SetStateAction<ICalendarData>>
}

export const CalendarContext = createContext<any>({})
export const CalendarFilterContext = createContext<any>({})