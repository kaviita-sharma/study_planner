import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../utils/config';

const getToken = () => localStorage.getItem("token");
const token = getToken();

const ProgressBlock = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch progress data when the component mounts
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/progress`,{
        headers: { "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
         },
      })
      .then(response => {
        setProgressData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-5">Loading progress...</div>;
  }

  if (error) {
    return <div className="text-center p-5 text-danger">Error: {error}</div>;
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Progress</h1>
      {progressData.map(item => (
        <div key={item.id} className="card mb-4">
          <div className="card-body">
            <div className="mb-2">
              <strong>Subject Name:</strong> {item.subjectName}
            </div>
            <div className="mb-2">
              <strong>Topic Name:</strong> {item.topicName}
            </div>
            <div className="mb-2">
              <strong>Subtopic Name:</strong> {item.subTopicName}
            </div>
            <div className="mb-2">
              <strong>Confidence Level:</strong> {item.confidenceLevel}
            </div>
            <div className="mb-2">
              <strong>Last Revision Date:</strong> {new Date(item.lastStudyDate).toLocaleString()}
            </div>
            <div className="mb-2">
              <strong>Next Revision Date:</strong> {new Date(item.nextReviewDate).toLocaleString()}
            </div>
            <div className="progress" style={{ height: "25px", width: "100%" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${item.completionPercentage}%` }}
                aria-valuenow={item.completionPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {item.completionPercentage}%
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBlock;
