import {createSlice} from '@reduxjs/toolkit';

export const homeSlice = createSlice({
    name: 'popular',
    initialState: {
        popularMovies: []
    },

    reducers: {
        getPopularMovies: (state, action) => {
            state.popularMovies = action.payload
        }
    }
})

export const {getPopularMovies} = homeSlice.actions;

export default homeSlice.reducer;