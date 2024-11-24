import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../../apis/fetcher";


 export const loginApi = createAsyncThunk(
    "auth/loginApi",
    async(data, { rejectWithValue }) => {
        try {
            const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message)
        }
    }
)


const authSlice = createSlice({
    name: "auth",
    initialState:{
        currentUser: null,
        isLoading: false,
        error: null,
    },
    reducers:{
        logout: (state) => {
            state.currentUser = null;
            localStorage.removeItem("currentUser");
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginApi.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(loginApi.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.error = null;
            state.currentUser = payload;
        })
        builder.addCase(loginApi.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.error = payload;
        })
    }
})

export const {logout} = authSlice.actions;
export default authSlice.reducer;