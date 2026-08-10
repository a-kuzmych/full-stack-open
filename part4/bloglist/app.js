const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')

const app = express()

async function connectToDatabase() {
  try {
    await mongoose.connect(config.MONGODB_URI, { family: 4 })
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error('error connection to MongoDB:', error.message)
  }
}

connectToDatabase()

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
