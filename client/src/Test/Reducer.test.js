import rootReducer from "../Redux/reducer.js";

describe("rootReducer", () => {
  it("should return the initial state", () => {
    expect(rootReducer(undefined, {})).toEqual({
      allVideogames: [],
      gamesShown: [],
      gameDetails: {},
      genres: [],
      errorServer: {
        errorStatus: false,
        errorMessage: "",
      },
    });
  });

  it("should handle GET_ALL_VIDEOGAMES", () => {
    const action = {
      type: "GET_ALL_VIDEOGAMES",
      payload: [
        { id: 1, name: "Game 1" },
        { id: 2, name: "Game 2" },
      ],
    };
    const expectedState = {
      allVideogames: [
        { id: 1, name: "Game 1" },
        { id: 2, name: "Game 2" },
      ],
      gamesShown: [
        { id: 1, name: "Game 1" },
        { id: 2, name: "Game 2" },
      ],
      gameDetails: {},
      genres: [],
      errorServer: {
        errorStatus: false,
        errorMessage: "",
      },
    };
    expect(rootReducer(undefined, action)).toEqual(expectedState);
  });

  it("should handle GET_VIDEOGAME_BY_NAME", () => {
    const action = {
      type: "GET_VIDEOGAME_BY_NAME",
      payload: [
        { id: 1, name: "Game 1" },
        { id: 2, name: "Game 2" },
      ],
    };
    const expectedState = {
      allVideogames: [
        { id: 1, name: "Game 1" },
        { id: 2, name: "Game 2" },
      ],
      gamesShown: [
        { id: 1, name: "Game 1" },
        { id: 2, name: "Game 2" },
      ],
      gameDetails: {},
      genres: [],
      errorServer: {
        errorStatus: false,
        errorMessage: "",
      },
    };
    expect(rootReducer(undefined, action)).toEqual(expectedState);
  });

  it("should handle GET_GAME_DETAILS", () => {
    const action = {
      type: "GET_GAME_DETAILS",
      payload: { id: 1, name: "Game 1" },
    };
    const expectedState = {
      allVideogames: [],
      gamesShown: [],
      gameDetails: { id: 1, name: "Game 1" },
      genres: [],
      errorServer: {
        errorStatus: false,
        errorMessage: "",
      },
    };
    expect(rootReducer(undefined, action)).toEqual(expectedState);
  });

  it("should handle GET_GENRES", () => {
    const action = {
      type: "GET_GENRES",
      payload: ["Action", "Adventure"],
    };
    const expectedState = {
      allVideogames: [],
      gamesShown: [],
      gameDetails: {},
      genres: ["Action", "Adventure"],
      errorServer: {
        errorStatus: false,
        errorMessage: "",
      },
    };
    expect(rootReducer(undefined, action)).toEqual(expectedState);
  });

  it("should handle ERROR_SERVER", () => {
    const action = {
      type: "ERROR_SERVER",
      payload: "Error fetching data",
    };
    const expectedState = {
      allVideogames: [],
      gamesShown: [],
      gameDetails: {},
      genres: [],
      errorServer: {
        errorStatus: true,
        errorMessage: "Error fetching data",
      },
    };
    expect(rootReducer(undefined, action)).toEqual(expectedState);
  });
});
