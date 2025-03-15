// src/components/study-sessions/SessionCalendar.jsx
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const SessionCalendar = ({ sessions = [], onSelectSlot }) => {
  const events = sessions.map((session) => {
    const start = new Date(session.scheduledStartTime);
    const end = new Date(session.scheduledEndTime);
    return {
      id: session.id,
      title: session.title || "Untitled Session",
      start,
      end,
      allDay: false,
      status: session.status, // you can use this in your custom styling
    };
  });

  // Optionally, customize event style based on status
  const eventStyleGetter = (event) => {
    let backgroundColor = "#3174ad"; // default color
    if (event.status === "Scheduled") {
      backgroundColor = "#378006";
    } else if (event.status === "Completed") {
      backgroundColor = "#555"; // for example
    } else if (event.status === "Cancelled") {
      backgroundColor = "#d9534f";
    }
    const style = {
      backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return { style };
  };

  // When a free slot is selected, we trigger onSelectSlot passed as a prop
  const handleSelectSlot = (slotInfo) => {
    // Pass the selected start and end times to parent (or modal)
    onSelectSlot && onSelectSlot(slotInfo);
  };

  // When an event is clicked, you might want to view details
  const handleSelectEvent = (event) => {
    alert(`Event clicked:\n${event.title}`);
    // Alternatively, navigate to a session details page.
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        eventPropGetter={eventStyleGetter}
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default SessionCalendar;
