import axios from "axios";
require("dotenv").config();
export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_USER = "GET_USER";
export const FIND_EVENT = "FIND_EVENT"; 
export const GET_EVENT = 'GET_EVENT';
export const GET_NEAR_EVENTS = 'GET_NEAR_EVENTS' 
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
export const DELETE_FOLLOW = 'DELETE_FOLLOW'
export const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION'
export const FIND_USER = 'FIND_USER'
export const POST_FOLLOW = 'POST_FOLLOW'
export const POST_SUBSCRIPTION = 'POST_SUBSCRIPTION'
export const DELETE_EVENT = 'DELETE_EVENT' //Eliminar evento.
export const RESET = 'RESET'
export const FORGOT = 'FORGOT'

const development = process.env.NODE_ENV !== 'production';
axios.defaults.withCrendentails = true;
axios.defaults.Credentials = "includes";

const local = "http://localhost:4000/"
const heroku = "https://gonzalo-eventy3.herokuapp.com/"



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
          url:  development ? local + 'register' : heroku + "register",
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
        url:  development ? local + 'login' : heroku + "login",
      });         
      return dispatch({ type: "LOGIN", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function logout() {
  return async function (dispatch) {
    try {
      const json = await axios({
        method: "GET",
        withCredentials: true,
        url:  development ? local + 'logout' : heroku + "logout",
      });
      console.log('Usuario no logueado')
      return dispatch({ type: "LOGOUT", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function forgot(user) {
  return async function (dispatch) {
    try {
      const json = await axios({
        method: "POST",
        data: {
          username: user.username,          
        },
        withCredentials: true,
        url:  development ? local + 'forgot/' : heroku + "forgot/",
      });         
      return dispatch({ type: "FORGOT", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function reset(user) {
  return async function (dispatch) {
    try {
      const id = user.id.id;
      console.log(id)
      const json = await axios({
        method: "POST",
        data: {
          password: user.password,          
        },
        withCredentials: true,
        url:  development ? local + 'reset/' + id : heroku + "reset/" + id,
      });         
      return dispatch({ type: "RESET", payload: json.data });
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
        url:  development ? local + 'user' : heroku + "user",
        withCredentials: true,
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
    withCredentials: true,
    method: "GET",
    url:  development ? local + 'event/' + name : heroku + "event/" + name,
  })
  .then(resultado => dispatch({type: GET_EVENT, payload: resultado.data}))
  .then(resultado => console.log(resultado))
  .catch(err => alert(err))
}}

export function getNearEvents(userLocation){
  return function (dispatch){
    axios({
      withCredentials: true,
      method: 'GET',
      params:{
        lat: userLocation.lat,
        lng: userLocation.lng
      },
      url: development ? local +'eventosCercanos/' : heroku + 'eventosCercanos'
    })
    .then(resultado => dispatch({type: GET_NEAR_EVENTS, payload: resultado.data }))
    .catch(err=>alert(err))
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
        url:  development ? local + 'event' : heroku + "event",
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
      url:  development ? local + 'allEvents' : heroku + "allEvents",
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
      url:  development ? local + 'eventsAll/' + parametro : heroku + "eventsAll/" + parametro,
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
      url:  development ? local + 'eventsAll/' + parametro : heroku + "eventsAll/" + parametro,
      
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
    withCredentials: true,
    url:  development ? local + 'lp-events/' : heroku + "lp-events/",
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
      url:  development ? local + 'user_update' : heroku + "user_update",
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
        url:  development ? local + 'socialEvents' : heroku + "socialEvents",
      })
      .then(resultado => dispatch({type: FIND_EVENT_CATEGORY, payload: resultado.data}))
      .catch(err => alert(err))
    }
  }else if(category === 'sports'){
    return function (dispatch){
      axios({
        method: "GET",
        withCredentials: true,
        url:  development ? local + 'sportEvents' : heroku + "sportEvents",
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
      url:  development ? local + 'allEvents' : heroku + "allEvents",
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
      withCredentials: true,
      data: {
        title: preference.title,
        price: preference.price,
        quantity: preference.quantity
      },
      url:  development ? local + 'create_preference' : heroku + "create_preference",
    })
    .then(resultado => dispatch({type: POST_PREFERENCE, payload: resultado.data}))
    .catch(err => alert(err))
  }
}

export function putEvent(edit, id){
  return function (dispatch){
    axios({
      method:"PUT",
      withCredentials: true,
      data: edit,
      url:  development ? local + 'editarEvento/' + id : heroku + 'editarEvento/' + id,
    })
    .then(resultado => dispatch({type: PUT_EVENT, payload: resultado.data}))
    .catch(err => alert(err))
  }
}

export function subscription(username,data){
  return function (dispatch){
    axios({
      method:"POST",
      withCredentials: true,
      url:  development ? local + 'subscriptions' : heroku + 'subscriptions',
      data:{
        username,
        data,
      }
    })
    .then(resultado => dispatch({type: POST_SUBSCRIPTION, payload:resultado.data.data}))
    .catch(err => alert(err))
  }
}

export function unsubscription(username,data){
  return function (dispatch){
    axios({
      method:"DELETE",
      withCredentials: true,
      url:  development ? local + 'subscriptions' : heroku + 'subscriptions',
      data:{
        username,
        data,
      }
    })
    .then(resultado => dispatch({type: DELETE_SUBSCRIPTION, payload:resultado.data.data}))
    .catch(err => alert(err))
  }
}

export function allUnsuscription(username){
  return function (dispatch){
    axios({
      method:"DELETE",
      withCredentials: true,
      url:  development ? local + 'subscriptions/all' : heroku + 'subscriptions/all',
      data:{
        username,
      }
    })
    .then(resultado => dispatch({type: DELETE_SUBSCRIPTION, payload:resultado.data.data}))
    .catch(err => alert(err))
  }
}

export function findUser(id){
  return function (dispatch){
    axios({
      method:"GET",
      withCredentials: true,
      url:  development ? local + 'other-user/' + id : heroku + 'other-user/' + id,
    })
    .then(resultado => dispatch({type: FIND_USER, payload:resultado.data}))
    .catch(err => alert(err))
  }
}

export function follow(username,data){
  return function (dispatch){
    axios({
      method:"POST",
      withCredentials: true,
      url:  development ? local + 'follows' : heroku + 'follows',
      data:{
        username,
        data,
      }
    })
    .then(resultado => dispatch({type: POST_FOLLOW, payload:resultado.data.data}))
    .catch(err => alert(err))
  }
}

export function unfollow(username,data){
  return function (dispatch){
    axios({
      method:"DELETE",
      withCredentials: true,
      url:  development ? local + 'follows' : heroku + 'follows',
      data:{
        username,
        data,
      }
    })
    .then(resultado => dispatch({type: DELETE_FOLLOW, payload:resultado.data.data}))
    .catch(err => alert(err))
  }
}

export function deleteEvent(name){
  return function (dispatch){
    axios({
      method:"DELETE",
      withCredentials:true,
      url:  development ? local + 'event' : heroku + 'event',
      data:{
        name: name
      }
    })
    .then(resultado => dispatch({type: DELETE_EVENT, payload: resultado.data}))
    .catch(err => alert(err))
  }
}