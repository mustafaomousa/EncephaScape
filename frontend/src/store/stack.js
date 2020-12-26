import { fetch } from './csrf.js';

const GET_ALL_STACKS = 'stack/getAllStacks';

const initialState = {
    stacks: {},
    userStacks: {}
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