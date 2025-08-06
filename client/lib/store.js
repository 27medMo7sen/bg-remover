import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import galleryReducer from "./slices/gallerySlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    gallery: galleryReducer,
  },
});
