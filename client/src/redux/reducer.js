import { GET_USER } from "./actions.js";

const initialState = {
  User: [],
  Event: [],
  Events: [],
};

function rootReducer(state = initialState, action) {
  if (action.type === GET_USER) {
    return {
      ...state,
      User: action.payload,
    };
  }
  return state;
}

export default rootReducer;
