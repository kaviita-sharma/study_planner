import React from "react";
import Card from "../common/Card";
import Button from "../common/Button";

const SubjectCard = ({ subject, onEdit, onDelete }) => {
  return (
    <Card className="mb-3">
      <div className="card-body">
        <h5 className="card-title">{subject.subjectName}</h5>
        <p className="card-text">
          <strong>Difficulty:</strong> {subject.difficultyLevel || "-"} <br />
          <strong>Priority:</strong> {subject.priority || "-"} <br />
          <strong>Est. Time:</strong> {subject.estimatedCompletionTime || "-"}{" "}
          minutes <br />
          <strong>Status:</strong> {subject.status} <br />
          <strong>Start Date:</strong>{" "}
          {subject.startDate
            ? new Date(subject.startDate).toLocaleDateString()
            : "-"}{" "}
          <br />
          <strong>End Date:</strong>{" "}
          {subject.endDate
            ? new Date(subject.endDate).toLocaleDateString()
            : "-"}
        </p>
        <div className="d-flex">
          <Button
            onClick={() => onEdit(subject)}
            label="Edit"
            className="btn-warning me-2"
          />
          <Button
            onClick={() => onDelete(subject.id)}
            label="Delete"
            className="btn-danger"
          />
        </div>
      </div>
    </Card>
  );
};

export default SubjectCard;
