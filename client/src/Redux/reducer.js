import {
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME_BY_NAME,
  GET_GAME_DETAILS,
  GET_GENRES,
  POST_VIDEOGAME,
  FILTER,
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

    case FILTER:
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
