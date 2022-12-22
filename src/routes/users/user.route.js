const express = require("express");
const routerUsers = express.Router();

const usersController = require("../../controllers/user/users.controller");

routerUsers.get("/me", usersController.getAuthUser);
routerUsers.post("/me", usersController.updateAuthUser);

module.exports = routerUsers;