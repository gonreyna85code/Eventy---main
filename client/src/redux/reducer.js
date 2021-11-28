import { FIND_EVENT_CATEGORY, GET_USER } from "./actions.js";
import { FIND_EVENT } from "./actions.js";
import {
  GET_EVENT,
  GET_NEARBY_EVENTS,
  PUT_USER,
  FIND_EVENT_SUB,
  GET_ALL_EVENTS,
  GET_BY_CAT,
  GET_BY_SUB,
  GET_BY_CITY,
} from "./actions.js";

const initialState = {
  User: {},
  Event: [],
  Events: [],
  SearchResult: [],
  NearbyEvents: [],
  Filtrados1: [],
  Filtrados2: [],
  AllEvents: [],
};

function rootReducer(state = initialState, action) {
  if (action.type === GET_USER) {
    return {
      ...state,
      User: action.payload,
    };
  }
  if (action.type === FIND_EVENT) {
    return {
      ...state,
      SearchResult: action.payload,
    };
  }
  if (action.type === GET_EVENT) {
    console.log("este es el " + action.payload);
    return {
      ...state,
      Event: action.payload,
    };
  }
  if (action.type === GET_NEARBY_EVENTS) {
    return {
      ...state,
      NearbyEvents: action.payload,
    };
  }
  if (action.type === PUT_USER) {
    return {
      ...state,
      User: {
        ...state.User,
        profile: { ...state.User.profile, ...action.payload },
      },
    };
  }
  if (action.type === FIND_EVENT_CATEGORY) {
    return {
      ...state,
      Events: action.payload,
    };
  }
  if (action.type === FIND_EVENT_SUB) {
    var eventos = action.payload;
    var eventSub = eventos.filter((el) => el.subcategory === action.sub);
    return {
      ...state,
      Events: eventSub,
    };
  }
  if (action.type === GET_ALL_EVENTS) {
    return {
      ...state,
      AllEvents: action.payload,
    };
  }
  if (action.type === GET_BY_CAT) {
    return {
      ...state,
      Filtrados: [...state.AllEvents].filter((d) =>
        d.category.includes(action.payload)
      ),
    };
  }
  if (action.type === GET_BY_SUB) {
    return {
      ...state,
      Filtrados: [...state.AllEvents].filter((d) =>
        d.category.includes(action.payload)
      ),
    };
  }
  if (action.type === GET_BY_CITY) {
    return {
      ...state,
      Filtrados1: [...state.AllEvents].filter((d) =>
        d.category.includes(action.payload)
      ),
    };
  }
  return state;
}

export default rootReducer;
