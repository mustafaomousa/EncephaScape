import { fetch } from './csrf.js';

const GET_ALL_CATEGORIES = 'category/getCategories';

const getCategories = (categories) => ({
    type: GET_ALL_CATEGORIES,
    payload: categories
});

const initialState = {
    categories: []
};

export const getAllCategories = () => async dispatch => {
    const res = await fetch('/api/categories');
    dispatch(getCategories(res.data.categories));
    return res;
};

export const getCategoryStacks = (categoryId) => async dispatch => {
    const res = await fetch(`/api/stacks/${categoryId}`);

};

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_CATEGORIES:
            newState = Object.assign({}, state, { categories: action.payload });
            return newState;
        default:
            return state;
    }
};


export default reducer;