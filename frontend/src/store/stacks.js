import { fetch } from "./csrf.js";

const LOAD_STACKS = "stack/loadStacks";
const ADD_STACK = "stack/addStack";

const initialState = [];

const loadStacks = (stacks) => ({
  type: LOAD_STACKS,
  payload: stacks,
});

const addStack = (stack) => ({
  type: ADD_STACK,
  payload: stack,
});

export const getUserStacks = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/stacks`);
  dispatch(loadStacks(res.data.stacks));
};

export const createUserStack =
  ({ name, categoryId, userId }) =>
  async (dispatch) => {
    const response = await fetch("/api/stacks/", {
      method: "POST",
      body: JSON.stringify({ name, categoryId, userId }),
    });
    dispatch(addStack(response.data.stack));
  };

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_STACKS:
      return [...state, ...action.payload];
    case ADD_STACK:
      return [...state, action.payload];
    default:
      return state;
  }
}

export default reducer;
