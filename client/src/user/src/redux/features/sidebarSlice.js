import { createSlice } from "@reduxjs/toolkit";

export const clearState = () => {
    return {
        type: "CLEAR_STATE"
    }
}


const initialState = { value: false };

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: initialState,
    reducers: {
        setSidebar: (state, action) => {
            state.value = action.payload
        }
    }
});

export const { setSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;