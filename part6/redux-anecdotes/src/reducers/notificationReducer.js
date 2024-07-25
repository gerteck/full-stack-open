import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        // Action creators
        putNotification(state, action) {
            // Action object
            return action.payload;
        },
        // eslint-disable-next-line no-unused-vars
        removeNotification() {
            return '';
        },
    },
});

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(putNotification(message));
        setTimeout(() => {
            dispatch(removeNotification());
        }, time * 1000);
    };
};

export const { putNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

