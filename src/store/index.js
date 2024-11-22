import { configureStore } from "@reduxjs/toolkit";
import bannerSlice from "./slices/bannerSlice";
import homeSlice from "./slices/homeSlice";
import cinemaSlice from "./slices/cinemaSlice";
import bookingSlice from "./slices/bookingSlice";
// Tạo store
export const store = configureStore({
  reducer: {
    banner: bannerSlice,
    home: homeSlice,
    cinema: cinemaSlice,
    booking: bookingSlice
  },
});

export default store;
