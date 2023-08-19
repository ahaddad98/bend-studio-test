"use client"
import "./styles/globals.scss";
import React, { useState } from 'react'
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid'
import { EventChangeArg, EventClickArg } from '@fullcalendar/core/index.js';
interface CalendarEvent {
  title: string;
  start: string;
  end: string;
}
const englishDayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function Home() {


  const [events, setEvents] = useState<any>([
  ]);


  const renderEventContent = (eventContent: { event: CalendarEvent }) => {
    return (
      <div>
        <div>{eventContent.event.title}</div>
        <div>{eventContent.event.start} - {eventContent.event.end}</div>
      </div>
    );
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
      setEvents(events.filter((event: any) => event !== clickInfo.event));
    }
  };
  const dayHeaderContent = (info: { date: Date }) => {
    const dayIndex = info.date.getDay();
    return englishDayNames[dayIndex];
  };
  const handleEventChange = (changeInfo: EventChangeArg) => {
    setEvents(events.map((event: any) => {
      if (event === changeInfo.event) {
        return { ...event, start: changeInfo.event.startStr, end: changeInfo.event.endStr };
      }
      return event;
    }));
  };

  return (

    <main className="flex min-h-screen flex-col items-center justify-center p-24" >
      <FullCalendar
        viewClassNames="w-custom h-80"
        plugins={[dayGridPlugin, interactionPlugin]}
        editable
        selectable
        headerToolbar={{
          left: "title",
          center: "",
          right: "prev,next today",
        }}
        initialView="dayGridMonth"
        selectMirror={true}
        dayMaxEvents={true}
        dayHeaderContent={dayHeaderContent}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        eventChange={handleEventChange}
      />
    </main>
  )
}
