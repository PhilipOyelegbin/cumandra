import {createSlice} from '@reduxjs/toolkit';

const initialStateValue = null;

const loginSlice = createSlice({
    name: "User",
    initialState: {
        value: initialStateValue,
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { login } = loginSlice.actions;
export default loginSlice.reducer;