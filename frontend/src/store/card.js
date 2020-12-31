import { fetch } from './csrf.js';

const GET_STACK_CARDS = 'card/getStackCards';

const initialState = {
    cards: []
};

export const getCards = (stackId) => async (dispatch) => {
    const res = await fetch(`/api/cards/${stackId}`);
    dispatch(getStackCards(res.data.stackCards));
    return res;
};

export const deleteCard = (stackId, cardId) => async (dispatch) => {
    const res = await fetch(`/api/cards/${stackId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            cardId
        })
    });
    getCards();
    return res;
};

export const editCard = (stackId, cardId, term, response) => async (dispatch) => {
    const res = await fetch(`/api/cards/${stackId}`, {
        method: 'PUT',
        body: JSON.stringify({
            cardId,
            term,
            response
        })
    });
    getCards();
    return res;
}

export const createCard = (stackId, term, response) => async (dispatch) => {
    const res = await fetch(`/api/cards/${stackId}`, {
        method: 'POST',
        body: JSON.stringify({
            stackId,
            term,
            response
        })
    });
    getCards();
    return res;
};

const getStackCards = (cards) => ({
    type: GET_STACK_CARDS,
    payload: cards
})

function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_STACK_CARDS:
            newState = Object.assign({}, state, { cards: action.payload });
            return newState;
        default:
            return state;
    }
};


export default reducer;