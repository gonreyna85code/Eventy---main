import axios from "axios";
export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_USER = "GET_USER";
export const FIND_EVENT = "FIND_EVENT"; 
export const GET_EVENT = 'GET_EVENT';
export const GET_NEARBY_EVENTS = 'GET_NEARBY_EVENTS';
export const PUT_USER = 'PUT_USER'
export const FIND_EVENT_CATEGORY = 'FIND_EVENT_CATEGORY';

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
  return async function (dispatch) {
    try {
      const json = await axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:4000/event/" + name,
      });
      return dispatch({ type: "GET_EVENT", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
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

export function putUser(profile){
  return function(dispatch){
    axios({
      method: "PUT",
      withCredentials: true,
      url: "http://localhost:4000/user_update",
      data: {...profile}
    })
    .then(resultado=>dispatch({type: PUT_USER, payload: profile}))
    .catch(err=>alert(err))
  }
}
export function findEventByCategory (parametro){
  return function (dispatch){
      axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000//events/filter/categoria-" + parametro,
    })
    .then(resultado => dispatch({type: FIND_EVENT_CATEGORY, payload: resultado}))
    .catch(err => alert(err))
  }
}