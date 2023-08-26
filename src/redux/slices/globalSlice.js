import {createSlice} from '@reduxjs/toolkit';

export const globalSlice = createSlice({
    name: 'GLOBAL',
    initialState: {
        popularMovies: [],
        searchResults: [],
        popularMovie: {},
        backgroundPoster: ''
    },

    reducers: {
        setPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },

        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },

        setPopularMovieOfDay: (state, action) => {
            state.popularMovie = action.payload;
        },

        setBackgroundPoster: (state, action) => {
            state.backgroundPoster = action.payload;
        }
    }
})

export const {
    setPopularMovies,
    setSearchResults,
    setPopularMovieOfDay,
    setBackgroundPoster
} = globalSlice.actions;

export default globalSlice.reducer;
