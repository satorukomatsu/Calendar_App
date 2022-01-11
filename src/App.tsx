import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import FullCalendar, { EventApi, EventClickArg, DateSelectArg} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'; 
import {createEventId} from './event-utils'
import allLocales from '@fullcalendar/core/locales-all'

const App = () => {
  const handleEvents = useCallback((events: EventApi[]) => {
    console.log("events:", events);
  }, []);
  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    let title = prompt("イベントのタイトルを入力してください")?.trim();
    let calendarApi =selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }, []);
  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    if (
      window.confirm('このイベントを削除しますか')
    )　{
      clickInfo.event.remove();
    }
  }, []);

  return (
    <div className="App">
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialEvents={""}
        locales={allLocales}
        locale="en"
        headerToolbar = {{
          start: 'title',
          center: 'dayGridMonth,timeGridWeek,timeGridDay',
          end: 'today prev,next'
        }}
        businessHours = {{
          dayOfWeek: [0, 1, 2, 3, 4, 5, 6],
          start: "0:00",
          end: "24:00"
        }}
        selectable = {true}
        editable = {true}
        eventsSet = {handleEvents}
        select = {handleDateSelect}
        eventClick = {handleEventClick}
      />
    </div>
  );
}

export default App;
