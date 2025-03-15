// src/components/study-sessions/FeedbackForm.jsx
import React, { useState } from "react";

const FeedbackForm = () => {
  const [understanding, setUnderstanding] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedbackData = {
      understanding,
      comments,
    };
    console.log("Submitting feedback:", feedbackData);
    // Optionally dispatch to Redux or call an API
    setUnderstanding("");
    setComments("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Overall Understanding</label>
        <select
          className="form-select"
          value={understanding}
          onChange={(e) => setUnderstanding(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="clear">Clear</option>
          <option value="moderate">Moderate</option>
          <option value="confused">Confused</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Additional Comments</label>
        <textarea
          className="form-control"
          rows="3"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
