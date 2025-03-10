import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAssessments = createAsyncThunk(
  "assessments/fetchAssessments",
  async () => {
    const response = await axios.get("/api/Assessments");
    return response.data;
  }
);

export const addAssessment = createAsyncThunk(
  "assessments/addAssessment",
  async (assessmentData) => {
    const response = await axios.post("/api/Assessments", assessmentData);
    return response.data;
  }
);

export const updateAssessment = createAsyncThunk(
  "assessments/updateAssessment",
  async (assessmentData) => {
    const response = await axios.put(
      `/api/Assessments/${assessmentData.id}`,
      assessmentData
    );
    return response.data;
  }
);

export const deleteAssessment = createAsyncThunk(
  "assessments/deleteAssessment",
  async (id) => {
    await axios.delete(`/api/Assessments/${id}`);
    return id;
  }
);

const assessmentsSlice = createSlice({
  name: "assessments",
  initialState: {
    assessments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssessments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAssessments.fulfilled, (state, action) => {
        state.loading = false;
        state.assessments = action.payload;
      })
      .addCase(fetchAssessments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAssessment.fulfilled, (state, action) => {
        state.assessments.push(action.payload);
      })
      .addCase(updateAssessment.fulfilled, (state, action) => {
        const index = state.assessments.findIndex(
          (a) => a.id === action.payload.id
        );
        if (index !== -1) state.assessments[index] = action.payload;
      })
      .addCase(deleteAssessment.fulfilled, (state, action) => {
        state.assessments = state.assessments.filter(
          (a) => a.id !== action.payload
        );
      });
  },
});
export default assessmentsSlice.reducer;
