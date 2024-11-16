import { configureStore } from "@reduxjs/toolkit";
import bannerSlice from "./slices/bannerSlice";
import homeSlice from "./slices/homeSlice";
import listCinemaSlice  from "./slices/listCinemaSlice";
import listCinemaSystemSlice from "./slices/listCinemaSystem"
import listShowTimeMovie from "./slices/listShowTimeMovie";
// Tạo store
export const store = configureStore({
  reducer: {
    banner: bannerSlice,
    home: homeSlice,
    listCinema: listCinemaSlice,
    cinemaSystem : listCinemaSystemSlice,
    movieTime : listShowTimeMovie,
  },
});

export default store;
