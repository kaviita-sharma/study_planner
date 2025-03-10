import React from "react";
import SubjectForm from "./SubjectForm";
import Button from "../common/Button";

const SubjectModal = ({ show, onClose, onAdd }) => {
  if (!show) return null;

  const handleFormSubmit = (subjectData) => {
    onAdd(subjectData);
    onClose(); // close modal after adding subject
  };

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Subject</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <SubjectForm onAdd={handleFormSubmit} />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default SubjectModal;
