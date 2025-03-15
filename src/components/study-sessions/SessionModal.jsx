// src/components/study-sessions/SessionModal.jsx
import React from "react";
import SessionForm from "./SessionForm";
import Button from "../common/Button";

const SessionModal = ({ show, onClose, onAdd, prefill }) => {
  if (!show) return null;

  const handleFormSubmit = (sessionData) => {
    onAdd(sessionData);
    onClose();
  };

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Study Session</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <SessionForm onAdd={handleFormSubmit} prefill={prefill} />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default SessionModal;
