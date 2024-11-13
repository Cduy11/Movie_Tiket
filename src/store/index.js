import { configureStore } from "@reduxjs/toolkit";
import bannerSlice from "./slices/bannerSlice";


// store tổng
export const store = configureStore({
    reducer:{
        // nơi chứa các reducer con
        banner: bannerSlice,
    }
})

export default store