require('dotenv').config()

const DB_NAME = process.env.COSMOSDB_NAME
const DB_PORT = process.env.COSMOSDB_PORT
const DB_HOST = process.env.COSMOSDB_HOST
const PORT = process.env.PORT || 3001
const DB_USERNAME = process.env.COSMOSDB_USERNAME
const DB_PASSWORD = process.env.COSMOSDB_PASSWORD


module.exports = {
  DB_HOST, DB_PORT, PORT, DB_USERNAME, DB_PASSWORD, DB_NAME
}