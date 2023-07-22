import {combineReducers, configureStore} from '@reduxjs/toolkit';
import globalSlice from './slices/globalSlice';
import homeSlice from './slices/homeSlice';
import movieSlice from './slices/movieSlice';
import castSlice from './slices/movieSlice/castSlice';

const combinedReducers = combineReducers({
    global: globalSlice,
    home: homeSlice,
    movie: movieSlice,
    cast: castSlice
});

export default configureStore({
    reducer: combinedReducers
});
