import {createSlice} from '@reduxjs/toolkit';

export const index = createSlice({
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
} = index.actions;

export default index.reducer;
