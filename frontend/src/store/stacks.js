import { fetch } from "./csrf.js";
import _ from "lodash";

const LOAD_STACKS = "stack/loadStacks";
const ADD_STACK = "stack/addStack";
const REMOVE_STACK = "stack/removeStack";

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

export const getUserStacks = () => async (dispatch) => {
  const response = await fetch(`/api/stacks/`);

  if (response.ok) {
    return dispatch(loadStacks(response.data.stacks));
  }
};

export const deleteUserStack = (stackId) => async (dispatch) => {
  const response = await fetch(`/api/stacks/${stackId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    return dispatch(removeStack(response.data.stack));
  }
};

export const createUserStack =
  ({ name, categoryId, userId, cards }) =>
  async (dispatch) => {
    const response = await fetch("/api/stacks/", {
      method: "POST",
      body: JSON.stringify({ name, categoryId, userId, cards }),
    });

    if (response.ok) {
      return dispatch(addStack(response.data.stack));
    }
  };

const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STACKS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case ADD_STACK:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_STACK:
      return _.omit(state, [action.payload.id]);
    default:
      return state;
  }
};

export default reducer;
