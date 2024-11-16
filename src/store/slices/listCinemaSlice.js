import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../apis/fetcher";

// call API lấy thông tin cụm rạp
export const listCinemaComplexApi = createAsyncThunk(
  "listCinema/listCinemaComplexApi",
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

const listCinemaSlice = createSlice({
  name: "listCinema",
  initialState: {
    listCinema: [], // Dữ liệu cụm rạp sẽ được lưu ở đây
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
 
  },
});

export default listCinemaSlice.reducer;
