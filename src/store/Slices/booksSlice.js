import { createSlice } from '@reduxjs/toolkit';


export const booksSlice = createSlice({
    name: 'books',
    initialState: [],
    reducers: {
        setBooks: (_state, { payload }) => {
            return payload
        }
    }
});

export default booksSlice.reducer;
export const { setBooks } = booksSlice.actions;