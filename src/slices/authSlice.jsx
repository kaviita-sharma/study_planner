import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_BASE_URL from "../utils/config";
import axios from "axios";

// Helper function to get the token
const getToken = () => localStorage.getItem("token");
const token = getToken();

// Thunk to get the user's profile
export const getProfile = createAsyncThunk("auth/getProfile", async () => {
  const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
    headers: { "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${token}`,
     },
  });
  return response.data; // This returns a UserProfileResponse
});

// Thunk for user login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch }) => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);
    const data = response.data; // AuthResponse
    if (data.success) {
      localStorage.setItem("token", data.token);
      // Set the token in axios for subsequent calls
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.Token}`;
      dispatch(getProfile());
    }
    return { user: data.user, token: data.token, message: data.message };
  }
);

// Thunk for user registration
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, userData);
      const data = response.data; // AuthResponse

      if (data.Success) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.Token}`;
        dispatch(getProfile());
      }
      return data;
    } catch (error) {
      if (error.response && error.response.status == 400) {
        return rejectWithValue(error.response?.data?.message ||
           "Registration failed. Please try again."
      ); // Send error message to Redux
      }
      return rejectWithValue("An unexpected error occurred.");
    }
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
        if (action.payload.success) { // Corrected property name
          state.token = action.payload.token; // Corrected property name
          state.user = action.payload.user; // Ensure user data is also stored
          localStorage.setItem("token", action.payload.token); // Persist token
        } else {
          state.error = action.payload.message; // Corrected property name
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
