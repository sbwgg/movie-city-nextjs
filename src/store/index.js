import {configureStore} from '@reduxjs/toolkit';
import headerSlice from './slices/headerSlice';

export default configureStore({
    reducer: {
        header: headerSlice
    }
})