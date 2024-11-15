import { configureStore } from "@reduxjs/toolkit";
import bannerSlice from "./slices/bannerSlice";
import homeSlice from "./slices/homeSlice";


// store tổng
export const store = configureStore({
    reducer:{
        // nơi chứa các reducer con
        banner: bannerSlice,
        home: homeSlice,
    }
})

export default store