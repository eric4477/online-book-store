import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showLinks: true,
    showLogo: false,
};

const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        setShowLinks: (state, action) => {
            state.showLinks = action.payload;
        },
        setShowLogo: (state, action) => {
            state.showLogo = action.payload;
        },
    },
});

export const { setShowLinks, setShowLogo } = navbarSlice.actions;

export default navbarSlice.reducer;
