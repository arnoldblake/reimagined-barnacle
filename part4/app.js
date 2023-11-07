const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')

mongoose.set('strictQuery', false)

const url = 'mongodb://'+config.DB_HOST+':'+config.DB_PORT+'/'+config.DB_NAME+'?ssl=true&replicaSet=globaldb'

logger.info('connecting to', url)

mongoose.connect(url, {
    auth: {
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD
    },
    retryWrites: false
})
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.info('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app