import { createSlice } from "@reduxjs/toolkit";


const bookingSlice = createSlice({
  name: "bookingSeat",
  initialState: {
    bookingSeat: [],
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default bookingSlice.reducer;
