import {createSlice} from '@reduxjs/toolkit';

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        popularMovies: [],
    },

    reducers: {
        getPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        }
    }
})

export const {getPopularMovies} = globalSlice.actions;

export default globalSlice.reducer;
