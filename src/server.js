const express = require("express");
const app = express();

const routes = require("./routes");

const dotenv = require("dotenv").config();
const cors = require("cors");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

app.use(
    express.json(), cors(), express.urlencoded({ extended: true }), routes
);

app.all("*", (req, res) => {
    res.status(400).json("Not found!");
});

app.use(async (err, req, res, next) => {
    if (err) {
        res.status(500).json({
            message: err.message,
            code: 500
        });

        return;
    }

    res.status(404).json({
        ermessage: "Not found!",
        code: 404
    });
});

app.listen(process.env.PORT_SERVER, () => {
    console.log(`Listening on http://localhost:${process.env.PORT_SERVER}/`);
});