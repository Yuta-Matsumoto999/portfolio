import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: {} };

export const generalSlice = createSlice({
    name: "general",
    initialState: initialState,
    reducers: {
        setGeneral: (state, action) => {
            state.value = action.payload
        }
    }
});

export const { setGeneral } = generalSlice.actions;
export default generalSlice.reducer;