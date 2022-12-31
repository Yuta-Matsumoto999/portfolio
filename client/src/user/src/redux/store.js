import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";
import adminReducer from "./features/adminSlice";
import generalReducer from "./features/generalSlice";

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        general: generalReducer
    }
});