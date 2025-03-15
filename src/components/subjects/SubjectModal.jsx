import React from "react";
import SubjectForm from "./SubjectForm";

const SubjectModal = ({ show, onClose, onSave, mode, subject }) => {
  if (!show) return null;

  const handleFormSubmit = (subjectData) => {
    onSave(subjectData);
    onClose(); // Close modal after saving
  };
  return (
    <>
      <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{mode === "edit" ? "Edit Subject" : "Add New Subject"}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <SubjectForm onSubmit={handleFormSubmit} existingSubject={subject} />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default SubjectModal;
