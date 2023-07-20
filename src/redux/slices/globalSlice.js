import {createSlice} from '@reduxjs/toolkit';

export const globalSlice = createSlice({
    name: 'GLOBAL',
    initialState: {
        popularMovies: [],
        topMovies: {
            page: 0,
            movies: []
        },
        searchResults: []
    },

    reducers: {
        setPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },

        setTopMovies: (state, {payload}) => {
            state.topMovies = payload;
        },

        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        }
    }
})

export const {
    setPopularMovies,
    setTopMovies,
    setSearchResults
} = globalSlice.actions;

export default globalSlice.reducer;
