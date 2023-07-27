import {createSlice} from '@reduxjs/toolkit';

export const persistSlice = createSlice({
	name: 'PERSIST',
	initialState: {
		topMovies: {
			page: 1,
			data: []
		}
	},

	reducers: {
		setTopMovies: (state, {payload}) => {
			state.topMovies = payload;
		},
	}
})

export const {setTopMovies} = persistSlice.actions;

export default persistSlice.reducer;
