const axios = require("axios");
require("dotenv").config();
const { expect } = require("chai");
const { describe, it } = require("mocha");
const { Op } = require("sequelize");
const { Videogame, Genre } = require("../../src/db");
const {
  getVideogames,
  createVideogame,
  getGameDetail,
  getGameByName,
  getAllGenres,
} = require("../../src/controllers/Controllers");

const { API_KEY } = process.env;

describe("Videogame Controller", function () {
  let createdGame = null;

  it("getVideogames should return an array of objects", async function () {
    const videogames = await getVideogames();
    expect(videogames).to.be.an("array");
    expect(videogames[0]).to.be.an("object");
  });

  it("createVideogame should return the created videogame object", async function () {
    const newGame = {
      name: "New Game2",
      description: "This is a new game",
      platforms: ["PS5", "Xbox Series X"],
      background_image: "http://some-url.com",
      released: "2023-03-28",
      rating: 4.5,
      genres: [1, 2, 3],
    };

    createdGame = await createVideogame(
      newGame.name,
      newGame.description,
      newGame.platforms,
      newGame.background_image,
      newGame.released,
      newGame.rating,
      newGame.genres
    );
    expect(createdGame).to.be.an("object");
    expect(createdGame).to.have.property("name", newGame.name);
    expect(createdGame).to.have.property("description", newGame.description);
    expect(createdGame)
      .to.have.property("platforms")
      .deep.equal(newGame.platforms);
    expect(createdGame).to.have.property(
      "background_image",
      newGame.background_image
    );
    expect(createdGame).to.have.property("released", newGame.released);
    expect(createdGame).to.have.property("rating", newGame.rating);
  });

  it("getGameDetail should return an object with the specified game detail", async function () {
    const game = await getGameDetail(createdGame.id);
    expect(game).to.be.an("object");
    expect(game).to.have.property("id", createdGame.id);
    expect(game).to.have.property("name", createdGame.name);
    expect(game).to.have.property("description", createdGame.description);
    expect(game)
      .to.have.property("platforms")
      .deep.equal(createdGame.platforms);
    expect(game).to.have.property(
      "background_image",
      createdGame.background_image
    );
    expect(game).to.have.property("released", createdGame.released);
    expect(game).to.have.property("rating", createdGame.rating);
    expect(game).to.have.property("genres").deep.equal(createdGame.genres);
  });

  it("getGameByName should return an array of objects with the specified game name", async function () {
    const games = await getGameByName("zelda");
    expect(games).to.be.an("array");
    expect(games[0]).to.be.an("object");
    expect(games[0]).to.have.property("name").that.contains("zelda");
  });

  after(async function () {
    if (createdGame) {
      await createdGame.destroy({ force: true });
    }
  });
});

describe("Genres Controller", function () {
  it("getAllGenres should return an array of objects", async function () {
    const genres = await getAllGenres();
    expect(genres).to.be.an("array");
    expect(genres[0]).to.be.an("object");
  });
});
