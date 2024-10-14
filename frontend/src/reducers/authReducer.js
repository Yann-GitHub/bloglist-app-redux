import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/login"; // Assurez-vous d'avoir un service d'authentification
import blogService from "../services/blogs";
import { setNotificationWithTimeout } from "./notificationReducer";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle", // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      blogService.setToken(action.payload.token); // Set the token for the blogService
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// Export the reducer function
export default authSlice.reducer;

// Export the action creators
export const { setUser, clearUser, setStatus, setError } = authSlice.actions;

////////////////////// Action creators with redux-thunk ////////////////////////
export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      const user = await authService.login(credentials);
      dispatch(setUser({ user, token: user.token }));
      dispatch(setStatus("succeeded"));
      localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      dispatch(
        setNotificationWithTimeout(
          {
            message: "You are logged in 🎉",
            type: "success",
          },
          4000
        )
      );
    } catch (error) {
      dispatch(setError(error.response.data));
      dispatch(setStatus("failed"));
      dispatch(
        setNotificationWithTimeout(
          {
            message: "⛔️ Wrong credentials, try again !!",
            type: "error",
          },
          4000
        )
      );
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("loggedBlogappUser");
    dispatch(clearUser());
    blogService.setToken(null);
    dispatch(
      setNotificationWithTimeout(
        {
          message: "Logged out. Goodbye! 👋🏼",
          type: "success",
        },
        4000
      )
    );
  };
};
