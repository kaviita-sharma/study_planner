// src/pages/SessionsPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSessions, createSession } from "../slices/sessionSlice";
import SessionCalendar from "../components/study-sessions/SessionCalendar";
import SessionForm from "../components/study-sessions/SessionForm";

const SessionsPage = () => {
  const dispatch = useDispatch();
  const { sessions, loading, error } = useSelector((state) => state.sessions);
  const [prefillData, setPrefillData] = useState(null);

  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

  // When a free slot is selected on the calendar,
  // prefill the scheduled start and end times.
  const handleSelectSlot = (slotInfo) => {
    const startDateTime = new Date(slotInfo.start).toISOString().slice(0, 16);
    const endDateTime = new Date(slotInfo.end).toISOString().slice(0, 16);
    // Optionally, you can also set a subTopicId if needed.
    setPrefillData({ scheduledStartTime: startDateTime, scheduledEndTime: endDateTime /*, subTopicId: someValue */ });
  };

  // When the form is submitted, merge any prefill data and dispatch createSession.
  const handleAddSession = (sessionData) => {
    const newSession = { ...sessionData, ...prefillData };
    const subTopicId = prefillData?.subTopicId;
    console.log(newSession,subTopicId);
    dispatch(createSession({ session: newSession, subTopicId }));
    setPrefillData(null);
  };

  if (loading) return <p>Loading sessions...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Study Sessions</h1>
      <div className="mb-5">
        <h2>Calendar / Scheduling</h2>
        <SessionCalendar sessions={sessions} onSelectSlot={handleSelectSlot} />
      </div>
      <div className="mb-5">
        <h2>Create Session</h2>
        <SessionForm prefill={prefillData} onAdd={handleAddSession} />
      </div>
    </div>
  );
};

export default SessionsPage;
