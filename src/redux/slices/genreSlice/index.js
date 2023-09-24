import {createSlice} from '@reduxjs/toolkit';

export const genreSlice = createSlice({
    name: 'GENRE',
    initialState: {
        movieGenreList: [],
        tvGenreList: [],
        movieGenreResults: [],
        tvGenreResults: []
    },

    reducers: {
        setMovieGenres: (state, action) => {
            state.movieGenreList = action.payload;
        },

        setTvGenres: (state, action) => {
            state.tvGenreList = action.payload;
        },

        setMovieGenreResults: (state, action) => {
            state.movieGenreResults = action.payload;
        },

        setTvGenreResults: (state, action) => {
            state.tvGenreResults = action.payload;
        }
    }
})

export const { setMovieGenres, setTvGenres, setMovieGenreResults, setTvGenreResults } = genreSlice.actions;

export default genreSlice.reducer;
