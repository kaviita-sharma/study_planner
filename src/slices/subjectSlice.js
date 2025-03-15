import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../utils/config";

// Helper function to get the token
const getToken = () => localStorage.getItem("token");
const token = getToken();

// Fetch all subjects
export const fetchSubjects = createAsyncThunk(
  "subjects/fetchSubjects",
  async () => {
    const response = await axios.get(`${API_BASE_URL}/api/Subjects`, {
      headers: { "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
       },
    });
    return response.data;
  }
);

// Fetch subject by id
export const fetchSubjectById = createAsyncThunk(
  "subjects/fetchSubjectById",
  async (id) => {
    const response = await axios.get(`${API_BASE_URL}/api/Subjects/${id}`, {
      headers: { "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
       },
    });
    return response.data;
  }
);

// Add a new subject
export const addSubject = createAsyncThunk(
  "subjects/addSubject",
  async (subjectData) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/Subjects/AddSubjectWithDetails`,
      subjectData,
      { headers: { "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
       },
       }
    );
    return response.data;
  }
);

// Update an existing subject
export const updateSubject = createAsyncThunk(
  "subjects/updateSubject",
  async (subjectData) => {
    const response = await axios.put(
      `${API_BASE_URL}/api/Subjects/${subjectData.id}`,
      subjectData,
      { headers: { "ngrok-skip-browser-warning": "true" ,
        Authorization: `Bearer ${token}`,
      }, }
    );
    return response.data;
  }
);

// Delete a subject
export const deleteSubject = createAsyncThunk(
  "subjects/deleteSubject",
  async (id) => {
    await axios.delete(`${API_BASE_URL}/api/Subjects/${id}`, {
      headers: { "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
       },
    });
    return id;
  }
);

// New API: Fetch subject statistics
export const fetchSubjectStatistics = createAsyncThunk(
  "subjects/fetchSubjectStatistics",
  async () => {
    const response = await axios.get(`${API_BASE_URL}/api/Subjects/Statistics`, {
      headers: { "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
       },
    });
    return response.data;
  }
);

const subjectsSlice = createSlice({
  name: "subjects",
  initialState: {
    subjects: [],
    statistics: {}, // Added for statistics data
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchSubjects
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fetchSubjectById
      .addCase(fetchSubjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubjectById.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally, update the subjects array or store the single subject separately
      })
      .addCase(fetchSubjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // addSubject
      .addCase(addSubject.fulfilled, (state, action) => {
        state.subjects.push(action.payload);
      })
      // updateSubject
      .addCase(updateSubject.fulfilled, (state, action) => {
        const index = state.subjects.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) state.subjects[index] = action.payload;
      })
      // deleteSubject
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.subjects = state.subjects.filter((s) => s.id !== action.payload);
      })
      // fetchSubjectStatistics
      .addCase(fetchSubjectStatistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubjectStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(fetchSubjectStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default subjectsSlice.reducer;
