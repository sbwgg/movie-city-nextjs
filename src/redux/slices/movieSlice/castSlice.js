import {createSlice} from '@reduxjs/toolkit';

export const castSlice = createSlice({
	name: 'CAST',
	initialState: {
		data: {
			cast:[],
			crew: [],
			movieData: {}
		}
	},

	reducers: {
		storeCredits: (state, {payload}) => {
			state.data = {...state.data, ...payload};
		}
	}
})

export const {storeCredits} = castSlice.actions;

export default castSlice.reducer;
