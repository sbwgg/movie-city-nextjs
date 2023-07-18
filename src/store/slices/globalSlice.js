import {createSlice} from '@reduxjs/toolkit';

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        popularMovies: [],
        topMovies: []
    },

    reducers: {
        setPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        setTopMovies: (state, action) => {
            state.topMovies = action.payload;
        }
    }
})

export const {setPopularMovies, setTopMovies} = globalSlice.actions;

export default globalSlice.reducer;
