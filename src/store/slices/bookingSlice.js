import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../apis/fetcher"; 

// Thunk để gọi API lấy dữ liệu ghế
export const getBookingSeatApi = createAsyncThunk(
  "bookingSeat/getBookingSeatApi",
  async ({ maLichChieu }) => {
    try {
      const response = await fetcher.get(
        `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
      );
      console.log("response:", response.data.content);
      return response.data.content;
    } catch (error) {
      throw error.response ? error.response.data.message : error.message;
    }
  }
);

// Thunk để gọi API đặt vé
export const bookingSeatApi = createAsyncThunk(
  "bookingSeat/bookingSeatApi",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetcher.post(`/QuanLyDatVe/DatVe`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.message : error.message);
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
      })
      .addCase(bookingSeatApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bookingSeatApi.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.error = null;
        state.bookingSeat = payload;
      })
      .addCase(bookingSeatApi.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.error = payload;
      })
  },
});

export default bookingSlice.reducer;
