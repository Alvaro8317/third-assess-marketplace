require('dotenv').config()
const environmentVariables = {
    "databaseName": process.env.DATABASE_NAME,
    "databaseHostname": process.env.DATABASE_HOSTNAME,
    "databasePort": process.env.DATABASE_PORT,
    "portExpress": process.env.PORT,
    "databaseUserName": process.env.DATABASE_USERNAME,
    "databasePassword": process.env.DATABASE_PASSWORD,
}
module.exports = {environmentVariables}