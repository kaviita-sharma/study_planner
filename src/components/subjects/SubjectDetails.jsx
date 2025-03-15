import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjectById } from "../../slices/subjectSlice";
import { getTopicForSubject, addTopic, updateTopic } from "../../slices/topicSlice";
import CircleLoader from "../common/Loader";
import Button from "../common/Button";
import TopicCard from "../topics/TopicCard";
import TopicModal from "../topics/TopicModal";

const SubjectDetail = () => {
  const { subjectId } = useParams();
  const dispatch = useDispatch();

  // Get subject data from subjects slice
  const {
    subjects,
    loading: subjectLoading,
    error: subjectError,
  } = useSelector((state) => state.subjects);

  // Get topics data from topics slice
  const {
    topics,
    loading: topicsLoading,
    error: topicsError,
  } = useSelector((state) => state.topics);

  const [showTopicModal, setShowTopicModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [selectedTopic, setSelectedTopic] = useState(false);

  // Fetch subject details and topics for this subject on mount or when subjectId changes
  useEffect(() => {
    dispatch(fetchSubjectById(subjectId));
    dispatch(getTopicForSubject(subjectId));
  }, [dispatch, subjectId]);

  // Find the subject from the subjects array
  const subject = subjects.find((s) => s.id.toString() === subjectId);

  // Use the topics returned by getTopicForSubject API (assumed to be an array)
  const subjectTopics = Array.isArray(topics) ? topics : [];

  if (subjectLoading || topicsLoading || !subject) {
    return <CircleLoader />;
  }

  const handleAddTopicClick = () => {
    setSelectedTopic(null);
    setModalMode("add");
    setShowTopicModal(true);
  };

  // Open modal for editing a topic
  const handleEditTopic = (topic) => {
    setSelectedTopic(topic);
    setModalMode("edit");
    setShowTopicModal(true);
  };

  // Handle add/update topic
  const handleSaveTopic = (topicData) => {
    if (modalMode === "edit") {
      dispatch(updateTopic({ id: selectedTopic.topicId, ...topicData }))
        .then(() => dispatch(getTopicForSubject(subjectId))); // Refresh topics after update
    } else {
      dispatch(addTopic({ ...topicData, SubjectId: parseInt(subjectId, 10) }))
        .then(() => dispatch(getTopicForSubject(subjectId))); // Refresh topics after addition
    }
    setShowTopicModal(false);
  };


  return (
    <div className="container mt-4">
      {subjectError && <div className="alert alert-danger">{subjectError}</div>}
      {topicsError && <div className="alert alert-danger">{topicsError}</div>}

      <h2>{subject.subjectName}</h2>
      <p>
        <strong>Status:</strong> {subject.status} <br />
        <strong>Difficulty:</strong> {subject.difficultyLevel || "-"} <br />
        <strong>Priority:</strong> {subject.priority || "-"}
      </p>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Topics</h3>
        <Button
          label="Add Topic"
          onClick={handleAddTopicClick}
          className="btn btn-success"
        />
      </div>

      <TopicModal
        show={showTopicModal}
        onClose={() => setShowTopicModal(false)}
        onSave={handleSaveTopic}
        mode={modalMode} // "add" or "edit"
        selectedTopic={selectedTopic} // Topic data for editing
      />


      {subjectTopics.length === 0 ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "40vh" }}
        >
          <p className="text-muted">
            No topics found. Please add a topic to get started.
          </p>
        </div>
      ) : (
        <div className="row">
          {subjectTopics.map((topic) => (
            <div className="col-md-6" key={topic.TopicId}>
              <TopicCard topic={topic} subjectId={subjectId} onEdit={handleEditTopic} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectDetail;
