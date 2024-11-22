import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../apis/fetcher";

// Gọi API lấy thông tin cụm rạp
export const listCinemaComplexApi = createAsyncThunk(
  "cinema/listCinemaComplexApi",
  async () => {
    try {
      const response = await fetcher.get(`/QuanLyRap/LayThongTinHeThongRap`);
      return response.data.content;
    } catch (error) {
      console.error("Error fetching cinema data:", error);
      throw error.response ? error.response.data.message : error.message;
    }
  }
);

// Gọi API lấy thông tin hệ thống rạp
export const listCinemaSystemApi = createAsyncThunk(
  "cinema/listCinemaSystemApi",
  async ({ maHeThongRap }) => {
    try {
      const response = await fetcher.get(
        `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
      );
      return response.data.content;
    } catch (error) {
      throw error.response ? error.response.data.message : error.message;
    }
  }
);

// Gọi API lấy lịch chiếu phim
export const listShowTimeMovieApi = createAsyncThunk(
  "cinema/listShowTimeMovieApi",
  async ({ group = "GP01" }) => {
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

// call api lấy thông tin lịch chiếu phim theo hệ thống rạp
export const getShowTimeMovieSystemApi = createAsyncThunk(
  "cinema/getShowTimeMovieSystemApi",
  async ({ maPhim }) => {
    try {
      const response = await fetcher.get(
        `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
      );
      return response.data.content;
    } catch (error) {
      throw error.response ? error.response.data.message : error.message;
    }
  }
);


const cinemaSlice = createSlice({
  name: "cinema",
  initialState: {
    listCinema: [],
    cinemaSystem: [],
    movieTime: [],
    showTimeMovieSystem: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listCinemaComplexApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listCinemaComplexApi.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.listCinema = payload;
      })
      .addCase(listCinemaComplexApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(listCinemaSystemApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listCinemaSystemApi.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.cinemaSystem = payload;
      })
      .addCase(listCinemaSystemApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(listShowTimeMovieApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listShowTimeMovieApi.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.movieTime = payload;
      })
      .addCase(listShowTimeMovieApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getShowTimeMovieSystemApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShowTimeMovieSystemApi.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.showTimeMovieSystem = payload;
      })
      .addCase(getShowTimeMovieSystemApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default cinemaSlice.reducer;