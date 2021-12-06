import axios from "axios";
require("dotenv").config();
export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_USER = "GET_USER";
export const FIND_EVENT = "FIND_EVENT"; 
export const GET_EVENT = 'GET_EVENT';
export const GET_NEARBY_EVENTS = 'GET_NEARBY_EVENTS';
export const PUT_USER = 'PUT_USER'
export const FIND_EVENT_CATEGORY = 'FIND_EVENT_CATEGORY';
export const FIND_EVENT_SUB = 'FIND_EVENT_SUB';
export const GET_ALL_EVENTS = 'GET_ALL_EVENTS';
export const GET_BY_CAT = 'GET_BY_CAT';
export const GET_BY_SUB = 'GET_BY_SUB';
export const GET_BY_CITY = 'GET_BY_CITY';
export const ORDEN_BY_NAME = 'ORDEN_BY_NAME';
export const GET_ALL_CITIES = 'GET_ALL_CITIES';
export const POST_PREFERENCE = 'POST_PREFERENCE';
export const PUT_EVENT = 'PUT_EVENT';
export const GET_EVENTS_LP = 'GET_EVENTS_LP' //Eventos landing page
export const CHANGE_USER_CITY= 'CHANGE_USER_CITY'
export const CHANGE_EVENT_CITY= 'CHANGE_EVENT_CITY'



export function changeUserCity(cityDates){
  return function(dispatch){
    return dispatch({type: CHANGE_USER_CITY, payload:cityDates})
  }
}
export function changeEventCity(eventDates){
  return function(dispatch){
    return dispatch({type:CHANGE_EVENT_CITY, payload:eventDates})
  }
}

export function registerUser(register) {
    return async function (dispatch) {
      try {
        const json = await axios({
          method: "POST",
          data: {
            username: register.username,
            password: register.password,
            profile: register.profile,
          },
          withCredentials: true,
          url: "http://localhost:4000/register",
        });
        return dispatch({ type: "REGISTER", payload: json.data });
      } catch (error) {
        console.log(error);
      }
    };
  }

export function login(login) {
  return async function (dispatch) {
    try {
      const json = await axios({
        method: "POST",
        data: {
          username: login.username,
          password: login.password,          
        },
        withCredentials: true,
        url: "http://localhost:4000/login",
      });
      const token = res.data.token;
      axios.defaults.headers.common["secret_token"] = token;
      return dispatch({ type: "LOGIN", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function logout(login) {
  return async function (dispatch) {
    try {
      const json = await axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:4000/logout",
      });
      console.log('Usuario no logueado')
      return dispatch({ type: "LOGOUT", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUser() {
  return async function (dispatch) {
    try {
      const json = await axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:4000/user",
      });
      return dispatch({ type: "GET_USER", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getEvent(name) {
  return function (dispatch){
    axios({
    method: "GET",
    withCredentials: true,
    url: "http://localhost:4000/event/" + name,
  })
  .then(resultado => dispatch({type: GET_EVENT, payload: resultado.data}))
  .then(resultado => console.log(resultado))
  .catch(err => alert(err))
}
}

export function postEvent(event) {
  return async function (dispatch) {
    try {
      const json = await axios({
        method: "POST",
        data: {
          name: event.name,
          location: event.location,
          info: event.info,
          event_pay: event.event_pay,
          date: event.date,
          user: event.user,
          category: event.category,
          subcategory: event.subcategory
        },
        withCredentials: true,
        url: "http://localhost:4000/event",
      });
      return dispatch({ type: "POST_EVENT", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllEvents(){
  return function (dispatch){
      axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/allEvents",
    })
    .then(resultado => dispatch({type: GET_ALL_EVENTS, payload: resultado.data}))
    .catch(err => alert(err))
  }
}

export function findEvent (parametro){
  return function (dispatch){
      axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/eventsAll/" + parametro,
    })
    .then(resultado => dispatch({type: FIND_EVENT, payload: resultado}))
    .catch(err => alert(err))
  }
}

//Esta lo agregue para traerme los eventos cercanos al home
export function getNearbyEvents(parametro){
  return function (dispatch){
      axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/eventsAll/" + parametro,
    })
    .then(resultado => dispatch({type: GET_NEARBY_EVENTS, payload: resultado.data}))
    .catch(err => alert(err))
  }
}

//trae los eventos que iran a la landing page
export function getEventosLandingPage(){
  return function (dispatch){
    axios({
    method: "GET",
    withCredentials: false,
    url: "http://localhost:4000/lp-events/",
  })
  .then(resultado => dispatch({type: GET_EVENTS_LP, payload: resultado.data}))
  .catch(err => alert(err))
}

}

export function putUser(user){
  return function(dispatch){
    axios({
      method: "PUT",
      withCredentials: true,
      url: "http://localhost:4000/user_update",
      data: {
        username:user.username,
        profile:{...user.profile}
      }
    })
    .then(resultado=>{
      dispatch({type: PUT_USER, payload: user.profile})
      console.log(resultado.data)
      alert("Cambios guardados")
    })
    .catch(err=>alert(err))
  }
}

export function findEventByCategory (category){
  if(category === 'social'){
    return function (dispatch){
      axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:4000/socialEvents",
      })
      .then(resultado => dispatch({type: FIND_EVENT_CATEGORY, payload: resultado.data}))
      .catch(err => alert(err))
    }
  }else if(category === 'sports'){
    return function (dispatch){
      axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:4000/sportEvents",
      })
      .then(resultado => dispatch({type: FIND_EVENT_CATEGORY, payload: resultado.data}))
      .catch(err => alert(err))
    }
  }
}

export function findEventSub(subcategory){
  return function (dispatch){
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/allEvents",
    })
    .then(resultado => dispatch({type: FIND_EVENT_SUB, payload: resultado.data, sub: subcategory}))
    .catch(err => alert(err))
  }
} 

export function getByCat(category) {
  return { type: "GET_BY_CAT", payload: category };
}

export function getBySub(subcategory) {
  return { type: "GET_BY_SUB", payload: subcategory };
}

export function getByCity(city) {
  return { type: "GET_BY_CITY", payload: city };
}


export function filterByName(orden){
  return{ type: ORDEN_BY_NAME, payload: orden}
}

export function getAllCities(){
  return{ type: GET_ALL_CITIES, payload: ''}
}

export function postPreference(preference){
  return function (dispatch){
    axios({
      method: "POST",
      data: {
        title: preference.title,
        price: preference.price,
        quantity: preference.quantity
      },
      withCredentials: true,
      url: "http://localhost:4000/create_preference",
    })
    .then(resultado => dispatch({type: POST_PREFERENCE, payload: resultado.data}))
    .catch(err => alert(err))
  }
}

export function putEvent(edit, id){
  return function (dispatch){
    axios({
      method:"PUT",
      data: edit,
      withCredentials: true,
      url: "http://localhost:4000/editarEvento/" + id,
    })
    .then(resultado => dispatch({type: PUT_EVENT, payload: resultado.data}))
    .catch(err => alert(err))
  }
}
