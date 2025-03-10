import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import subjectsReducer from "./slices/subjectSlice";
import topicsReducer from "./slices/topicSlice";
import assessmentsReducer from "./slices/assessmentSlice";
import progressReducer from "./slices/progressSlice";
import sessionsReducer from "./slices/sessionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    subjects: subjectsReducer,
    topics: topicsReducer,
    assessments: assessmentsReducer,
    progress: progressReducer,
    sessions: sessionsReducer,
  },
});

export default store;
