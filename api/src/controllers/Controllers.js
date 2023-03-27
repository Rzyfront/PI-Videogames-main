const axios = require("axios");
require("dotenv").config();
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");

//!---------------- VIDEOGAMES CONTROLLER-----------------------------

const getVideogames = async () => {
  const url = `https://api.rawg.io/api/games?key=${API_KEY}&page=`;
  let apiGames = [];
  let page = 1;
  while (apiGames.length !== 100) {
    let result = await axios(`${url}${page}`);
    apiGames = [...apiGames, ...result.data.results];
    ++page;
  }

  apiGames = apiGames.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      genres: game.genres,
      platforms: game.platforms,
      origin: "api",
      rating: game.rating,
    };
  });

  const dbGames = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const Games = [...apiGames, ...dbGames];

  let formatGames = Games.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      genres: game.genres,
      platforms: game.platforms,
      origin: game.origin,
      rating: game.rating,
    };
  });

  if (!formatGames) {
    throw Error("No se encontraron video juegos");
  }
  return formatGames;
};

const createVideogame = async (
  name,
  description,
  platforms,
  background_image,
  released,
  rating,
  genres
) => {
  if (
    !name ||
    !description ||
    !platforms ||
    !background_image ||
    !released ||
    !rating ||
    !genres
  ) {
    throw Error("No existen los campos necesarios para crear un juego");
  }

  const newGame = await Videogame.create({
    name,
    description,
    platforms,
    background_image,
    released,
    rating,
  });
  //AGREGAR RELACION
  await newGame.addGenre(genres);

  return newGame;
};

const getGameDetail = async (idVideogame) => {
  try {
    const dbGame = await Videogame.findByPk(idVideogame, {
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    if (dbGame) {
      return {
        id: dbGame.id,
        name: dbGame.name,
        description: dbGame.description,
        platforms: dbGame.platforms,
        background_image: dbGame.background_image,
        released: dbGame.released,
        rating: dbGame.rating,
        genres: dbGame.genres,
      };
    } else {
      throw new Error("Eso no es un juego, es un burro");
    }
  } catch (error) {
    const url = `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`;
    const apiGame = await axios(url);
    if (Object.keys(apiGame.data).length !== 0) {
      return {
        id: apiGame.data.id,
        name: apiGame.data.name,
        description: apiGame.data.description,
        platforms: apiGame.data.platforms,
        background_image: apiGame.data.background_image,
        released: apiGame.data.released,
        rating: apiGame.data.rating,
        genres: apiGame.data.genres,
      };
    } else {
      throw new Error("Juego no encontrado");
    }
  }
};

const getGameByName = async (name) => {
  let games = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  games = games.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      genres: game.genres,
      origin: game.origin,
      rating: game.rating,
    };
  });

  const url = `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`;
  const apiGame = await axios(url);
  let results = apiGame.data.results;
  results = results.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      genres: game.genres,
      rating: game.rating,
      origin: "api",
    };
  });

  if (games.length > 0 && results.length > 0) {
    let allGamesByName = [...games, ...results];
    return allGamesByName;
  } else if (games.length === 0 && results.length > 0) {
    return results;
  } else if (games.length > 0 && results.length === 0) {
    return games;
  } else {
    throw new Error("No se encontró el juego");
  }
};

//!---------------- GENRES CONTROLLER-----------------------------

const getAllGenres = async () => {
  const url = `https://api.rawg.io/api/genres?key=${API_KEY}`;
  const getGenres = await axios(url);
  const allGenres = getGenres.data.results.map((genre) => genre.name);

  allGenres.map(async (genre) => {
    await Genre.findOrCreate({
      where: { name: genre },
    });
  });

  const gameGenres = await Genre.findAll();
  if (gameGenres.length) {
    return gameGenres;
  } else {
    throw new Error("Holis soy un error");
  }
};

module.exports = {
  getVideogames,
  createVideogame,
  getGameDetail,
  getGameByName,
  getAllGenres,
};
