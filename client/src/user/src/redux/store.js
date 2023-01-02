import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";
import adminReducer from "./features/adminSlice";
import generalReducer from "./features/generalSlice";
import sidebarReducer from "./features/sidebarSlice";

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        general: generalReducer,
        sidebar: sidebarReducer
    }
});