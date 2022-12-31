import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";
import adminReducer from "./features/adminSlice";

export const store = configureStore({
    reducer: {
        admin: adminReducer
    }
});