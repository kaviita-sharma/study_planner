import React from "react";
import SubTopicForm from "./SubTopicForm";
import Button from "../common/Button";

const SubTopicModal = ({ show, onClose, onAdd }) => {
  if (!show) return null;

  const handleFormSubmit = (subTopicData) => {
    onAdd(subTopicData);
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
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Subtopic</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <SubTopicForm onAdd={handleFormSubmit} />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default SubTopicModal;
