import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../apis/fetcher";

export const listCinemaSystemApi = createAsyncThunk(
    "cinemaSystem/listCinemaSystemApi",
    async ({ maHeThongRap}) => {
      try {
        const response = await fetcher.get(
          `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
        );
        console.log("jkhdf", response.data.content);
        
        return response.data.content;
      } catch (error) {
        throw error.response ? error.response.data.message : error.message;
      }
    }
  );

  const listCinemaSystemSlice = createSlice({
    name: "cinemaSystem",
    initialState: {
      cinemaSystem: [], 
      isLoading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
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
        });
    },
  });
  
  export default listCinemaSystemSlice.reducer;
  