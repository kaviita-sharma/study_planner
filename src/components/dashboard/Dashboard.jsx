// src/components/Dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { fetchUserProfile } from '../../features/user/userSlice';
import { fetchSubjects } from '../../features/subjects/subjectSlice';
import { fetchUpcomingSessions } from '../../features/sessions/sessionSlice';
import { fetchUserProgress } from '../../features/progress/progressSlice';
import { getAdaptiveRecommendations } from '../../features/ai/aiRecommendationSlice';
import ProgressOverview from '../Progress/ProgressOverview';
import UpcomingSessionsList from '../Sessions/UpcomingSessionsList';
import SubjectList from '../Subjects/SubjectList';
import RecommendationsPanel from '../AI/RecommendationsPanel';
import Calendar from '../Calendar/Calendar';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [view, setView] = useState('daily'); // daily, weekly, monthly
  const user = useSelector(state => state.user.profile);
  const subjects = useSelector(state => state.subjects.subjects);
  const upcomingSessions = useSelector(state => state.sessions.upcomingSessions);
  const progress = useSelector(state => state.progress.overallProgress);
  const recommendations = useSelector(state => state.aiRecommendation.recommendations);
  const loading = useSelector(state => 
    state.user.loading || 
    state.subjects.loading || 
    state.sessions.loading || 
    state.progress.loading ||
    state.aiRecommendation.loading
  );
  const error = useSelector(state => 
    state.user.error || 
    state.subjects.error || 
    state.sessions.error || 
    state.progress.error ||
    state.aiRecommendation.error
  );

  useEffect(() => {
    // Assuming we have the userId from auth
    const userId = localStorage.getItem('userId'); // or from auth context
    if (userId) {
      dispatch(fetchUserProfile(userId));
      dispatch(fetchSubjects(userId));
      dispatch(fetchUpcomingSessions(userId));
      dispatch(fetchUserProgress(userId));
      dispatch(getAdaptiveRecommendations(userId));
    }
  }, [dispatch]);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          Error: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="dashboard-container py-4">
      <Row className="mb-4">
        <Col>
          <h1>Welcome back, {user?.name || 'Student'}!</h1>
          <p className="text-muted">Let's optimize your learning today.</p>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <div className="btn-group">
            <Button 
              variant={view === 'daily' ? 'primary' : 'outline-primary'} 
              onClick={() => handleViewChange('daily')}
            >
              Daily
            </Button>
            <Button 
              variant={view === 'weekly' ? 'primary' : 'outline-primary'} 
              onClick={() => handleViewChange('weekly')}
            >
              Weekly
            </Button>
            <Button 
              variant={view === 'monthly' ? 'primary' : 'outline-primary'} 
              onClick={() => handleViewChange('monthly')}
            >
              Monthly
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Calendar view={view} />
        </Col>
        <Col md={4}>
          <ProgressOverview progress={progress} />
          <Card className="mt-3">
            <Card.Header as="h5">Quick Stats</Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Subjects:</span>
                <span className="fw-bold">{subjects?.length || 0}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Upcoming Sessions:</span>
                <span className="fw-bold">{upcomingSessions?.length || 0}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Overall Completion:</span>
                <span className="fw-bold">{progress?.completionPercentage || 0}%</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Study Streak:</span>
                <span className="fw-bold">{user?.studyStreak || 0} days</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Row>
            <Col md={12} className="mb-4">
              <UpcomingSessionsList sessions={upcomingSessions} />
            </Col>
            <Col md={12}>
              <SubjectList subjects={subjects} />
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <RecommendationsPanel recommendations={recommendations} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;