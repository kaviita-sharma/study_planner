import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTopics = createAsyncThunk("topics/fetchTopics", async () => {
  const response = await axios.get("/api/Topics");
  return response.data;
});

export const addTopic = createAsyncThunk(
  "topics/addTopic",
  async (topicData) => {
    const response = await axios.post("/api/Topics", topicData);
    return response.data;
  }
);

export const updateTopic = createAsyncThunk(
  "topics/updateTopic",
  async (topicData) => {
    const response = await axios.put(`/api/Topics/${topicData.id}`, topicData);
    return response.data;
  }
);

export const deleteTopic = createAsyncThunk(
  "topics/deleteTopic",
  async (id) => {
    await axios.delete(`/api/Topics/${id}`);
    return id;
  }
);

const topicsSlice = createSlice({
  name: "topics",
  initialState: {
    topics: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTopic.fulfilled, (state, action) => {
        state.topics.push(action.payload);
      })
      .addCase(updateTopic.fulfilled, (state, action) => {
        const index = state.topics.findIndex(
          (topic) => topic.id === action.payload.id
        );
        if (index !== -1) state.topics[index] = action.payload;
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        state.topics = state.topics.filter(
          (topic) => topic.id !== action.payload
        );
      });
  },
});
export default topicsSlice.reducer;
