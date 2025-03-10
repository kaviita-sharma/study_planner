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

export default SessionTimer;
