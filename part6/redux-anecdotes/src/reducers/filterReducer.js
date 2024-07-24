// Reducer
const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.data;
        default:
            return state;
    }
};

// Action creator
export const setFilter = (filter) => {
    // Action object
    return {
        type: 'SET_FILTER',
        data: filter,
    };
};



export default filterReducer;