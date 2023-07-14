import {createSlice} from '@reduxjs/toolkit';

export const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        movies: {}
    },

    reducers: {
        getMovie: (state, action) => {
            state.movies = action.payload;
        }
    }
})

export const {getMovie} = movieSlice.actions;

export default movieSlice.reducer;