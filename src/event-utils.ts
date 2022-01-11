import { EventInput } from "@fullcalendar/react";

let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/,"");
export const createEventId = () => String(eventGuid++);
export const INITIAL_EVENTS: EventInput[] = [
    {
        id: createEventId(),
        title: "All-day event",
        start: todayStr
    },
    {
        id: createEventId(),
        title: "Time event",
        start: todayStr + "T12:00:00"
    }
];