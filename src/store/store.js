import { configureStore } from '@reduxjs/toolkit';

import authReducer from './Slices/authSlice';
import booksReducer from './Slices/booksSlice'
export default configureStore({
    reducer: {
        auth: authReducer,
        books:booksReducer
    }
});