import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProgress = createAsyncThunk(
  "progress/fetchProgress",
  async () => {
    const response = await axios.get("/api/Progress");
    return response.data;
  }
);

export const addProgress = createAsyncThunk(
  "progress/addProgress",
  async (progressData) => {
    const response = await axios.post("/api/Progress", progressData);
    return response.data;
  }
);

export const updateProgress = createAsyncThunk(
  "progress/updateProgress",
  async (progressData) => {
    const response = await axios.put(
      `/api/Progress/${progressData.id}`,
      progressData
    );
    return response.data;
  }
);

export const deleteProgress = createAsyncThunk(
  "progress/deleteProgress",
  async (id) => {
    await axios.delete(`/api/Progress/${id}`);
    return id;
  }
);

const progressSlice = createSlice({
  name: "progress",
  initialState: {
    progress: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(fetchProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProgress.fulfilled, (state, action) => {
        state.progress.push(action.payload);
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        const index = state.progress.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) state.progress[index] = action.payload;
      })
      .addCase(deleteProgress.fulfilled, (state, action) => {
        state.progress = state.progress.filter((p) => p.id !== action.payload);
      });
  },
});
export default progressSlice.reducer;
