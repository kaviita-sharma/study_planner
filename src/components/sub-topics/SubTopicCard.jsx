// src/components/study-sessions/SubTopicCard.jsx
import React,{ useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import { deleteSubTopic, fetchSubTopics } from "../../slices/subTopicSlice";
import { useDispatch } from "react-redux";
import SessionForm from "../study-sessions/SessionForm";
import { createSession } from "../../slices/sessionSlice";

const SubTopicCard = ({ subTopic, topicId, onEdit, onStartSession, onCreateSession, selectedSubTopic}) => {
  const dispatch = useDispatch();
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [prefillData, setPrefillData] = useState(null);


  const handleDeleteSubTopic = () => {
    dispatch(deleteSubTopic(subTopic.id)).then(() => dispatch(fetchSubTopics()));
  };

  const handleSessionButtonClick = () => {
    if (subTopic.sessionId) {
      onStartSession(subTopic);
    } else {
      onCreateSession(subTopic); 
      setShowSessionForm((prev) => !prev);
    }
  };

    // When the session form is submitted, pass the subtopic along with the session data
    const handleSessionFormSubmit = (sessionData) => { 
      const newSession = { ...sessionData, ...prefillData };
      console.log("LOGGINGGG",newSession,selectedSubTopic);
      const subTopicId = selectedSubTopic.id;
      console.log("LOGGINGG",newSession,subTopicId);
      dispatch(createSession({ session: newSession, subTopicId }));
      setPrefillData(null);
      close();
    };

    const handleCancelSessionForm = () => {
      setShowSessionForm(false);
    };

  return (
    <div className="mb-2">
      <Card className="border rounded-3">
        <div className="card-body p-2">
          <h6 className="card-title">{subTopic.subTopicName}</h6>
          <p className="card-text mb-1">
            <strong>Difficulty:</strong> {subTopic.difficultyLevel || "-"} <br />
            <strong>Est. Time:</strong> {subTopic.estimatedCompletionTime || "-"} minutes
          </p>
          <div className="d-flex">
            <Button
              onClick={()=> onEdit(subTopic)}
              label="Edit"
              className="btn-warning me-2 btn-sm"
            />
            <Button
              onClick={handleDeleteSubTopic}
              label="Delete"
              className="btn-danger btn-sm"
            />
          </div>
          <div className="d-flex mt-2">
            <Button
              onClick={handleSessionButtonClick}
              label={subTopic.sessionId ? "Start Session" : "Create Session"}
              className={subTopic.sessionId ? "btn-success btn-sm me-2" : "btn-info btn-sm me-2"}
            />
          </div>
          {showSessionForm && (
            <div className="mt-3">
              <SessionForm
                onAdd={handleSessionFormSubmit}
                onCancel={handleCancelSessionForm}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SubTopicCard;
