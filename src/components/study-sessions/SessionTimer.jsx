// src/components/study-sessions/SessionTimer.jsx
import React, { useState, useRef, useEffect } from "react";

const SessionTimer = () => {
  const [timeElapsed, setTimeElapsed] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleFocusCheck = () => {
    // For 'focus tracking', you could store events or logs
    alert("Focus check! Are you still on task?");
  };

  return (
    <div className="card card-body">
      <h4>Time Elapsed: {formatTime(timeElapsed)}</h4>
      <div className="mb-2">
        {isRunning ? (
          <button className="btn btn-warning me-2" onClick={() => setIsRunning(false)}>
            Pause
          </button>
        ) : (
          <button className="btn btn-success me-2" onClick={() => setIsRunning(true)}>
            Start
          </button>
        )}
        <button
          className="btn btn-secondary"
          onClick={() => {
            setTimeElapsed(0);
            setIsRunning(false);
          }}
        >
          Reset
        </button>
      </div>

      <button className="btn btn-info" onClick={handleFocusCheck}>
        Focus Check
      </button>
    </div>
  );
};

export default SessionTimer;











{/*
  import React, { useState, useEffect } from "react";

const SessionTimer = ({ onStop }) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (running) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (!running && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, time]);

  const handleStart = () => {
    setTime(0);
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
    onStop(time); // pass elapsed time (seconds)
  };

  return (
    <div className="mt-2">
      <div>
        <strong>Timer:</strong> {Math.floor(time / 60)}m {time % 60}s
      </div>
      {!running ? (
        <button className="btn btn-primary btn-sm me-2" onClick={handleStart}>
          Start Timer
        </button>
      ) : (
        <button className="btn btn-danger btn-sm me-2" onClick={handleStop}>
          Stop Timer
        </button>
      )}
    </div>
  );
};

export default SessionTimer;*/}
