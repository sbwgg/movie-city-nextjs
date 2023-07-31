import {createSlice} from '@reduxjs/toolkit';

export const homeSlice = createSlice({
    name: 'HOME',
    initialState: {
        trendingMovies: []
    },

   reducers: {
        setTrending: (state, action) => {
           state.trendingMovies = action.payload;
       }
   }
});

export const {setTrending} = homeSlice.actions;

export default homeSlice.reducer;
