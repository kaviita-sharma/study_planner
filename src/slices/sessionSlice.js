// src/slices/sessionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../utils/config";

const getToken = () => localStorage.getItem("token");

export const fetchSessions = createAsyncThunk(
  "sessions/fetchSessions",
  async () => {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/api/study-sessions`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Expecting an array of sessions
  }
);

export const fetchSessionById = createAsyncThunk(
  "sessions/fetchSessionById",
  async (id) => {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/api/study-sessions/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // A single session object
  }
);

// src/slices/sessionSlice.js
export const createSession = createAsyncThunk(
  "sessions/createSession",
  async ({ session, subTopicId }, { rejectWithValue }) => {
    try {
      console.log("in slices",session,subTopicId);
      const token = getToken();
      let url = `${API_BASE_URL}/api/study-sessions`;
      if (subTopicId && subTopicId !== 0) {
        url += `?subTopicId=${subTopicId}`;
      }
      const response = await axios.post(url, session, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const updateSession = createAsyncThunk(
  "sessions/updateSession",
  async ({ id, updatedData }) => {
    const token = getToken();
    const response = await axios.put(`${API_BASE_URL}/api/study-sessions/${id}`, updatedData, {
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Updated session
  }
);

export const deleteSession = createAsyncThunk(
  "sessions/deleteSession",
  async (id) => {
    const token = getToken();
    await axios.delete(`${API_BASE_URL}/api/study-sessions/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
      },
    });
    return id; // Return deleted session ID
  }
);

const sessionSlice = createSlice({
  name: "sessions",
  initialState: {
    sessions: [],
    loading: false,
    error: null,
    selectedSession: null, // If you want to store a single session
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchSessions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch By ID
      .addCase(fetchSessionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSessionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSession = action.payload;
      })
      .addCase(fetchSessionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create
      .addCase(createSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions.push(action.payload);
      })
      .addCase(createSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update
      .addCase(updateSession.fulfilled, (state, action) => {
        const index = state.sessions.findIndex(
          (session) => session.id === action.payload.id
        );
        if (index !== -1) {
          state.sessions[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter(
          (session) => session.id !== action.payload
        );
      });
  },
});

export default sessionSlice.reducer;
