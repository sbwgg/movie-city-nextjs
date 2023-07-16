import {createSlice} from '@reduxjs/toolkit';

export const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        movies: {},
        movieClip: {},
        movieCast: []
    },

    reducers: {
        storeMovieById: (state, action) => {
            state.movies = action.payload;
        },
        storeMovieClip: (state, action) => {
            state.movieClip = action.payload;
        },
        storeMovieCast: (state, action) => {
            state.movieCast = action.payload;
        }
    }
})

export const {storeMovieById, storeMovieClip, storeMovieCast} = movieSlice.actions;

export default movieSlice.reducer;
