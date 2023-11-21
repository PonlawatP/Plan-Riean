import { createContext, useState } from "react"

export interface ICalendarFilter {
    updated: string,
    group: [],
    subject: [],
    day: [],
    time: [],
    place: [],
    room: []
}

export const CalendarContext = createContext<any>({})
export const CalendarFilterContext = createContext<ICalendarFilter>({
    updated: "",
    group: [],
    subject: [],
    day: [],
    time: [],
    place: [],
    room: []
})
