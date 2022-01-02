import { fetch } from "./csrf.js";

const LOAD_STACKS = "stack/loadStacks";
const ADD_STACK = "stack/addStack";
const REMOVE_STACK = "stack/removeStack";

const initialState = [];

const loadStacks = (stacks) => ({
  type: LOAD_STACKS,
  payload: stacks,
});

const addStack = (stack) => ({
  type: ADD_STACK,
  payload: stack,
});

const removeStack = (stack) => ({
  type: REMOVE_STACK,
  payload: stack,
});

export const getUserStacks = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/stacks`);
  dispatch(loadStacks(res.data.stacks));
};

export const deleteUserStack = (stackId) => async (dispatch) => {
  const res = await fetch(`/api/stacks/${stackId}`, {
    method: "DELETE",
  });
  dispatch(removeStack(res.data.stack));
};

export const createUserStack =
  ({ name, categoryId, userId, cards }) =>
  async (dispatch) => {
    const response = await fetch("/api/stacks/", {
      method: "POST",
      body: JSON.stringify({ name, categoryId, userId, cards }),
    });
    dispatch(addStack(response.data.stack));
  };

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_STACKS:
      return [...state, ...action.payload];
    case ADD_STACK:
      return [...state, action.payload];
    case REMOVE_STACK:
      const deletedStack = action.payload;
      return state.filter((stack) => {
        if (stack.id !== deletedStack.id) {
          return stack;
        }
      });
    default:
      return state;
  }
}

export default reducer;
