import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSessions,
  addSession,
  updateSession,
  deleteSession,
} from "../../slices/sessionSlice";
import SessionCard from "./SessionCard";
import CircleLoader from "../common/Loader";
import SessionModal from "./SessionModal";
import Button from "../common/Button";

const Sessions = () => {
  const dispatch = useDispatch();
  const { sessions, loading, error } = useSelector((state) => state.sessions);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

  const handleAddSession = (sessionData) => {
    dispatch(addSession(sessionData));
  };

  const handleEditSession = (session) => {
    const updatedNotes = prompt("Update session notes:", session.notes);
    if (updatedNotes && updatedNotes.trim() !== "") {
      dispatch(updateSession({ id: session.id, notes: updatedNotes }));
    }
  };

  const handleDeleteSession = (id) => {
    dispatch(deleteSession(id));
  };

  const handleUpdateTimer = (updatedData) => {
    dispatch(updateSession(updatedData));
  };

  const sessionList = Array.isArray(sessions) ? sessions : [];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Study Sessions</h2>
        <Button
          label="Add Session"
          onClick={() => setShowModal(true)}
          className="btn btn-success"
        />
      </div>

      <SessionModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddSession}
      />

      {loading ? (
        <CircleLoader />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : sessionList.length === 0 ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "60vh" }}
        >
          <p className="text-muted">
            No sessions found. Please add a session to get started.
          </p>
        </div>
      ) : (
        <div className="row">
          {sessionList.map((session) => (
            <div className="col-md-4" key={session.id}>
              <SessionCard
                session={session}
                onEdit={handleEditSession}
                onDelete={handleDeleteSession}
                onUpdateTimer={handleUpdateTimer}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sessions;
