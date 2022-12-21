const express = require("express");
const routerAdmin = express.Router();

routerAdmin.get("/Admin", (req, res) => {
    res.send("Admin!");
});

module.exports = routerAdmin;