import { fetch } from './csrf.js';

const GET_ALL_STACKS = 'stack/getAllStacks';

const initialState = {
    stacks: [],
    userStacks: []
};

const getAllStacks = (stacks) => ({
    type: GET_ALL_STACKS,
    payload: stacks
});

export const getStacks = () => async (dispatch) => {
    const res = await fetch('/api/stacks');
    dispatch(getAllStacks(res.data.stacks));
    return res;
};

// export const getSingleStack = (payload) => async (dispatch) => {
//     const { id } = payload;
//     const res = await fetch(`/api/stacks/${id}`);
//     return res.data;
// };

export const deleteStack = (payload) => async (dispatch) => {
    const { id } = payload;
    const res = await fetch(`/api/stacks/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(getStacks());
        return res;
    };
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
        default:
            return state;
    }
};


export default reducer;