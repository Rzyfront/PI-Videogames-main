import {
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME_BY_NAME,
  GET_GAME_DETAILS,
  FILTER_BY_ORIGIN,
  FILTER_BY_GENRES,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  GET_GENRES,
  POST_VIDEOGAME,
  RESET_FILTERS,
} from "./actiontypes";
import axios from "axios";

export function getAllVideogames() {
  return async function (dispatch) {
    const result = await axios("http://localhost:3001/videogames");
    return dispatch({
      type: GET_ALL_VIDEOGAMES,
      payload: result.data,
    });
  };
}

export function getVideogameByName(name) {
  return async function (dispatch) {
    try {
      const result = await axios(
        `http://localhost:3001/videogames?name=${name}`
      );
      return dispatch({
        type: GET_VIDEOGAME_BY_NAME,
        payload: result.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getGameDetails(id) {
  return async function (dispatch) {
    try {
      const result = await axios(`http://localhost:3001/videogames/${id}`);
      return dispatch({
        type: GET_GAME_DETAILS,
        payload: result.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function filterByOrigin(origin) {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
}

export function filterGenres(genres) {
  return {
    type: FILTER_BY_GENRES,
    payload: genres,
  };
}

export function orderByRating(orden) {
  return {
    type: ORDER_BY_RATING,
    payload: orden,
  };
}

export function orderByName(orden) {
  return {
    type: ORDER_BY_NAME,
    payload: orden,
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      const result = await axios("http://localhost:3001/genres");
      return dispatch({
        type: GET_GENRES,
        payload: result.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function postVideogames(dataGame) {
  return async function (dispatch) {
    try {
      const result = await axios.post(
        "http://localhost:3001/videogame",
        dataGame
      );
      //agregalo a los juegos que se muestran en pantalla
      dispatch({ type: POST_VIDEOGAME, payload: result.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function resetFilters(filtros) {
  return {
    type: RESET_FILTERS,
    payload: filtros,
  };
}
