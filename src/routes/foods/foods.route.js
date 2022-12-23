const express = require("express");
const routerFoods = express.Router();

const foodsController = require("../../controllers/food/foods.controller");

routerFoods.get("/", foodsController.getAll);
routerFoods.get("/:id", foodsController.getOne);
routerFoods.post("/", foodsController.create);
routerFoods.put("/:id", foodsController.update);
routerFoods.delete("/:id", foodsController.deleteOne);

module.exports = routerFoods;