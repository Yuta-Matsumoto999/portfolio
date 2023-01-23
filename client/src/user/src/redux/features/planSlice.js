import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const planSlice = createSlice({
    name: "plan",
    initialState: initialState,
    reducers: {
        setPlan: (state, action) => {
            state.value = action.payload
        }
    }
});

export const { setPlan } = planSlice.actions;
export default planSlice.reducer;