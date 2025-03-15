import React from "react";
import TopicForm from "./TopicForm";

const TopicModal = ({ show, onClose, onSave, selectedTopic }) => {
  if (!show) return null;

  const handleFormSubmit = (topicData) => {
    onSave(topicData);
    onClose(); // Close modal after saving
  };

  return (
    <>
      <div
        className={`modal fade ${show ? "show" : ""}`} 
        style={{ display: show ? "block" : "none" }} 
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedTopic ? "Edit Topic" : "Add New Topic"}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <TopicForm onAdd={handleFormSubmit} selectedTopic={selectedTopic} />
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default TopicModal;
