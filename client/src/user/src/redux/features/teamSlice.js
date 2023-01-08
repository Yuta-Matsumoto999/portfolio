import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const teamSlice = createSlice({
    name: "team",
    initialState: initialState,
    reducers: {
        setTeam: (state, action) => {
            state.value = action.payload
        }
    }
});

export const { setTeam } = teamSlice.actions;
export default teamSlice.reducer;