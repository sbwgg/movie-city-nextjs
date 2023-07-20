import {createSlice} from '@reduxjs/toolkit';

export const homeSlice = createSlice({
    name: 'HOME',
    initialState: {
        cinemaMovies: []
    },

   reducers: {
       setCinema: (state, action) => {
           state.cinemaMovies = action.payload;
       }
   }
});

export const {setCinema} = homeSlice.actions;

export default homeSlice.reducer;