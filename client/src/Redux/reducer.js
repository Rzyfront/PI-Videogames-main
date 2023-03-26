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

const initialState = {
  allVideogames: [],
  filters: [],
  gameDetails: {},
  genres: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        allVideogames: payload,
        filters: payload,
      };
    case GET_VIDEOGAME_BY_NAME:
      return {
        ...state,
        allVideogames: payload,
        filters: payload,
      };
    case GET_GAME_DETAILS:
      return {
        ...state,
        gameDetails: payload,
      };
    case FILTER_BY_ORIGIN:
      const filteredVideogames = state.filters.filter(
        (game) => game.origin === payload
      );

      return {
        ...state,
        filters: filteredVideogames,
      };
    case FILTER_BY_GENRES:
      const filteredVideogamesByGenres = state.filters.filter((game) =>
        game.genres.some((genre) => genre.name === payload)
      );

      return {
        ...state,
        filters: filteredVideogamesByGenres,
      };
    case ORDER_BY_NAME:
      const sortedGamesByName = [...state.filters].sort((gameA, gameB) => {
        const nameA = gameA.name.toLowerCase();
        const nameB = gameB.name.toLowerCase();
        if (payload === "asc") {
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        } else if (payload === "desc") {
          if (nameA < nameB) return 1;
          if (nameA > nameB) return -1;
          return 0;
        } else {
          return 0;
        }
      });
      return {
        ...state,
        filters: sortedGamesByName,
      };
    case ORDER_BY_RATING:
      let juegosOrdenados;
      if (payload === "asc") {
        juegosOrdenados = [...state.filters].sort(
          (a, b) => a.rating - b.rating
        );
      } else if (payload === "desc") {
        juegosOrdenados = [...state.filters].sort(
          (a, b) => b.rating - a.rating
        );
      }
      return {
        ...state,
        filters: juegosOrdenados,
      };
    case RESET_FILTERS:
      const currentFilters = payload;
      let filteredGames = state.allVideogames;

      if (currentFilters.rating === "asc") {
        filteredGames = [...filteredGames].sort((a, b) => a.rating - b.rating);
      } else if (currentFilters.rating === "desc") {
        filteredGames = [...filteredGames].sort((a, b) => b.rating - a.rating);
      }

      if (currentFilters.alphabetic === "asc") {
        filteredGames = [...filteredGames].sort((gameA, gameB) => {
          const nameA = gameA.name.toLowerCase();
          const nameB = gameB.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      } else if (currentFilters.alphabetic === "desc") {
        filteredGames = [...filteredGames].sort((gameA, gameB) => {
          const nameA = gameA.name.toLowerCase();
          const nameB = gameB.name.toLowerCase();
          if (nameA < nameB) return 1;
          if (nameA > nameB) return -1;
          return 0;
        });
      }

      if (currentFilters.genre !== "none") {
        filteredGames = filteredGames.filter((game) =>
          game.genres.some((genre) => genre.name === currentFilters.genre)
        );
      }

      if (currentFilters.origin !== "none") {
        filteredGames = filteredGames.filter(
          (game) => game.origin === currentFilters.origin
        );
      }
      return {
        ...state,
        filters: filteredGames,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      };
    case POST_VIDEOGAME:
      return {
        ...state,
        allVideogames: [...state.allVideogames, payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
