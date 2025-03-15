import React from "react";
import SubTopicForm from "./SubTopicForm";

const SubTopicModal = ({
  show,
  onClose,
  onSave,          
  selectedSubtopic, 
  mode = "add",   
}) => {
  if (!show) return null;

  const handleFormSubmit = (subTopicData) => {
    onSave(subTopicData);
    onClose();
  };

  // Modal title depends on mode
  const modalTitle = mode === "edit" ? "Edit Subtopic" : "Add New Subtopic";
  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/*
                Pass selectedSubtopic and mode to SubTopicForm
                so it can pre-fill fields if we're editing
              */}
              <SubTopicForm
                onAdd={handleFormSubmit}
                selectedSubtopic={selectedSubtopic}
                mode={mode}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default SubTopicModal;
