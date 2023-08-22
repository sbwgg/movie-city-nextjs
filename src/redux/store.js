import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import globalSlice from './slices/globalSlice';
import homeSlice from './slices/homeSlice';
import castSlice from './slices/movieSlice/castSlice';
import persistSlice from '@/redux/slices/persistSlice';
import genreSlice from '@/redux/slices/genreSlice';

const persistConfig = {
    key: 'persist',
    storage,
    whitelist: ['persist']
};

const combinedReducers = combineReducers({
    global: globalSlice,
    home: homeSlice,
    cast: castSlice,
    persist: persistSlice,
    genre: genreSlice,
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
