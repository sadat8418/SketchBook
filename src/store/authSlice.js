import { createSlice } from "@reduxjs/toolkit";
//auth er store , will track all auth
const initialState = { //user authenticated? 
    status : false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {  // track auth of user when login 
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
     }
})

export const {login, logout} = authSlice.actions; // we export actions (login, logout)

export default authSlice.reducer;