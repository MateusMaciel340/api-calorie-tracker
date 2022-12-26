const express = require("express");
const router = express.Router();

// Routes
const routerAdmin = require("./admin/admin.route");
const routerAuth = require("./auth/auth.route");
const routerFoods = require("./foods/foods.route");
const routerUsers = require("./users/user.route");

router.use(/* #swagger.tags = ['Admin']*/ "/admin", routerAdmin);
router.use(/* #swagger.tags = ['Auth']*/ "/auth", routerAuth);
router.use(/* #swagger.tags = ['Foods']*/ "/foods", routerFoods);
router.use(/* #swagger.tags = ['Users']*/ "/users", routerUsers);

module.exports = router;