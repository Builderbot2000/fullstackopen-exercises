import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {},
  reducers: {
    showNotification(state, action) {
      const content = action.payload;
      return content;
    },
    removeNotification(state, action) {
      return {};
    },
  },
});

export const { showNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (message, type, duration) => {
  return async (dispatch) => {
    dispatch(showNotification({ message: message, type: type }));
    setTimeout(() => {
      dispatch(removeNotification());
    }, duration);
  };
};

export default notificationSlice.reducer;
