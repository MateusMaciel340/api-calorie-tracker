const express = require("express");
const routerAdmin = express.Router();

const adminController = require("../../controllers/admin/admin.controller");
const { authRole } = require("../../middlewares/protected.middleware");
const { ROLE } = require("../../utils/consts");

routerAdmin.use(authRole(ROLE.ADMIN));

routerAdmin.get("/users", adminController.getAllUsers);
routerAdmin.get("/users/:id", adminController.getUser);
routerAdmin.get("/users/:id/foods", adminController.getUserFoods);

routerAdmin.post("/users/:id/foods", adminController.createUserFood);
routerAdmin.put("/users/:id/foods/:foodId", adminController.updateUserFood);
routerAdmin.delete("/users/:id/foods/:foodId", adminController.deleteUserFood);
routerAdmin.get("/statistics", adminController.getStatistics);

routerAdmin.post("/random/users", adminController.createRandomUsers);
routerAdmin.post("/random/foods", adminController.createRandomFoodsForUser);

module.exports = routerAdmin;