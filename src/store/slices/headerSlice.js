import {createSlice} from '@reduxjs/toolkit';

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        isNavOpen: false
    },

    reducers: {
        toggleNavMenu: (state, action) => {
            return state.isNavOpen = !state.isNavOpen
        }
    }
})

export const {toggleNavMenu} = headerSlice.actions;

export default headerSlice.reducer;