import {createSlice} from '@reduxjs/toolkit';

export const index = createSlice({
	name: 'MOVIE',
	initialState: {
		showTrailer: false,
		trailerKey: null
	},

	reducers: {
		setShowTrailer: (state, action) => {
			state.showTrailer = action.payload;
		},

		setTrailerKey: (state, action) => {
			state.trailerKey = action.payload;
		}
	}
})

export const {setShowTrailer, setTrailerKey} = index.actions;

export default index.reducer;
