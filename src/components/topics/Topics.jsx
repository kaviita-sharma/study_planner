import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTopics,
  addTopic,
  updateTopic,
  deleteTopic,
} from "../../slices/topicSlice";
import TopicCard from "./TopicCard";
import CircleLoader from "../common/Loader";
import TopicModal from "./TopicModal";
import Button from "../common/Button";

const Topics = () => {
  const dispatch = useDispatch();
  const { topics, loading, error } = useSelector((state) => state.topics);

  const [showModal, setShowModal] = useState(null);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    return () => setShowModal(false);
  }, []);
  
  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  // Open Add Topic Modal
  const handleAddTopicClick = () => {
    setSelectedTopic(null); // Reset any previous topic
    setModalMode("add");
    setShowModal(true);
  };

  // Open Edit Topic Modal
  const handleEditTopic = (topic) => {
    setSelectedTopic(topic); // Set topic for editing
    setModalMode("edit");
    setShowModal(true);
  };

  // Handle Add/Edit Form Submission
  const handleSaveTopic = (topicData) => {
    if (modalMode === "add") {
      dispatch(addTopic(topicData)).then(() => dispatch(fetchTopics())); // Refresh after adding
    } else {
      dispatch(updateTopic({ id: selectedTopic.id, ...topicData }))
      .then(() => dispatch(fetchTopics())); // Refresh after updating
    }
    setShowModal(false); // Close modal after action
  };
  
  const handleDeleteTopic = (id) => {
    dispatch(deleteTopic(id));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Topics</h2>
        <Button
          label="Add Topic"
          onClick={handleAddTopicClick}
          className="btn btn-success"
        />
      </div>
    
      <TopicModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveTopic}
        mode={modalMode}
        selectedTopic={selectedTopic}
      />

      {loading ? (
        <CircleLoader />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : topics.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <p className="text-muted">No topics found. Please add a topic to get started.</p>
        </div>
      ) : (
        <div className="row">
          {topics.map((topic) => (
            <div className="col-md-4" key={topic.id}>
              <TopicCard
                topic={topic}
                onEdit={handleEditTopic}
                onDelete={handleDeleteTopic}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topics;
