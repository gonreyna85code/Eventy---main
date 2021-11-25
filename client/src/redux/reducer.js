import { GET_USER } from "./actions.js";
import { FIND_EVENT } from "./actions.js";
import { GET_EVENT } from "./actions.js"

const initialState = {
  User: [],
  Event: [],
  Events: [],
  SearchResult: [],
};

function rootReducer(state = initialState, action) {
  if (action.type === GET_USER) {
    return {
      ...state,
      User: action.payload,
    };
  }
  if (action.type === FIND_EVENT){
    return {
      ...state, 
      SearchResult: action.payload,
    }
  }
  if (action.type === GET_EVENT){
    console.log('este es el ' + action.payload);
    return {
      ...state,
      Event: action.payload
    }
  }
  return state;
}

export default rootReducer;
