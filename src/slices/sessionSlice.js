import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSessions = createAsyncThunk(
  "sessions/fetchSessions",
  async () => {
    const response = await axios.get("/api/study-sessions");
    return response.data;
  }
);

export const addSession = createAsyncThunk(
  "sessions/addSession",
  async (sessionData) => {
    const response = await axios.post("/api/study-sessions", sessionData);
    return response.data;
  }
);

export const updateSession = createAsyncThunk(
  "sessions/updateSession",
  async (sessionData) => {
    const response = await axios.put(
      `/api/study-sessions/${sessionData.id}`,
      sessionData
    );
    return response.data;
  }
);

export const deleteSession = createAsyncThunk(
  "sessions/deleteSession",
  async (id) => {
    await axios.delete(`/api/study-sessions/${id}`);
    return id;
  }
);

const sessionsSlice = createSlice({
  name: "sessions",
  initialState: {
    sessions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(addSession.fulfilled, (state, action) => {
        state.sessions.push(action.payload);
      })
      .addCase(updateSession.fulfilled, (state, action) => {
        const index = state.sessions.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) state.sessions[index] = action.payload;
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter((s) => s.id !== action.payload);
      });
  },
});

export default sessionsSlice.reducer;
