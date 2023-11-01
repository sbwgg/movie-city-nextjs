import {createSlice} from '@reduxjs/toolkit';

export const index = createSlice({
	name: 'MOVIE',
	initialState: {
		showClip: false,
		clipKey: null
	},

	reducers: {
		setShowClip: (state, action) => {
			state.showClip = action.payload;
		},

		setClipKey: (state, action) => {
			state.clipKey = action.payload;
		}
	}
})

export const {setShowClip, setClipKey} = index.actions;

export default index.reducer;
