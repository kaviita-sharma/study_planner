import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import subjectReducer from './slices/subjectSlice';
import topicReducer from './slices/topicSlice';
import sessionReducer from './slices/sessionSlice';
import assessmentReducer from './slices/assessmentSlice';
import progressReducer from './slices/progressSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    subjects: subjectReducer,
    topics: topicReducer,
    sessions: sessionReducer,
    assessments: assessmentReducer,
    progress: progressReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;