import { FIND_EVENT_CATEGORY, GET_USER } from "./actions.js";
import { FIND_EVENT } from "./actions.js";
import { GET_EVENT, GET_NEARBY_EVENTS, PUT_USER } from "./actions.js"

const initialState = {
  User: {},
  Event: [],
  Events: [],
  SearchResult: [],
  NearbyEvents: [],
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
  if(action.type === GET_NEARBY_EVENTS ){
    return {
      ...state,
      NearbyEvents: action.payload
    }
  }
<<<<<<< HEAD
  if(action.type === PUT_USER ){
    return {
      ...state,
      User: {...state.User,
        profile:action.payload
      }
=======
  if(action.type === FIND_EVENT_CATEGORY){
    return{
      ...state,
      Events: action.payload
>>>>>>> fabb16545721a7a3cc943f9b303ad7dd7bae25fc
    }
  }
  return state;
}

export default rootReducer;
