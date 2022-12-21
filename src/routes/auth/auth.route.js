const express = require("express");
const routerAuth = express.Router();

routerAuth.get("/Auth", (req, res) => {
    res.send("Auth!");
});

module.exports = routerAuth;