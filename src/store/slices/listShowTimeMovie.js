import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../apis/fetcher";

export const listShowTimeMovieApi = createAsyncThunk(
  "movieTime/listShowTimeMovieApi",
  async ({group = "GP01"}) => {
    try {
      const response = await fetcher.get(
        `/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${group}`
      );

      return response.data.content;
    } catch (error) {
      throw error.response ? error.response.data.message : error.message;
    }
  }
);

const listShowTimeMovieSlice = createSlice({
  name: "movieTime",
  initialState: {
    movieTime: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listShowTimeMovieApi.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(listShowTimeMovieApi.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.movieTime = payload;
      })
      .addCase(listShowTimeMovieApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default listShowTimeMovieSlice.reducer
