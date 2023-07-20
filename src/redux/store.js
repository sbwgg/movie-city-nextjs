import {combineReducers, configureStore} from '@reduxjs/toolkit';
import globalSlice from './slices/globalSlice';
import homeSlice from './slices/homeSlice';
import movieSlice from './slices/movieSlice';

const combinedReducers = combineReducers({
    global: globalSlice,
    home: homeSlice,
    movie: movieSlice
});

export default configureStore({
    reducer: combinedReducers
});