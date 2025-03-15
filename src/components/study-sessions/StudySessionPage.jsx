import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSessionById, updateSession } from "../../slices/sessionSlice";
import SessionTimer from "./SessionTimer";
import FeedbackForm from "./FeedbackForm";

const StudySessionPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = {};//useSelector((state) => state.sessions.selectedSession);
  const loading = useSelector((state) => state.sessions.loading);

  const [focusChecks, setFocusChecks] = useState([
    {
      id: 1,
      time: 15,
      question: "Are you still focused on the material?",
      response: null,
    },
    {
      id: 2,
      time: 30,
      question: "Quick check: Do you understand gradient descent?",
      response: null,
    },
  ]);

  const [comprehensionQuestions, setComprehensionQuestions] = useState([
    {
      id: 1,
      question: "Explain the chain rule as it applies to backpropagation",
      answer: "",
    },
    {
      id: 2,
      question: "What are the main challenges with training deep neural networks?",
      answer: "",
    },
  ]);

  const [sessionNotes, setSessionNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchSessionById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    // Calculate progress based on time elapsed compared to planned duration
    if (session && session.plannedDuration) {
      const plannedDurationInMinutes = parseInt(session.plannedDuration);
      const plannedDurationInSeconds = plannedDurationInMinutes * 60;
      const newProgress = Math.min((timeElapsed / plannedDurationInSeconds) * 100, 100);
      setProgress(newProgress);
    }
  }, [timeElapsed, session]);

  const handleEndSession = () => {
    if (session) {
      dispatch(
        updateSession({
          id: session.id,
          updatedData: {
            actualDuration: Math.round(timeElapsed / 60),
            notes: sessionNotes,
            completionStatus: "Completed",
            comprehensionResponses: comprehensionQuestions.map((q) => ({
              question: q.question,
              answer: q.answer,
            })),
            focusCheckResponses: focusChecks.map((check) => ({
              question: check.question,
              response: check.response,
            })),
          },
        })
      ).then(() => {
        navigate("/sessions");
      });
    }
  };

  const handleFocusResponse = (checkId, response) => {
    setFocusChecks(
      focusChecks.map((check) =>
        check.id === checkId ? { ...check, response } : check
      )
    );
  };

  const handleComprehensionAnswerChange = (questionId, answer) => {
    setComprehensionQuestions(
      comprehensionQuestions.map((q) =>
        q.id === questionId ? { ...q, answer } : q
      )
    );
  };

  const handleSubmitAnswers = () => {
    // In a real application, you might want to save these answers to your backend
    console.log("Submitting answers:", comprehensionQuestions);
    // You could also update progress or navigate to the next step
  };

  if (loading) {
    return <div className="text-center p-5">Loading session...</div>;
  }

  if (!session) {
    return <div className="text-center p-5">Session not found</div>;
  }

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
                <div className="mb-3">
                  <div className="mb-2">
                    <strong>Subject:</strong>
                    <div>{session.subject || "Machine Learning"}</div>
                  </div>
                  <div className="mb-2">
                    <strong>Topic:</strong>
                    <div>{session.topic || "Neural Networks"}</div>
                  </div>
                  <div className="mb-2">
                    <strong>Subtopic:</strong>
                    <div>{session.subtopic || "Backpropagation Algorithm"}</div>
                  </div>
                  <div className="mb-2">
                    <strong>Planned Duration:</strong>
                    <div>{session.plannedDuration || "60"} minutes</div>
                  </div>
                  <div className="mb-2">
                    <strong>Difficulty:</strong>
                    <div>{session.difficulty || "High"}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="card mb-4">
              <div className="card-body text-center">
                <h2 className="display-4">
                  {Math.floor(timeElapsed / 60)
                    .toString()
                    .padStart(2, "0")}
                  :
                  {(timeElapsed % 60)
                    .toString()
                    .padStart(2, "0")}
                </h2>
                <p className="text-muted">
                  of {session.plannedDuration || "60"} minutes
                </p>
                <SessionTimer 
                  onTimeUpdate={(seconds) => setTimeElapsed(seconds)} 
                />
                <div className="mt-3">
                  <div className="progress" style={{ height: "20px" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${progress}%` }}
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {Math.round(progress)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Session Notes */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="card-title mb-0">Session Notes</h2>
                  <button 
                    className="btn btn-outline-primary" 
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Save" : "Edit"}
                  </button>
                </div>
                {isEditing ? (
                  <textarea
                    className="form-control"
                    rows="6"
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                  ></textarea>
                ) : (
                  <div className="p-3 bg-light rounded">
                    {sessionNotes ? 
                      sessionNotes : 
                      <span className="text-muted">No notes yet. Click 'Edit' to start taking notes.</span>
                    }
                  </div>
                )}
              </div>
            </div>

            {/* Focus Checks */}
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">Focus Checks</h2>
                {focusChecks.map((check) => (
                  <div key={check.id} className="card mb-3 bg-light">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="mb-0">
                          <i className="bi bi-clock me-2"></i>
                          Focus Check
                        </h5>
                        <span className="badge bg-secondary">{check.time} min mark</span>
                      </div>
                      <p>{check.question}</p>
                      <div className="d-flex gap-2">
                        <button
                          className={`btn ${
                            check.response === "focused" ? "btn-success" : "btn-outline-success"
                          }`}
                          onClick={() => handleFocusResponse(check.id, "focused")}
                        >
                          Yes, I'm focused
                        </button>
                        <button
                          className={`btn ${
                            check.response === "break" ? "btn-danger" : "btn-outline-danger"
                          }`}
                          onClick={() => handleFocusResponse(check.id, "break")}
                        >
                          Need a break
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comprehension Check */}
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">Comprehension Check</h2>
                <p className="text-muted mb-4">
                  These questions will help measure your understanding after the session
                </p>

                {comprehensionQuestions.map((question) => (
                  <div key={question.id} className="mb-4">
                    <div className="mb-2">{question.question}</div>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Your answer..."
                      value={question.answer}
                      onChange={(e) => 
                        handleComprehensionAnswerChange(question.id, e.target.value)
                      }
                    ></textarea>
                  </div>
                ))}

                <button 
                  className="btn btn-primary w-100" 
                  onClick={handleSubmitAnswers}
                >
                  Submit Answers
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
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