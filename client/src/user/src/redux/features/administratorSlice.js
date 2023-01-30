import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const administratorSlice = createSlice({
    name: "administrator",
    initialState: initialState,
    reducers: {
        setAdministrator: (state, action) => {
            state.value = action.payload
        }
    }
});

export const { setAdministrator } = administratorSlice.actions;
export default administratorSlice.reducer;