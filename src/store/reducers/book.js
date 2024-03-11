// tableReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedBook: null
};

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setSelectedBook(state, action) {
            state.selectedBook = action.payload;
        }
    }
});


export const { setSelectedBook } = tableSlice.actions;
export default tableSlice.reducer;
