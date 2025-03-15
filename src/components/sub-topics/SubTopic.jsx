// In SubTopics.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubTopics, addSubTopic, deleteSubTopic,updateSubTopic } from "../../slices/subTopicSlice";
import SubtopicCard from "./SubTopicCard";
import CircleLoader from "../common/Loader";
import SubtopicModal from "./SubtopicModal";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { createSession } from "../../slices/sessionSlice";

const SubTopics = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subTopics, loading, error } = useSelector((state) => state.subTopics);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [selectedSubTopic, setSelectedSubTopic] = useState(null);
    const [prefillData, setPrefillData] = useState(null);

  useEffect(() => {
    dispatch(fetchSubTopics());
  }, [dispatch]);

  const handleAddSubTopicClick = () => {
    setSelectedSubTopic(null);
    setModalMode("add");
    setShowModal(true);
  };

  const handleEditSubTopic = (subTopic, updatedName) => {
    setSelectedSubTopic(subTopic);
    setModalMode("edit");
    setShowModal(true);
    // Implement edit logic here (not detailed in this snippet)
    console.log("Editing subtopic:", subTopic, updatedName);
  };

  const handleSaveSubTopic = (subTopicData) => {
    if (modalMode === "add") {
      dispatch(addSubTopic({ topicId: subTopicData.TopicId, subTopicData })).then(() =>
        dispatch(fetchSubTopics())
      );
    } else {
      console.log("here-->",selectedSubTopic.id, subTopicData);
      dispatch(updateSubTopic({id:selectedSubTopic.id,subTopicData:subTopicData})).then(() =>
        dispatch(fetchSubTopics())
      );
    }
    setShowModal(false);
  };

  const handleDeleteSubTopic = (id) => {
    dispatch(deleteSubTopic(id));
  };

  // Callback for when a subtopic already has a session (redirect to session detail page)
  const handleStartSession = (subTopic) => {
    // For example, redirect to /session/:id where you show subtopic details, timer, and feedback form.
    // You may pass subTopic as state.
    navigate(`/session/${subTopic.sessionId}`, { state: { subTopic } });
  };

  // Callback for when no session exists (open session creation modal)
  const handleCreateSession = (subTopic, sessionData) => {
    setSelectedSubTopic(subTopic); // Set the selected subtopic
    const newSession = { ...sessionData, ...prefillData };
    const subTopicId = subTopic.id; // Now it will have a valid value
    console.log(newSession, subTopicId);
    dispatch(createSession({ session: newSession, subTopicId }));
    setPrefillData(null);
  };
  console.log("line 74",selectedSubTopic);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>SubTopics</h2>
        <Button
          label="Add SubTopic"
          onClick={handleAddSubTopicClick}
          className="btn btn-success"
        />
      </div>
      <SubtopicModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveSubTopic}
        onAdd={handleSaveSubTopic}
        mode={modalMode}
        selectedSubtopic={selectedSubTopic}
      />
      {loading ? (
        <CircleLoader />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : subTopics.length === 0 ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "60vh" }}
        >
          <p className="text-muted">
            No subtopics found. Please add a subtopic to get started.
          </p>
        </div>
      ) : (
        <div className="row">
          {subTopics.map((subTopic) => (
            <div className="col-md-4" key={subTopic.id}>
              <SubtopicCard
                subTopic={subTopic}
                onEdit={handleEditSubTopic}
                onDelete={handleDeleteSubTopic}
                onStartSession={handleStartSession}
                onCreateSession={handleCreateSession}
                selectedSubTopic={selectedSubTopic}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubTopics;
