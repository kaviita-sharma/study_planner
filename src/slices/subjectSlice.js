import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSubjects = createAsyncThunk(
  "subjects/fetchSubjects",
  async () => {
    const response = await axios.get("/api/Subjects");
    return response.data;
  }
);

export const addSubject = createAsyncThunk(
  "subjects/addSubject",
  async (subjectData) => {
    const response = await axios.post(
      "/api/Subjects/AddSubjectWithDetails",
      subjectData
    );
    return response.data;
  }
);

export const updateSubject = createAsyncThunk(
  "subjects/updateSubject",
  async (subjectData) => {
    const response = await axios.put(
      `/api/Subjects/${subjectData.id}`,
      subjectData
    );
    return response.data;
  }
);

export const deleteSubject = createAsyncThunk(
  "subjects/deleteSubject",
  async (id) => {
    await axios.delete(`/api/Subjects/${id}`);
    return id;
  }
);

const subjectsSlice = createSlice({
  name: "subjects",
  initialState: {
    subjects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(addSubject.fulfilled, (state, action) => {
        state.subjects.push(action.payload);
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        const index = state.subjects.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) state.subjects[index] = action.payload;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.subjects = state.subjects.filter((s) => s.id !== action.payload);
      });
  },
});
export default subjectsSlice.reducer;
