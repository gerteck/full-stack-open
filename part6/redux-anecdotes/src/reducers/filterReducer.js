import { createSlice } from '@reduxjs/toolkit';

// Slice
const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        // Action creators
        setFilter(state, action) {
            // Action object
            return action.payload;
        },
    },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;