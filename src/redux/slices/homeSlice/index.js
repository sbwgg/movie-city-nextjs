import {createSlice} from '@reduxjs/toolkit';

export const index = createSlice({
    name: 'HOME',
    initialState: {
        trending: {
            movies: [],
            tv: []
        },
        paginatedList: []
    },

   reducers: {
        setTrending: (state, {payload}) => {
            state.trending = {...state.trending,...payload};
        },

       setPaginatedList: (state, action) => {
            state.paginatedList = action.payload;
       }
   }
});

export const {setTrending, setPaginatedList} = index.actions;

export default index.reducer;
