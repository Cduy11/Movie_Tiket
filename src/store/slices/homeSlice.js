import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../apis/fetcher";

// call api movies pagination
export const listMoviePagination = createAsyncThunk(
  "home/listMoviePagination",
  async ({ group = "GP01", page = 1, pageSize = 10 }, { rejectWithValue }) => {
    try {
      const response = await fetcher.get(
        `/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${group}&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`
      );
      return response.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// call api lịch sử đặt vé
export const listTicketHistory = createAsyncThunk(
  "home/listTicketHistory",
  async () => {
    try {
      const response = await fetcher.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
      return response.data.content;
    } catch (error) {
      throw error.response ? error.response.data.message : error.message;
    }
  }
)

const homeSlice = createSlice({
  name: "home",
  initialState: {
    movies: [],
    ticketHistory: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listMoviePagination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listMoviePagination.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.movies = payload;
      })
      .addCase(listMoviePagination.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(listTicketHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listTicketHistory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.ticketHistory = payload;
      })
      .addCase(listTicketHistory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default homeSlice.reducer;
