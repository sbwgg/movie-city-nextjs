import {createSlice} from '@reduxjs/toolkit';

export const castSlice = createSlice({
	name: 'CAST',
	initialState: {
		cast: [],
		crew: []
	},

	reducers: {
		storeCast: (state, action) => {
			state.cast = action.payload
		},

		storeCrew: (state, action) => {
			state.crew = action.payload;
		}
	}
})

export const {storeCast, storeCrew} = castSlice.actions;

export default castSlice.reducer;
