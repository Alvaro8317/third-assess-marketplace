const {Pool} = require('pg');
const {getSecret} = require('../utils/secret_util');
const {environmentVariables} = require("../utils/env_util");

let pool;

const initDb = async () => {
    try {
        const secret = await getSecret();
        const secretJson = JSON.parse(secret);
        const connectionString = `postgres://${
            environmentVariables.databaseUserName ? environmentVariables.databaseUserName : secretJson.username
        }:${
            environmentVariables.databasePassword ? environmentVariables.databasePassword : secretJson.password
        }@${environmentVariables.databaseHostname}:${environmentVariables.databasePort}/${
            environmentVariables.databaseName
        }`
        pool = new Pool({connectionString});
        console.log(connectionString)
        console.log("Database pool initialized");
    } catch (error) {
        console.error("Error initializing database connection pool:", error);
        throw error;
    }
};

const query = (text, params) => {
    if (!pool) {
        throw new Error("Database pool has not been initialized. Call initDb first.");
    }
    return pool.query(text, params);
};

module.exports = {
    initDb,
    query,
};
