import {createSlice} from '@reduxjs/toolkit';

export const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        movieItem: {},
        movieClip: {},
        movieCast: [],
        similarMovies: [],
        recommendations: []
    },

    reducers: {
        storeMovieById: (state, action) => {
            state.movieItem = action.payload;
        },

        storeClip: (state, action) => {
            state.movieClip = action.payload;
        },

        storeCast: (state, action) => {
            state.movieCast = action.payload;
        },

        storeSimilar: (state, action) => {
            state.similarMovies = action.payload;
        },

        storeRecommendations: (state, action) => {
            state.recommendations = action.payload;
        }
    }
})

export const {
    storeMovieById,
    storeClip,
    storeCast,
    storeSimilar,
    storeRecommendations
} = movieSlice.actions;

export default movieSlice.reducer;
