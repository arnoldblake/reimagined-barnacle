/* eslint-disable no-undef */
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('verify that the unique id property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  const ids = response.body.map(blog => {
    expect(blog.id).toBeDefined()
    return blog.id
  })
  expect(ids).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})