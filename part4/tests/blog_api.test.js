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

test('a valid note can be added', async () => {
  const newBlog = {
    title: 'A whole new world',
    author: 'Lorcana',
    url: 'https://lorcana.com/',
    likes: 42
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('A whole new world')
})

afterAll(async () => {
  await mongoose.connection.close()
})