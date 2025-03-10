import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to get the user's profile
export const getProfile = createAsyncThunk("auth/getProfile", async () => {
  const response = await axios.get("/api/auth/profile");
  return response.data; // This returns a UserProfileResponse
});

// Thunk for user login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch }) => {
    const response = await axios.post("/api/auth/login", credentials);
    const data = response.data; // AuthResponse
    if (data.Success) {
      // Set the token in axios for subsequent calls
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.Token}`;
      dispatch(getProfile());
    }
    return data;
  }
);

// Thunk for user registration
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { dispatch }) => {
    const response = await axios.post("/api/auth/register", userData);
    const data = response.data; // AuthResponse
    if (data.Success) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.Token}`;
      dispatch(getProfile());
    }
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Will store the UserProfileResponse object
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      delete axios.defaults.headers.common["Authorization"];
    },
  },
  extraReducers: (builder) => {
    builder
      // Login handlers
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.Success) {
          state.token = action.payload.Token;
        } else {
          state.error = action.payload.Message;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Register handlers
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.Success) {
          state.token = action.payload.Token;
        } else {
          state.error = action.payload.Message;
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Get profile handlers
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // UserProfileResponse is stored here
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
