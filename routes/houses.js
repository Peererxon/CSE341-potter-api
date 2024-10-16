const express = require("express");
const router = express.Router();
const housesController = require("../controllers/houses");
const { validateHouse } = require("../middleware/validate");

router.get("/", housesController.getAllHouses);
router.get("/:id", housesController.getSingleHouse);
router.post("/", validateHouse, housesController.createHouse);
router.put("/:id", validateHouse, housesController.updateHouse);
router.delete("/:id", housesController.deleteHouse);

module.exports = router;
