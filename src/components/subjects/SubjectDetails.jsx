import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects } from "../../slices/subjectSlice";
import { fetchTopics, addTopic } from "../../slices/topicSlice";
import CircleLoader from "../common/Loader";
import Button from "../common/Button";
import TopicCard from "../topics/TopicCard";
import TopicModal from "../topics/TopicModal";

const SubjectDetail = () => {
  const { subjectId } = useParams();
  const dispatch = useDispatch();
  const {
    subjects,
    loading: subjectLoading,
    error: subjectError,
  } = useSelector((state) => state.subjects);
  const {
    topics,
    loading: topicsLoading,
    error: topicsError,
  } = useSelector((state) => state.topics);
  const [showTopicModal, setShowTopicModal] = useState(false);

  useEffect(() => {
    if (!subjects.length) {
      dispatch(fetchSubjects());
    }
    dispatch(fetchTopics());
  }, [dispatch, subjects.length]);

  // Get the selected subject from subjects slice
  const subject = subjects.find((s) => s.id.toString() === subjectId);

  // Filter topics that belong to this subject (assuming topic has a SubjectId field)
  const subjectTopics = topics.filter(
    (t) => t.SubjectId === parseInt(subjectId, 10)
  );

  if (subjectLoading || topicsLoading || !subject) {
    return <CircleLoader />;
  }

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
          onClick={() => setShowTopicModal(true)}
          className="btn btn-success"
        />
      </div>

      <TopicModal
        show={showTopicModal}
        onClose={() => setShowTopicModal(false)}
        onAdd={(topicData) => {
          // Append the subjectId to the topic data before dispatching
          dispatch(
            addTopic({ ...topicData, SubjectId: parseInt(subjectId, 10) })
          );
          setShowTopicModal(false);
        }}
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
              <TopicCard topic={topic} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectDetail;
