const express = require("express");
const routerUsers = express.Router();

const usersController = require("../../controllers/user/users.controller");

routerUsers.get("/me", usersController.getAuthUser);
routerUsers.post("/me", usersController.updateAuthUser);

routerUsers.get("/me/check/monthly-budget", usersController.checkBudgetLimit);
routerUsers.get("/me/check/daily-calories", usersController.checkCalorieLimit);

module.exports = routerUsers;