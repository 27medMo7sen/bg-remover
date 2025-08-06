import { createSlice } from "@reduxjs/toolkit";

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    uploadedImage: null,
    images: [],
  },
  reducers: {
    setImages: (state, action) => {
      state.images = [action.payload, ...state.images];
    },
    pushImage: (state, action) => {
      state.images.push(action.payload);
    },
    setUploadedImage: (state, action) => {
      state.uploadedImage = action.payload;
    },
  },
});

export const { setImages, pushImage, setUploadedImage } = gallerySlice.actions;

export default gallerySlice.reducer;
