import {
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME_BY_NAME,
  GET_GAME_DETAILS,
  GET_GENRES,
  POST_VIDEOGAME,
  FILTER,
  ERROR_SERVER,
} from "./actiontypes";
import axios from "axios";
//Manejar errores de los catch
export function getAllVideogames() {
  return async function (dispatch) {
    try {
      const result = await axios("/videogames");
      return dispatch({
        type: GET_ALL_VIDEOGAMES,
        payload: result.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_SERVER,
        payload: error.message,
      });
    }
  };
}

export function getVideogameByName(name) {
  return async function (dispatch) {
    try {
      const result = await axios(`/videogames?name=${name}`);
      return dispatch({
        type: GET_VIDEOGAME_BY_NAME,
        payload: result.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_SERVER,
        payload: error.message,
      });
    }
  };
}

export function getGameDetails(id) {
  return async function (dispatch) {
    try {
      const result = await axios(`/videogames/${id}`);
      return dispatch({
        type: GET_GAME_DETAILS,
        payload: result.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_SERVER,
        payload: error.message,
      });
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      const result = await axios("/genres");
      return dispatch({
        type: GET_GENRES,
        payload: result.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_SERVER,
        payload: error.message,
      });
    }
  };
}

export function postVideogames(dataGame) {
  return async function (dispatch) {
    try {
      const result = await axios.post("/videogames", dataGame);
      //agregalo a los juegos que se muestran en pantalla
      dispatch({ type: POST_VIDEOGAME, payload: result.data });
    } catch (error) {
      return dispatch({
        type: ERROR_SERVER,
        payload: error.message,
      });
    }
  };
}

export function Filter(filtros) {
  return {
    type: FILTER,
    payload: filtros,
  };
}
