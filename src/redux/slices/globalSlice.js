import {createSlice} from '@reduxjs/toolkit';

export const globalSlice = createSlice({
    name: 'GLOBAL',
    initialState: {
        popularMovies: [],
        searchResults: []
    },

    reducers: {
        setPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },

        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        }
    }
})

export const {
    setPopularMovies,
    setSearchResults
} = globalSlice.actions;

export default globalSlice.reducer;
