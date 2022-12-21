const express = require("express");
const routerFoods = express.Router();

routerFoods.get("/Foods", (req, res) => {
    res.send("Foods!");
});

module.exports = routerFoods;