import {createSlice} from '@reduxjs/toolkit';

export const homeSlice = createSlice({
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

export const {setTrending, setPaginatedList} = homeSlice.actions;

export default homeSlice.reducer;
