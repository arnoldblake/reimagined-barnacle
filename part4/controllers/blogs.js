const personsRouter = require('express').Router()
const Blog = require('../models/blog')

personsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs)
})

personsRouter.post('/', async (request, response) => {
  const body = request.body
  body.likes = body.likes ? body.likes : 0

  if (!body.title) response.status(400).end()

  const blog = new Blog(body)

  var savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = personsRouter