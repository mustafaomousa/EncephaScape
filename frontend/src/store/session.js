import { fetch } from "./csrf.js";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

export const login =
  ({ credential, password }) =>
  async (dispatch) => {
    const res = await fetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ credential, password }),
    });

    dispatch(setUser(res.data.user));
    return res;
  };

export const restoreUser = () => async (dispatch) => {
  const res = await fetch("/api/session");
  dispatch(setUser(res.data.user));
  return res;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, phoneNumber, password } = user;
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      phoneNumber,
      password,
    }),
  });

  dispatch(setUser(response.data.user));
  return response;
};

export const confirmedDeleteAccount = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/:${userId}`, {
    method: "POST",
    body: JSON.stringify({
      userId,
    }),
  });
  return res;
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state, { user: action.payload });
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: null });
      return newState;
    default:
      return state;
  }
}

export default reducer;
