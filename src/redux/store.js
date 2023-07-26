import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import globalSlice from './slices/globalSlice';
import homeSlice from './slices/homeSlice';
import movieSlice from './slices/movieSlice';
import castSlice from './slices/movieSlice/castSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

const persistConfig = {
    key: '_next',
    storage
}

const combinedReducers = combineReducers({
    global: globalSlice,
    home: homeSlice,
    movie: movieSlice,
    cast: castSlice
});

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: customizedMiddleware
});
