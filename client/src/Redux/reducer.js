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
} from "./actiontypes";

const initialState = {
  allVideogames: [],
  filters: [],
  gameDetails: [],
  genres: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogames: payload,
      };
    case GET_VIDEOGAME_BY_NAME:
      return {
        ...state,
        videogames: payload,
      };
    case GET_GAME_DETAILS:
      return {
        ...state,
        videogameDetail: payload,
      };
    case FILTER_BY_ORIGIN:
      return {
        ...state,
        videogames: payload,
      };
    case FILTER_BY_GENRES:
      return {
        ...state,
        videogames: payload,
      };
    case ORDER_BY_NAME:
      return {
        ...state,
        videogames: payload,
      };
    case ORDER_BY_RATING:
      return {
        ...state,
        videogames: payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      };
    case POST_VIDEOGAME:
      return {
        ...state,
        videogames: [...state.videogames, payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
