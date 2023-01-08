import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const teamUserSlice = createSlice({
    name: "teamUser",
    initialState: initialState,
    reducers: {
        setTeamUser: (state, action) => {
            state.value = action.payload
        }
    }
});

export const { setTeamUser } = teamUserSlice.actions;
export default teamUserSlice.reducer;