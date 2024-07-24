import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        // Action creators
        setNotification(state, action) {
            // Action object
            return action.payload;
        },
        // eslint-disable-next-line no-unused-vars
        removeNotification() {
            return '';
        },
    },
});

export const { setNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

