import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSessionById, updateSession } from "../../slices/sessionSlice";
import SessionTimer from "./SessionTimer";
import FeedbackForm from "./FeedbackForm";
import { useLocation } from "react-router-dom";
import axios from "axios";

const StudySessionPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const subTopic = location.state?.subTopic || {};
  
  const session = useSelector((state) => state.sessions.selectedSession) || {};
  const loading = useSelector((state) => state.sessions.loading);

  const [sessionNotes, setSessionNotes] = useState("");
  const [focusRating, setFocusRating] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const [focusChecks, setFocusChecks] = useState([
    { id: 1, time: 15, question: "Are you still focused?", response: null },
    { id: 2, time: 30, question: "Are you understanding?", response: null },
    { id: 3, time: 45, question: "Still following along?", response: null },
  ]);

  useEffect(() => {
    if (id) {
      dispatch(fetchSessionById(id));
    }
  }, [dispatch, id]);

  // Assign focus rating based on user input
  useEffect(() => {
    const focusValues = { 15: 2.5, 30: 5, 45: 7.5 };
    const lowestFocus = focusChecks
      .filter((check) => check.response === "no")
      .map((check) => focusValues[check.time])
      .sort((a, b) => a - b)[0];

    if (lowestFocus) {
      setFocusRating(lowestFocus);
    } else if (timeElapsed >= subTopic.estimatedCompletionTime * 60) {
      setFocusRating(10);
    }
  }, [focusChecks, timeElapsed, subTopic]);

  const handleFocusResponse = (checkId, response) => {
    setFocusChecks(
      focusChecks.map((check) =>
        check.id === checkId ? { ...check, response } : check
      )
    );
  };

  const handleSaveNotes = async () => {
    if (!session || !session.id) return;
    
    const requestData = {
      id: session.id,
      userId: session.userId,
      notes: sessionNotes,
      scheduledStartTime: session.scheduledStartTime,
      scheduledEndTime: session.scheduledEndTime,
      actualStartTime: session.actualStartTime,
      actualEndTime: new Date().toISOString(),
      status: "Completed",
      focusRating: focusRating,
      comprehensionRating: 0, // Assuming this will be collected elsewhere
      title: session.title,
    };

    try {
      await axios.put(`/api/study-session/${session.id}`, requestData);
      console.log("Session updated successfully!");
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };

  const handleEndSession = async () => {
    await handleSaveNotes();
    navigate("/sessions");
  };

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <div className="bg-primary text-white p-3 d-flex justify-content-between align-items-center">
        <h1 className="mb-0">Study Session</h1>
        <button onClick={handleEndSession} className="btn btn-danger">
          End Session
        </button>
      </div>

      <div className="container py-4">
        <div className="row">
          <div className="col-lg-8">
            {/* Session Information */}
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">Session Information</h2>
                <p><strong>Subtopic:</strong> {subTopic.subTopicName || "Unknown"}</p>
                <p><strong>Planned Duration:</strong> {subTopic.estimatedCompletionTime || "60"} minutes</p>
                <p><strong>Difficulty:</strong> {subTopic.difficultyLevel || 0}/10</p>
              </div>
            </div>

            {/* Timer */}
            <div className="card mb-4">
              <div className="card-body text-center">
                <SessionTimer onTimeUpdate={setTimeElapsed} />
              </div>
            </div>

            {/* Notes */}
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">Session Notes</h2>
                <textarea
                  className="form-control"
                  rows="6"
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* Focus Checks */}
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">Focus Checks</h2>
                {focusChecks.map((check) => (
                  <div key={check.id} className="card mb-3 bg-light">
                    <div className="card-body">
                      <h5 className="mb-2">Focus Check ({check.time} min)</h5>
                      <p>{check.question}</p>
                      <button
                        className={`btn ${check.response === "yes" ? "btn-success" : "btn-outline-success"}`}
                        onClick={() => handleFocusResponse(check.id, "yes")}
                      >
                        Yes
                      </button>
                      <button
                        className={`btn ${check.response === "no" ? "btn-danger" : "btn-outline-danger"} ms-2`}
                        onClick={() => handleFocusResponse(check.id, "no")}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Form */}
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">Session Feedback</h2>
                <FeedbackForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySessionPage;
