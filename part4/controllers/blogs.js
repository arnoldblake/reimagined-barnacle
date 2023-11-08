const personsRouter = require('express').Router()
const Blog = require('../models/blog')

personsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs)
})

personsRouter.post('/', async (request, response) => {
  const body = request.body
  body.likes = body.likes ? body.likes : 0

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  var savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = personsRouter