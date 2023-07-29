import {createSlice} from '@reduxjs/toolkit';

export const globalSlice = createSlice({
    name: 'GLOBAL',
    initialState: {
        popularMovies: [],
        searchResults: [],
        footerMovie: {}
    },

    reducers: {
        setPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },

        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },

        setFooterMovie: (state, action) => {
            state.footerMovie = action.payload;
        }
    }
})

export const {
    setPopularMovies,
    setSearchResults,
    setFooterMovie
} = globalSlice.actions;

export default globalSlice.reducer;
