require('dotenv').config()

const DB_PORT = process.env.COSMOSDB_PORT
const DB_HOST = process.env.COSMOSDB_HOST
const PORT = process.env.PORT || 3001

module.exports = {
  DB_HOST, DB_PORT, PORT
}