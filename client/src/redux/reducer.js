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
  ORDEN_BY_NAME,
  GET_ALL_CITIES,
  POST_PREFERENCE,
  PUT_EVENT,
  GET_EVENTS_LP,
  CHANGE_USER_CITY,
  CHANGE_EVENT_CITY
} from "./actions.js";

//========================
//Funcion de ordenamiento

export const ordenEventosNombre = ( state, payload ) => {
 
  if( payload === 'asc'){

      return state.Filtrados.sort( (a, b) => {
          if( a.name.toLowerCase() > b.name.toLowerCase() ) return 1
          if( b.name.toLowerCase() > a.name.toLowerCase() ) return -1
          return 0
      })

  } else if( payload === 'desc' ){

      return state.Filtrados.sort( (a, b) => {
          if( a.name.toLowerCase() > b.name.toLowerCase() ) return -1
          if( a.name.toLowerCase() > b.name.toLowerCase() ) return 1
          return 0
      });

  } else {

      return state.Filtrados.sort( (a, b) => {
          if( a.name.toLowerCase() > Math.random() ) return -1
          if( b.name.toLowerCase() > Math.random() ) return 1
          return 0
      });

  }

}

// Fin de funcion de ordenamiento
//===================================

const initialState = {
  User: {},
  Event: [],
  Events: [],
  SearchResult: [],
  NearbyEvents: [],
  Filtrados: [],
  Filtrados1: [],
  Filtrados2: [],
  AllEvents: [],
  Cities: [],
  PrefereneceId:[],
  EventosLandingPage:[], //estos son los eventos que se muestran en la landing page
  UserCity:{},
  EventCity:{}
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
    //console.log("este es el " + action.payload);
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
      Filtrados: action.payload
    };
  }
  if (action.type === GET_BY_CAT) {
    return {
      ...state,
      Filtrados: action.payload === '1' ? [...state.AllEvents] : [...state.AllEvents].filter((d) =>
        d.category.includes(action.payload)
      ),
    };
  }
  if (action.type === GET_BY_SUB) {
    return {
      ...state,
      Filtrados: action.payload === '1' ? [...state.AllEvents] : [...state.AllEvents].filter((d) =>
        d.subcategory.includes(action.payload)
      ),
    };
  }
  if (action.type === GET_BY_CITY) {
    return {
      ...state,
      Filtrados: action.payload === '1' ? [...state.AllEvents] : [...state.AllEvents].filter((d) =>
        d.location.includes(action.payload)
      ),
    };
  }

  if(action.type === ORDEN_BY_NAME){
    return {
      ...state,
      Filtrados: ordenEventosNombre(state, action.payload)
    }
  }

  if(action.type === GET_ALL_CITIES){

    const array = [...state.AllEvents].map( e => e.location)
    const unique = [...new Set(array)]
    return{
      ...state,
      Cities:  unique
    }
  }

  if(action.type === POST_PREFERENCE){
    return{
      ...state,
      PreferenceId: action.payload.id
    }
  }

  if(action.type === PUT_EVENT){
    return{
      ...state,
      Event : action.payload
    }
  }

  if(action.type === GET_EVENTS_LP ){
    return{
      ...state,
      EventosLandingPage: action.payload
    }
  }
  if (action.type === CHANGE_USER_CITY) {
    return{
      state,
      UserCity:{cityName:action.payload.cityName, cityCords: action.payload.cityCords}
    }
  }
  if (action.type === CHANGE_EVENT_CITY) {
    return{
      state,
      EventCity:{cityName:action.payload.cityName, cityCords: action.payload.cityCords}
    }
  }
  return state;
}


export default rootReducer;
