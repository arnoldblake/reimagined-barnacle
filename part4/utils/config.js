require('dotenv').config()

const DB_NAME = process.env.MONGODB_DBNAME
const DB_PORT = process.env.MONGODB_PORT
const DB_HOST = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001
const DB_USERNAME = process.env.MONGODB_USERNAME
const DB_PASSWORD = process.env.MONGODB_PASSWORD


module.exports = {
  DB_HOST, DB_PORT, PORT, DB_USERNAME, DB_PASSWORD, DB_NAME
}