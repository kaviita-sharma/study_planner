import React, { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import SessionTimer from "./SessionTimer";

const SessionCard = ({ session, onEdit, onDelete, onUpdateTimer }) => {
  const [showTimer, setShowTimer] = useState(false);

  const handleStartTimer = () => {
    setShowTimer(true);
    // Optionally, set actualStartTime if not already set.
  };

  const handleStopTimer = (elapsedSeconds) => {
    setShowTimer(false);
    // For simplicity, assume actualStartTime was set when timer started; here we update actualEndTime.
    // In a real scenario, you might store the start time and calculate end time.
    onUpdateTimer({
      id: session.id,
      actualStartTime: session.actualStartTime || new Date().toISOString(),
      actualEndTime: new Date().toISOString(),
    });
  };

  return (
    <Card className="mb-3">
      <div className="card-body">
        <h5 className="card-title">Session ID: {session.id}</h5>
        <p className="card-text">
          <strong>Status:</strong> {session.status} <br />
          <strong>Scheduled:</strong>{" "}
          {new Date(session.scheduledStartTime).toLocaleString()} -{" "}
          {new Date(session.scheduledEndTime).toLocaleString()} <br />
          {session.actualStartTime && session.actualEndTime && (
            <>
              <strong>Actual:</strong>{" "}
              {new Date(session.actualStartTime).toLocaleString()} -{" "}
              {new Date(session.actualEndTime).toLocaleString()} <br />
            </>
          )}
          <strong>Focus Rating:</strong> {session.focusRating || "-"} <br />
          <strong>Comprehension Rating:</strong>{" "}
          {session.comprehensionRating || "-"} <br />
          <strong>Notes:</strong> {session.notes || "-"}
        </p>
        <div className="d-flex flex-wrap">
          <Button
            onClick={() => onEdit(session)}
            label="Edit"
            className="btn-warning me-2 mb-2"
          />
          <Button
            onClick={() => onDelete(session.id)}
            label="Delete"
            className="btn-danger me-2 mb-2"
          />
          {!showTimer && (
            <Button
              onClick={handleStartTimer}
              label="Start Session"
              className="btn-success mb-2"
            />
          )}
        </div>
        {showTimer && <SessionTimer onStop={handleStopTimer} />}
      </div>
    </Card>
  );
};

export default SessionCard;
