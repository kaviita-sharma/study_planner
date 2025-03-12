import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTopics = createAsyncThunk("topics/fetchTopics", async () => {
  const response = await axios.get(
    "https://bcd7-2401-4900-1c52-18be-10e1-866a-521b-6a54.ngrok-free.app/api/Topics",
    {
      headers: { "ngrok-skip-browser-warning": "true" },
    }
  );
  return response.data;
});

export const getTopicForSubject = createAsyncThunk(
  "topics/getTopicForSubject",
  async (subjectId) => {
    const response = await axios.get(
      `https://bcd7-2401-4900-1c52-18be-10e1-866a-521b-6a54.ngrok-free.app/api/Topics/Subject/${subjectId}`,
      {
        headers: { "ngrok-skip-browser-warning": "true" },
      }
    );
    return response.data;
  }
);

export const addTopic = createAsyncThunk(
  "topics/addTopic",
  async (topicData) => {
    const response = await axios.post(
      "https://bcd7-2401-4900-1c52-18be-10e1-866a-521b-6a54.ngrok-free.app/api/Topics",
      topicData,
      {
        headers: { "ngrok-skip-browser-warning": "true" },
      }
    );
    return response.data;
  }
);

export const updateTopic = createAsyncThunk(
  "topics/updateTopic",
  async (topicData) => {
    const response = await axios.put(
      `https://bcd7-2401-4900-1c52-18be-10e1-866a-521b-6a54.ngrok-free.app/api/Topics/${topicData.id}`,
      topicData,
      {
        headers: { "ngrok-skip-browser-warning": "true" },
      }
    );
    return response.data;
  }
);

export const deleteTopic = createAsyncThunk(
  "topics/deleteTopic",
  async (id) => {
    await axios.delete(
      `https://bcd7-2401-4900-1c52-18be-10e1-866a-521b-6a54.ngrok-free.app/api/Topics/${id}`,
      {
        headers: { "ngrok-skip-browser-warning": "true" },
      }
    );
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
      .addCase(getTopicForSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTopicForSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(getTopicForSubject.rejected, (state, action) => {
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
