import React from "react";
import Card from "../common/Card";
import Button from "../common/Button";

const SubTopicCard = ({ subTopic, topicId }) => {
  const handleEditSubTopic = () => {
    const updatedName = prompt("Update subtopic name:", subTopic.subTopicName);
    if (updatedName && updatedName.trim() !== "") {
      console.log(
        "Update subtopic for topic",
        topicId,
        subTopic.subTopicName,
        updatedName
      );
    }
  };

  const handleDeleteSubTopic = () => {
    console.log("Delete subtopic for topic", topicId, subTopic.subTopicName);
  };

  return (
    <div className="mb-2">
      <Card>
        <div className="card-body p-2">
          <h6 className="card-title">{subTopic.subTopicName}</h6>
          <p className="card-text mb-1">
            <strong>Difficulty:</strong> {subTopic.difficultyLevel || "-"}{" "}
            <br />
            <strong>Est. Time:</strong>{" "}
            {subTopic.estimatedCompletionTime || "-"} minutes
          </p>
          <div className="d-flex">
            <Button
              onClick={handleEditSubTopic}
              label="Edit"
              className="btn-warning me-2 btn-sm"
            />
            <Button
              onClick={handleDeleteSubTopic}
              label="Delete"
              className="btn-danger btn-sm"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SubTopicCard;
