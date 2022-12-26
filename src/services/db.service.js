const dbConfig = require("../configs/db.config");
const { Pool } = require("pg");
const pool = new Pool(dbConfig);

const types = require("pg").types;

types.setTypeParser(20, function (val) {
    return parseInt(val, 10);
});

pool.on("error", (err, client) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
});

module.exports = {
    async query(query) {
        try {
            return pool.query(query);
        } catch (err) {
            return err;
        }
    },

    async queryParams(query, params) {
        return pool.query(query, params);
    }
}