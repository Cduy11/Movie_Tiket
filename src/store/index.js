import { configureStore } from "@reduxjs/toolkit";
import bannerSlice from "./slices/bannerSlice";
import homeSlice from "./slices/homeSlice";
import cinemaSlice from "./slices/cinemaSlice";
import bookingSlice from "./slices/bookingSlice";
import authSlice from "./slices/authSlice";
// Tạo store
export const store = configureStore({
  reducer: {
    banner: bannerSlice,
    home: homeSlice,
    cinema: cinemaSlice,
    bookingSeat: bookingSlice,
    auth: authSlice,
  },
});

export default store;
