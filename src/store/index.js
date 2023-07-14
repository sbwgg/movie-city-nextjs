import {configureStore} from '@reduxjs/toolkit';
import globalSlice from './slices/globalSlice';
import movieSlice from './slices/movieSlice';

export default configureStore({
    reducer: {
        global: globalSlice,
        movie: movieSlice
    }
});