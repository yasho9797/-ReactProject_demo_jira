import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{name:"yyy@gmail.com", password: "1234"}, 
    reducers: {}
});
export default userSlice.reducer;