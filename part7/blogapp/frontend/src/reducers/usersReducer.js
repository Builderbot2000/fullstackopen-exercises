import { createSlice } from "@reduxjs/toolkit";
import users from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const loadUsers = () => {
  return async (dispatch) => {
    const usersInfo = await users.getAll();
    dispatch(setUsers(usersInfo));
  };
};

export default usersSlice.reducer;
