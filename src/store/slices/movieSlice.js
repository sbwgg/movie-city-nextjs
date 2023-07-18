import {createSlice} from '@reduxjs/toolkit';

export const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        movieItem: {},
        movieClip: {},
        movieCast: [],
        similarMovies: []
    },

    reducers: {
        storeMovieById: (state, action) => {
            state.movieItem = action.payload;
        },
        storeMovieClip: (state, action) => {
            state.movieClip = action.payload;
        },
        storeMovieCast: (state, action) => {
            state.movieCast = action.payload;
        },
        storeSimilarMovies: (state, action) => {
            state.similarMovies = action.payload;
        }
    }
})

export const {
    storeMovieById,
    storeMovieClip,
    storeMovieCast,
    storeSimilarMovies
} = movieSlice.actions;

export default movieSlice.reducer;
