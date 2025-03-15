import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTopicForSubject } from "../../slices/topicSlice";
import { getSubTopicsForTopic, addSubTopic, updateSubTopic} from "../../slices/subTopicSlice";
import CircleLoader from "../common/Loader";
import Button from "../common/Button";
import SubTopicCard from "../sub-topics/SubTopicCard";
import SubTopicModal from "../sub-topics/SubtopicModal";

const TopicDetails = () => {
  const {topicId } = useParams();
  const {subjectId} = useParams();
  const dispatch = useDispatch();

  // Get topic data from Redux store
  const { topics, loading: topicLoading, error: topicError } = useSelector((state) => state.topics);
  const { subTopics, loading: subtopicsLoading, error: subtopicsError } = useSelector((state) => state.subTopics);

  const [showSubtopicModal, setShowSubtopicModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [selectedSubtopic, setSelectedSubtopic] = useState(false);

  // Fetch topic details and subTopics on mount or when topicId changes
  useEffect(() => {
    dispatch(getTopicForSubject(subjectId));
    dispatch(getSubTopicsForTopic(topicId));
  }, [dispatch, subjectId,topicId]);

  // Debug: Check loading states
  useEffect(() => {}, [topicLoading, subtopicsLoading]);


  // Find the topic from the topics array (Ensure topicId matches correctly)
  const topic = topics.find((t) => t.topicId.toString() === topicId.toString());
  
  // Force re-render if topic updates
  useEffect(() => {}, [topic]);

  useEffect(() => {}, [subTopics]);

  // Use the subTopics returned by getSubtopicsForTopic API (ensure it's an array)
  const topicSubtopics = Array.isArray(subTopics) ? subTopics : [];

  // Fix: Ensure loader only shows when necessary
  if (topicLoading || subtopicsLoading || (topics.length > 0 && !topic)) {
    return <CircleLoader />;
  }

  const handleAddSubtopicClick = () => {
    setSelectedSubtopic(null);
    setModalMode("add");
    setShowSubtopicModal(true);
  };

  const handleEditSubtopic = (subTopic) => {
    setSelectedSubtopic(subTopic);
    setModalMode("edit");
    setShowSubtopicModal(true);
  };

  const handleSaveSubtopic = (subtopicData) => {
    if (modalMode === "edit") {
      console.log("hi",subtopicData);
      dispatch(updateSubTopic({ id:selectedSubtopic.id ,subTopicData: subtopicData }))
        .then(() => dispatch(getSubTopicsForTopic(topicId))); // Refresh subTopics after update
    } else {
      dispatch(addSubTopic({topicId: parseInt(topicId, 10), subTopicData: subtopicData}))
        .then(() => dispatch(getSubTopicsForTopic(topicId))); // Refresh subTopics after addition
    }
    setShowSubtopicModal(false);
  };

  const handleCreateSession = (subTopic) => {
    setSelectedSubtopic(subTopic);
  };
  
  return (
    <div className="container mt-4">
      {topicError && <div className="alert alert-danger">{topicError}</div>}
      {subtopicsError && <div className="alert alert-danger">{subtopicsError}</div>}

      <h2>{topic?.topicName}</h2>
      <p>
        <strong>Difficulty:</strong> {topic.difficultyLevel} <br />
        <strong>Am I Reading this:</strong> {topic.isActive || "-"} <br />
        <strong>Estimated completion Time:</strong> {topic.estimatedCompletionTime || "-"} mins
      </p>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Subtopics</h3>
        <Button
          label="Add Subtopic"
          onClick={handleAddSubtopicClick}
          className="btn btn-success"
        />
      </div>

      <SubTopicModal
        show={showSubtopicModal}
        onClose={() => setShowSubtopicModal(false)}
        onSave={handleSaveSubtopic}
        mode={modalMode}
        selectedSubtopic={selectedSubtopic}
      />

      {topicSubtopics.length === 0 ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "40vh" }}
        >
          <p className="text-muted">
            No subTopics found. Please add a subtopic to get started.
          </p>
        </div>
      ) : (
        <div className="row">
          {topicSubtopics.map((subTopic) => (
            <div className="col-md-6" key={subTopic.id}>
              <SubTopicCard subTopic={subTopic} 
              topicId={topicId} 
              onEdit={handleEditSubtopic} 
              onCreateSession={handleCreateSession}
              selectedSubTopic={selectedSubtopic}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicDetails;
