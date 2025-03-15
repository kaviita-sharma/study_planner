import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../utils/config";

const getToken = () => localStorage.getItem("token");
const token = getToken();

export const fetchSubTopics = createAsyncThunk(
  "subTopics/fetchSubTopic",
  async () => {
    const response = await axios.get(`${API_BASE_URL}/api/SubTopics`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const getSubTopicsForTopic = createAsyncThunk(
  "subTopics/getSubTopicsForTopic",
  async (topicId) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/SubTopics/Topic/${topicId}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const addSubTopic = createAsyncThunk(
  "subTopics/addSubTopic",
  async ({ topicId = 30 , subTopicData }) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/SubTopics/${topicId}`,
      subTopicData,
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteSubTopic = createAsyncThunk(
  "subTopics/deleteSubTopic",
  async (id) => {
    await axios.delete(`${API_BASE_URL}/api/SubTopics/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  }
);

export const updateSubTopic = createAsyncThunk(
  "subTopics/updateSubTopic",
  async ({ id, subTopicData }, { rejectWithValue }) => {
    console.log("line 70", id, subTopicData);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/SubTopics/${id}`,
        subTopicData,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const subTopicSlice = createSlice({
  name: "subTopics",
  initialState: {
    subTopics: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubTopics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.subTopics = action.payload;
      })
      .addCase(fetchSubTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSubTopicsForTopic.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubTopicsForTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.subTopics = action.payload;
      })
      .addCase(getSubTopicsForTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addSubTopic.fulfilled, (state, action) => {
        state.loading = false; 
        state.subTopics.push(action.payload);
      })
      .addCase(deleteSubTopic.fulfilled, (state, action) => {
        state.subTopics = state.subTopics.filter(
          (subTopic) => subTopic.id !== action.payload
        );
      });
  },
});

export default subTopicSlice.reducer;
