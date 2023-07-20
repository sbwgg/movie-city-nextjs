import {createSlice} from '@reduxjs/toolkit';

export const homeSlice = createSlice({
    name: 'HOME',
    initialState: {
        cinemaMovies: [],
        trendingMovies: []
    },

   reducers: {
       setCinema: (state, action) => {
           state.cinemaMovies = action.payload;
       },

       setTrending: (state, action) => {
           state.trendingMovies = action.payload;
       }
   }
});

export const {setCinema, setTrending} = homeSlice.actions;

export default homeSlice.reducer;
