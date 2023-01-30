import { configureStore } from "@reduxjs/toolkit";
import administratorReducer from "./features/administratorSlice";
import adminReducer from "./features/adminSlice";
import generalReducer from "./features/generalSlice";
import planReducer from "./features/planSlice";
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
        plan: planReducer,
        administrator: administratorReducer
    }
});