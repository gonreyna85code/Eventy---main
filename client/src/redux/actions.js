import axios from "axios";
export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const GET_USER = "GET_USER";

export function register(register) {
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
          url: "http://localhost:4000/login",
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
        url: "http://localhost:4000/event",
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