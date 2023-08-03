import {createSlice} from '@reduxjs/toolkit';

export const genreSlice = createSlice({
    name: 'GENRE',
    initialState: {
        genreList: [],
        genreResults: []
    },

    reducers: {
        setGenres: (state, action) => {
            state.genreList = action.payload;
        },

        setGenreResults: (state, action) => {
            state.genreResults = action.payload;
        }
    }
})

export const { setGenres, setGenreResults } = genreSlice.actions;

export default genreSlice.reducer;
