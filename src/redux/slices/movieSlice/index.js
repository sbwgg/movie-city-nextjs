import {createSlice} from '@reduxjs/toolkit';

export const movieSlice = createSlice({
	name: 'MOVIE',
	initialState: {
		item: {},
		clip: {},
		cast: [],
		similar: [],
		recommendations: [],
		reviews: []
	},

	reducers: {
		storeMovieById: (state, action) => {
			state.item = action.payload;
		},

		storeClip: (state, action) => {
			state.clip = action.payload;
		},

		storeMovieCast: (state, action) => {
			state.cast = action.payload;
		},

		storeSimilar: (state, action) => {
			state.similar = action.payload;
		},

		storeRecommendations: (state, action) => {
			state.recommendations = action.payload;
		},

		storeReviews: (state, action) => {
			state.reviews = action.payload;
		}
	}
})

export const {
	storeMovieById,
	storeClip,
	storeMovieCast,
	storeSimilar,
	storeRecommendations,
	storeReviews
} = movieSlice.actions;

export default movieSlice.reducer;
