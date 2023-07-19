import {createSlice} from '@reduxjs/toolkit';

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        popularMovies: [],
        topMovies: [],
        searchResults: []
    },

    reducers: {
        setPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },

        setTopMovies: (state, action) => {
            state.topMovies = action.payload;
        },

        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        }
    }
})

export const {setPopularMovies, setTopMovies, setSearchResults} = globalSlice.actions;

export default globalSlice.reducer;
