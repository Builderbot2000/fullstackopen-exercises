import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";
import login from "../services/login";
import storage from "../services/storage";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { loginToUser, logoutFromUser, setUser } = userSlice.actions;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await login.login({ username, password });
      dispatch(setUser(user));
      storage.saveUser(user);
      dispatch(setNotification("welcome!", "info", 1000));
    } catch (e) {
      dispatch(setNotification("wrong username or password", "error", 1000));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(setUser(null));
    storage.removeUser();
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    const user = storage.loadUser();
    dispatch(setUser(user));
  };
};

export default userSlice.reducer;
