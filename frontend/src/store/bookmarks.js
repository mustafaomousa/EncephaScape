import { fetch } from "./csrf.js";
import _ from "lodash";

const LOAD_BOOKMARKS = "stack/loadBookmarks";
const ADD_BOOKMARK = "stack/addBookmark";
const REMOVE_BOOKMARK = "stack/removeBookmark";

const loadBookmarks = (bookmarks) => ({
  type: LOAD_BOOKMARKS,
  payload: bookmarks,
});

const addBookmark = (bookmark) => ({
  type: ADD_BOOKMARK,
  payload: bookmark,
});

const removeBookmark = (bookmark) => ({
  type: REMOVE_BOOKMARK,
  payload: bookmark,
});

export const getUserBookmarks = () => async (dispatch) => {
  const response = await fetch(`/api/bookmarks`);

  if (response.ok) {
    return dispatch(loadBookmarks(response.data.bookmarks));
  }
};

export const createUserBookmark = (stackId) => async (dispatch) => {
  const response = await fetch(`/api/bookmarks`, {
    method: "POST",
    body: JSON.stringify({ stackId }),
  });

  if (response.ok) {
    return dispatch(addBookmark(response.data.bookmark));
  }
};

export const deleteUserBookmark = (bookmarkId) => async (dispatch) => {
  const response = await fetch(`/api/bookmarks/${bookmarkId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    return dispatch(removeBookmark(response.data.bookmark));
  }
};

const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BOOKMARKS:
      return { ...state, ..._.mapKeys(action.payload, "stackId") };
    case ADD_BOOKMARK:
      return { ...state, [action.payload.stackId]: action.payload };
    case REMOVE_BOOKMARK:
      return _.omit(state, [action.payload.stackId]);
    default:
      return state;
  }
};

export default reducer;
