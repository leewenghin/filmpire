import { configureStore } from '@reduxjs/toolkit'
import { tmdbApi } from '../services/TMDB'
import genreOrCategoryReducer from '../features/currentGenreOrCategory'
import userReducer from '../features/auth';

export default configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentGenreOrCategory: genreOrCategoryReducer,
        user: userReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tmdbApi.middleware),
});