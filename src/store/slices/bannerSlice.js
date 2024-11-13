import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../apis/fetcher";

// call api banner
export const bannerApi = createAsyncThunk("banner/bannerApi", async () => {
  try {
    const response = await fetcher.get(`/QuanLyPhim/LayDanhSachBanner`);
    console.log(response.data.content);
    return response.data.content;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
});

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banner: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bannerApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bannerApi.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.banner = payload;
      })
      .addCase(bannerApi.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default bannerSlice.reducer;
