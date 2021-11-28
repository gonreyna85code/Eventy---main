import { FIND_EVENT_CATEGORY, GET_USER } from "./actions.js";
import { FIND_EVENT } from "./actions.js";
import { GET_EVENT, GET_NEARBY_EVENTS, PUT_USER, FIND_EVENT_SUB } from "./actions.js"

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
  if(action.type === PUT_USER ){
    return {
      ...state,
      User: {...state.User,
        profile:{...state.User.profile,...action.payload}
      }
    }
  }
  if(action.type === FIND_EVENT_CATEGORY){
    return{
      ...state,
      Events: action.payload
    }
  }
  if(action.type === FIND_EVENT_SUB){
    var eventos = action.payload;
    var eventSub = eventos.filter(el => el.subcategory === action.sub);
    return{
      ...state,
      Events: eventSub
    }
  }
  return state;
}

export default rootReducer;
