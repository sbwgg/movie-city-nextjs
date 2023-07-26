import {createSlice} from '@reduxjs/toolkit';

export const movieSlice = createSlice({
	name: 'MOVIE',
	initialState: {
		movie: {
			info: {},
			clip: {},
			cast: [],
			similar: [],
			recommendations: [],
			reviews: []
		}
	},

	reducers: {
		storeMovieData: (state, {payload}) => {
			state.movie = {...state.movie, ...payload};
		}
	}
})

export const { storeMovieData } = movieSlice.actions;

export default movieSlice.reducer;
