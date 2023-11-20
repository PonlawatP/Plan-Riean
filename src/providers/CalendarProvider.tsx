import { createContext, useState } from "react"

export interface ICalendarFilter {
    group: [],
    subject: [],
    day: [],
    time: [],
    place: [],
    room: []
}

export const CalendarContext = createContext<any>({})
export const CalendarFilterContext = createContext<ICalendarFilter>({
    group: [],
    subject: [],
    day: [],
    time: [],
    place: [],
    room: []
})
