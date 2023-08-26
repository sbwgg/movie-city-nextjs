import {createSlice} from '@reduxjs/toolkit';

export const index = createSlice({
    name: 'HOME',
    initialState: {
        trendingMovies: [],
        paginatedList: []
    },

   reducers: {
        setTrending: (state, action) => {
           state.trendingMovies = action.payload;
       },

       setPaginatedList: (state, action) => {
            state.paginatedList = action.payload;
       }
   }
});

export const {setTrending, setPaginatedList} = index.actions;

export default index.reducer;
