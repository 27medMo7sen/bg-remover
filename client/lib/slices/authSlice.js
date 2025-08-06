import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload}`;
    },
  },
});
export const { setCredentials, clearCredentials, setUser, setToken } =
  authSlice.actions;
export default authSlice.reducer;
