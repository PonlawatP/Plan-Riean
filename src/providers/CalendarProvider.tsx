import { createContext, useState } from "react"

export interface ICalendarFilter {
    updated: string,
    group: Array<any>,
    subject: Array<any>,
    day: Array<any>,
    time: Array<any>,
    room: Array<any>,
    master: Array<any>
}

export const CalendarContext = createContext<any>({})
export const CalendarFilterContext = createContext<any>({})
