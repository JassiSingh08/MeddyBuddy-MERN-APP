import {configureStore} from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertslice";

export default configureStore({
    reducer:{
        alerts :alertSlice.reducer,
    },
});