import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    drawer: false,
  },
  reducers: {
    openDrawer: (state) => {
      state.drawer = true;
    },
    closeDrawer: (state) => {
      state.drawer = false;
    },
  },
});

export const { openDrawer, closeDrawer } = uiSlice.actions;

export default uiSlice.reducer;
