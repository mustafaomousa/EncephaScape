import { fetch } from './csrf.js';

const GET_ALL_STACKS = 'stack/getAllStacks';

const GET_TOP_STACKS = 'stack/getTop';

const initialState = {
    stacks: [],
    newestStacks: []
};

const getAllStacks = (stacks) => ({
    type: GET_ALL_STACKS,
    payload: stacks
});

const getTop = (stacks) => ({
    type: GET_TOP_STACKS,
    payload: stacks
});

export const getTopStacks = () => async (dispatch) => {
    const res = await fetch('/api/stacks/top');
    dispatch(getTop(res.data.stacks));
    return res;
};

export const getStacks = () => async (dispatch) => {
    const res = await fetch('/api/stacks');
    dispatch(getAllStacks(res.data.stacks));
    return res;
};

export const deleteStack = (id) => async (dispatch) => {
    const res = await fetch(`/api/stacks/${id}`, {
        method: 'DELETE'
    });

    dispatch(getStacks);
    return res;
};

export const createStack = (payload) => async (dispatch) => {
    const { name, categoryId, userId } = payload;
    const res = await fetch('/api/stacks', {
        method: 'POST',
        body: JSON.stringify({
            name,
            categoryId,
            userId
        })
    });

    getStacks();
    return res;
};

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_STACKS:
            newState = Object.assign({}, state, { stacks: action.payload });
            return newState;
        case GET_TOP_STACKS:
            newState = Object.assign({}, state, { newestStacks: action.payload });
            return newState;
        default:
            return state;
    }
};


export default reducer;