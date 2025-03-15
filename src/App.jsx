import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
// import Subjects from "./components/Subjects";
import Subjects from "./components/subjects/Subjects";
import SubjectDetail from "./components/subjects/SubjectDetails";
import Sessions from "./pages/SessionPage";
import Topics from "./components/topics/Topics";
import TopicDetails from "./components/topics/TopicDetails";
import SubTopics from "./components/sub-topics/SubTopic";
//import Assessments from "./components/assessments/Assesment";
import Progress from "./pages/ProgressPage";
// import Sessions from "./components/Sessions";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Sessions1 from "./components/study-sessions/StudySessionPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subjects"
            element={
               <ProtectedRoute>
                <Subjects />
               </ProtectedRoute>
            }
          />
          <Route
            path="/subject/:subjectId"
            element={
               <ProtectedRoute>
                <SubjectDetail />
               </ProtectedRoute>
            }
          />
          <Route
            path="/topics"
            element={
              <ProtectedRoute>
                <Topics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/topics/:topicId/:subjectId"
            element={<TopicDetails />}
          />
          <Route
            path="/subTopics"
            element={
              <ProtectedRoute>
                <SubTopics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                <Progress />
              </ProtectedRoute>
            }
            />
          <Route
            path="/sessions"
            element={
              <ProtectedRoute>
                <Sessions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/session/:sessionId"
            element={
              <ProtectedRoute>
                <Sessions1 />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
