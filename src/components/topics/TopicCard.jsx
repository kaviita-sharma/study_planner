import React, { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import SubTopicModal from "../sub-topics/SubTopicModal";
import SubTopicCard from "../sub-topics/SubTopicCard";
import { useDispatch } from "react-redux";
import { updateTopic, deleteTopic } from "../../slices/topicSlice";

const TopicCard = ({ topic }) => {
  const dispatch = useDispatch();
  const [showSubTopicModal, setShowSubTopicModal] = useState(false);

  const handleEditTopic = () => {
    const updatedName = prompt("Update topic name:", topic.TopicName);
    if (updatedName && updatedName.trim() !== "") {
      dispatch(updateTopic({ id: topic.TopicId, TopicName: updatedName }));
    }
  };

  const handleDeleteTopic = () => {
    dispatch(deleteTopic(topic.TopicId));
  };

  return (
    <div className="mb-3">
      <Card>
        <div className="card-body">
          <h5 className="card-title">{topic.TopicName}</h5>
          <p className="card-text">
            <strong>Order:</strong> {topic.OrderIndex || "-"} <br />
            <strong>Difficulty:</strong> {topic.DifficultyLevel || "-"} <br />
            <strong>Est. Time:</strong> {topic.EstimatedCompletionTime || "-"}{" "}
            minutes <br />
            <strong>Status:</strong> {topic.IsActive ? "Active" : "Inactive"}
          </p>
          <div className="d-flex flex-wrap">
            <Button
              onClick={handleEditTopic}
              label="Edit"
              className="btn-warning me-2 mb-2"
            />
            <Button
              onClick={handleDeleteTopic}
              label="Delete"
              className="btn-danger me-2 mb-2"
            />
            <Button
              onClick={() => setShowSubTopicModal(true)}
              label="Add Subtopic"
              className="btn-success mb-2"
            />
          </div>
        </div>
      </Card>
      <SubTopicModal
        show={showSubTopicModal}
        onClose={() => setShowSubTopicModal(false)}
        onAdd={(subTopicData) => {
          // For simplicity, here we simply log. In a real app, dispatch an action to update the topic's subtopics.
          console.log("Add subtopic for topic", topic.TopicId, subTopicData);
          setShowSubTopicModal(false);
        }}
      />
      {topic.SubTopics && topic.SubTopics.length > 0 && (
        <div className="mt-2">
          {topic.SubTopics.map((subTopic, index) => (
            <SubTopicCard
              key={index}
              subTopic={subTopic}
              topicId={topic.TopicId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicCard;
