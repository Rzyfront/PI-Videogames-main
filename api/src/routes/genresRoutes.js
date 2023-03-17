const { Router } = require("express");
const router = Router();
const { getAllGenres } = require("../controllers/Controllers.js");

router.get("/genres", async (req, res) => {
  try {
    const response = await getAllGenres();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
