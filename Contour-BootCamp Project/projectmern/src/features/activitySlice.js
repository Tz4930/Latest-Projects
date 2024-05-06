import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const activityDetail= createSlice({
    name:'activityDetail',
    initialState:{
        activity:[],
        loading: false,
        error:null,
    }
})

export default activityDetail.reducer;