// src/pages/SessionDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import SessionTimer from "../components/study-sessions/SessionTimer";
import FeedbackForm from "../components/study-sessions/FeedbackForm";
import { fetchSessionById } from "../slices/sessionSlice"; // Assume you have an action for fetching a single session
import { useDispatch, useSelector } from "react-redux";

const SessionDetailPage = () => {
  const dispatch = useDispatch();
  const { sessionId } = useParams();
  const location = useLocation();
  const { session } = useSelector((state) => state.sessions);
  
  // If session details are passed via route state, you can use that too:
  const sessionDetail = location.state?.sessionDetail;

  // Alternatively, fetch the session detail if not available in state
  useEffect(() => {
    if (!sessionDetail && sessionId) {
      dispatch(fetchSessionById(sessionId));
    }
  }, [dispatch, sessionId, sessionDetail]);

  // Decide which data to use (from route state or Redux store)
  const currentSession = sessionDetail || session;

  if (!currentSession) {
    return <p>Loading session details...</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Session Details for: {currentSession.subTopicName}</h1>
      
      <div className="mb-5">
        <h2>Session Information</h2>
        {/* Display other session details as needed */}
        <p>Difficulty Level: {currentSession.difficultyLevel}</p>
        <p>Estimated Time: {currentSession.estimatedCompletionTime} minutes</p>
        {/* etc. */}
      </div>

      <div className="mb-5">
        <h2>Study Timer</h2>
        <SessionTimer />
      </div>

      <div className="mb-5">
        <h2>Post-Session Feedback</h2>
        <FeedbackForm />
      </div>
    </div>
  );
};

export default SessionDetailPage;
