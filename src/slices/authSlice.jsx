import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_BASE_URL from "../utils/config";
import axios from "axios";

// Get token from localStorage when initializing Redux state
const getToken = () => localStorage.getItem("token");

export const getProfile = createAsyncThunk("auth/getProfile", async (_, { getState }) => {
  const token = getState().auth.token; // Get latest token from Redux state

  if (!token) throw new Error("No token available"); // Prevent API call without token

  const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data; // UserProfileResponse
});

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);
      const data = response.data;

      if (data.success) {
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        dispatch(getProfile()); // Get user profile after login
      }
      return { user: data.user, token: data.token, message: data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed.");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, userData);
      const data = response.data;

      if (data.success) {
        localStorage.setItem("token", data.token);
        dispatch(getProfile());
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: getToken(), // Load token from localStorage on init
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token"); // Remove token from storage
      delete axios.defaults.headers.common["Authorization"];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.token) {
          state.token = action.payload.token;
          state.user = action.payload.user;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.token) {
          state.token = action.payload.token;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
