 import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
     }, 
     reducers: {
        setUser : (state, action) => {
            state.user = action.payload;
        },
      logout: (state) => {
            state.user = localStorage.removeItem("token");
          },
     },

});

export const {setUser, logout} = userSlice.actions; 
