import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { subjectApi } from '../../api/subjectApi';
import { toast } from 'react-toastify';

// Fetch all subjects
export const fetchSubjects = createAsyncThunk(
  'subjects/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await subjectApi.getAllSubjects();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch subjects');
    }
  }
);

// Fetch a subject by ID
export const fetchSubjectById = createAsyncThunk(
  'subjects/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await subjectApi.getSubjectById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch subject');
    }
  }
);

// Create a new subject
export const createSubject = createAsyncThunk(
  'subjects/create',
  async (subjectData, { rejectWithValue }) => {
    try {
      const response = await subjectApi.createSubject(subjectData);
      toast.success('Subject created successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create subject';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Update a subject
export const updateSubject = createAsyncThunk(
  'subjects/update',
  async ({ id, subjectData }, { rejectWithValue }) => {
    try {
      const response = await subjectApi.updateSubject(id, subjectData);
      toast.success('Subject updated successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update subject';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Delete a subject
export const deleteSubject = createAsyncThunk(
  'subjects/delete',
  async (id, { rejectWithValue }) => {
    try {
      await subjectApi.deleteSubject(id);
      toast.success('Subject deleted successfully');
      return id;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete subject';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  subjects: [],
  currentSubject: null,
  loading: false,
  error: null
};

const subjectSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    resetSubjectsState: (state) => {
      state.error = null;
      state.currentSubject = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all subjects
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.subjects = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch subject by ID
      .addCase(fetchSubjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubjectById.fulfilled, (state, action) => {
        state.currentSubject = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSubjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create subject
      .addCase(createSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.subjects.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update subject
      .addCase(updateSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        const index = state.subjects.findIndex((subject) => subject.id === action.payload.id);
        if (index !== -1) {
          state.subjects[index] = action.payload;
        }
        state.currentSubject = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete subject
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.subjects = state.subjects.filter((subject) => subject.id !== action.payload);
        if (state.currentSubject && state.currentSubject.id === action.payload) {
          state.currentSubject = null;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetSubjectsState } = subjectSlice.actions;
export default subjectSlice.reducer;