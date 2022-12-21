const express = require("express");
const router = express.Router();

// Routes
const routerAdmin = require("./admin/admin.route");
const routerAuth = require("./auth/auth.route");
const routerFoods = require("./foods/foods.route");
const routerUsers = require("./users/user.route");

router.use(
    routerAdmin, routerAuth, routerFoods,
    routerUsers
);

module.exports = router;