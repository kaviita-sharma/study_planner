import React, { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import SubTopicModal from "../sub-topics/SubTopicModal";
import SubTopicCard from "../sub-topics/SubTopicCard";
import { useDispatch } from "react-redux";
import { deleteTopic, getTopicForSubject } from "../../slices/topicSlice";
import { Link } from "react-router-dom";

const TopicCard = ({ topic , subjectId , onEdit }) => {
  const dispatch = useDispatch();
  const [showSubTopicModal, setShowSubTopicModal] = useState(false);


  const handleDeleteTopic = () => {
    dispatch(deleteTopic(topic.topicId)).then(() => dispatch(getTopicForSubject(subjectId)));
  };

  return (
    <div className="mb-3">
      <Card className="border rounded-3">
        <div className="card-body">
          <h5 className="card-title">{topic.topicName}</h5>
          <p className="card-text">
            <strong>Order:</strong> {topic.orderIndex} <br />
            <strong>Difficulty:</strong> {topic.difficultyLevel} <br />
            <strong>Est. Time:</strong> {topic.estimatedCompletionTime} minutes{" "}
            <br />
            <strong>Status:</strong> {topic.isActive ? "Active" : "Inactive"}
          </p>
          <div className="d-flex flex-wrap">
            <Button
              onClick={() => onEdit(topic)}
              label="Edit"
              className="btn-warning me-2 mb-2"
            />
            <Button
              onClick={handleDeleteTopic}
              label="Delete"
              className="btn-danger me-2 mb-2"
            />
            <Link
              to={`/Topics/${topic.topicId}/${topic.subjectId}`}
                className="btn btn-primary btn-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      </Card>
      <SubTopicModal
        show={showSubTopicModal}
        onClose={() => setShowSubTopicModal(false)}
        onAdd={() => {setShowSubTopicModal(false);}}
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
