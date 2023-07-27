import {createSlice} from '@reduxjs/toolkit';

export const castSlice = createSlice({
	name: 'CAST',
	initialState: {
		cast: [],
		crew: [],
		movieData: {}
	},

	reducers: {
		storeCast: (state, action) => {
			state.cast = action.payload
		},

		storeCrew: (state, action) => {
			state.crew = action.payload;
		},

		storeMovieByID: (state, action) => {
			state.movieData = action.payload;
		},
	}
})

export const {storeCast, storeCrew, storeMovieByID} = castSlice.actions;

export default castSlice.reducer;
