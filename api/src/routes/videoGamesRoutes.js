// const express = require("express");
const {
  getVideogames,
  createVideogame,
  getGameDetail,
  getGameByName,
} = require("../controllers/Controllers.js");
const { Router } = require("express");
const router = Router();

router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const response = await getVideogames();
      return res.status(200).json(response);
    } else {
      const response = await getGameByName(name);
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/videogames/:idVideogame", async (req, res) => {
  const { idVideogame } = req.params;
  try {
    const gameDetail = await getGameDetail(idVideogame);
    return res.status(200).json(gameDetail);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/videogames", async (req, res) => {
  const {
    name,
    description,
    platforms,
    background_image,
    released,
    rating,
    genres,
  } = req.body;
  try {
    const newGame = await createVideogame(
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres
    );
    res.status(200).json(newGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
