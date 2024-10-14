import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "", type: "" },
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotifcation(state, action) {
      return { message: "", type: "" };
    },
  },
});

// Export the reducer function
export default notificationSlice.reducer;

// Export the action creators
export const { setNotification, removeNotifcation } = notificationSlice.actions;

////////////////////// Action creators with redux-thunk ////////////////////////
export const setNotificationWithTimeout = (notification, time) => {
  return async (dispatch) => {
    dispatch(setNotification(notification));
    setTimeout(() => {
      dispatch(removeNotifcation());
    }, time);
  };
};
