import {createSlice} from '@reduxjs/toolkit';

export const index = createSlice({
    name: 'HOME',
    initialState: {
        trendingMovies: [],
        trendingTv: [],
        paginatedList: []
    },

   reducers: {
        setTrendingMovie: (state, action) => {
           state.trendingMovies = action.payload;
       },

        setTrendingTv: (state, action) => {
           state.trendingTv = action.payload;
       },

       setPaginatedList: (state, action) => {
            state.paginatedList = action.payload;
       }
   }
});

export const {setTrendingMovie, setTrendingTv, setPaginatedList} = index.actions;

export default index.reducer;
