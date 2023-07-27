import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import globalSlice from './slices/globalSlice';
import homeSlice from './slices/homeSlice';
import movieSlice from './slices/movieSlice';
import castSlice from './slices/movieSlice/castSlice';
import persistSlice from '@/redux/slices/persistSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

const persistConfig = {
    key: 'persist',
    storage,
    whitelist: ['persist']
}

const combinedReducers = combineReducers({
    global: globalSlice,
    home: homeSlice,
    movie: movieSlice,
    cast: castSlice,
    persist: persistSlice
});

const customizedMiddleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: customizedMiddleware
});
