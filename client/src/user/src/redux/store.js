import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";
import adminReducer from "./features/adminSlice";
import generalReducer from "./features/generalSlice";
import sidebarReducer from "./features/sidebarSlice";
import teamReducer from "./features/teamSlice";
import teamUserReducer from "./features/teamUserSlice";

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        general: generalReducer,
        sidebar: sidebarReducer,
        team: teamReducer,
        teamUser: teamUserReducer,
    }
});