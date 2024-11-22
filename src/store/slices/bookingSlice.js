import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../apis/fetcher"; 

// Thunk để gọi API lấy dữ liệu ghế
export const getBookingSeatApi = createAsyncThunk(
  "bookingSeat/getBookingSeatApi",
  async () => {
    try {
      const response = await fetcher.get(
        `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=45913`
      );
      console.log("response:", response.data.content);
      return response.data.content;
    } catch (error) {
      throw error.response ? error.response.data.message : error.message;
    }
  }
);

const bookingSlice = createSlice({
  name: "bookingSeat",
  initialState: {
    bookingSeat: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookingSeatApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookingSeatApi.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.bookingSeat = payload;
      })
      .addCase(getBookingSeatApi.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default bookingSlice.reducer;
