// src/features/progress/progressSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for progress tracking
export const fetchUserProgress = createAsyncThunk(
  'progress/fetchUserProgress',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/progress/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const saveAssessmentResult = createAsyncThunk(
  'progress/saveAssessmentResult',
  async ({ userId, subjectId, assessmentData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/progress/assessments`, {
        userId,
        subjectId,
        ...assessmentData
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStrengthsWeaknesses = createAsyncThunk(
  'progress/fetchStrengthsWeaknesses',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/progress/${userId}/analysis`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  overallProgress: {},
  subjectProgress: [],
  assessmentResults: [],
  strengthsWeaknesses: {
    strengths: [],
    weaknesses: []
  },
  achievements: [],
  loading: false,
  error: null
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    resetProgressError: (state) => {
      state.error = null;
    },
    addAchievement: (state, action) => {
      state.achievements.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch user progress
      .addCase(fetchUserProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.overallProgress = action.payload.overallProgress;
        state.subjectProgress = action.payload.subjectProgress;
        state.assessmentResults = action.payload.assessmentResults;
        state.achievements = action.payload.achievements;
      })
      .addCase(fetchUserProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch progress data';
      })
      
      // Save assessment result
      .addCase(saveAssessmentResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveAssessmentResult.fulfilled, (state, action) => {
        state.loading = false;
        state.assessmentResults.push(action.payload);
        // Update relevant subject progress
        const subjectIndex = state.subjectProgress.findIndex(
          subject => subject.id === action.payload.subjectId
        );
        if (subjectIndex !== -1) {
          state.subjectProgress[subjectIndex].completionPercentage = 
            action.payload.newCompletionPercentage;
        }
      })
      .addCase(saveAssessmentResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to save assessment result';
      })
      
      // Fetch strengths/weaknesses
      .addCase(fetchStrengthsWeaknesses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStrengthsWeaknesses.fulfilled, (state, action) => {
        state.loading = false;
        state.strengthsWeaknesses = action.payload;
      })
      .addCase(fetchStrengthsWeaknesses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch analysis data';
      });
  }
});

export const { resetProgressError, addAchievement } = progressSlice.actions;

export default progressSlice.reducer;