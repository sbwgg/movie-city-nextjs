import {configureStore} from '@reduxjs/toolkit';
import headerSlice from './slices/headerSlice';
import homeSlice from './slices/homeSlice';

export default configureStore({
    reducer: {
        header: headerSlice,
        home: homeSlice
    }
})