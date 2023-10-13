import {createSlice} from '@reduxjs/toolkit';
import {getRandomInt} from '@/helpers';

export const persistSlice = createSlice({
	name: 'PERSIST',
	initialState: {
		topMovies: {
			page: getRandomInt(1, 200),
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
