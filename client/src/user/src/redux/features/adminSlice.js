import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: {} };

export const adminSlice = createSlice({
    name: "admin",
    initialState: initialState,
    reducers: {
        setAdmin: (state, action) => {
            state.value = action.payload
        }
    }
});

export const { setAdmin } = adminSlice.actions;
export default adminSlice.reducer;