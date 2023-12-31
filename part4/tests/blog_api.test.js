/* eslint-disable no-undef */
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('test that blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const response = await api
      .get('/api/users')
      .expect(200)

    const blogObjects = helper.initialBlogs.map(blog => {
      blog.user = response.body[0].id
      return new Blog(blog)
    })
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
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

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'A whole new world',
      author: 'Lorcana',
      url: 'https://lorcana.com/',
      likes: 42
    }

    const user = {
      'username': 'root',
      'password': 'sekret'
    }

    const loginResponse = await api
      .post('/api/login')
      .send(user)
      .expect(200)

    expect(loginResponse.body.token).toBeDefined()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('A whole new world')
  })

  test('is missing a likes property it will default to 0', async () => {

    const newBlog = {
      title: 'Be Prepared',
      author: 'Lorcana Chapter 1',
      url: 'https://lorcana1.com/'
    }

    const user = {
      'username': 'root',
      'password': 'sekret'
    }

    const loginResponse = await api
      .post('/api/login')
      .send(user)
      .expect(200)

    expect(loginResponse.body.token).toBeDefined()

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBeDefined()

  })
})

describe('creation of a blog without a', () => {
  test('title is not added', async () => {
    const newBlog = {
      author: 'No Title',
      url: 'https://notitle.com/',
      likes: 5
    }

    const user = {
      'username': 'root',
      'password': 'sekret'
    }

    const loginResponse = await api
      .post('/api/login')
      .send(user)
      .expect(200)

    expect(loginResponse.body.token).toBeDefined()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .expect(400)

  })

  test('url is not added', async () => {
    const newBlog = {
      title: 'No Url',
      author: 'No Url',
      likes: 5
    }

    const user = {
      'username': 'root',
      'password': 'sekret'
    }

    const loginResponse = await api
      .post('/api/login')
      .send(user)
      .expect(200)

    expect(loginResponse.body.token).toBeDefined()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .expect(400)

  })
})

describe('deletion of a blog', () => {

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const user = {
      'username': 'root',
      'password': 'sekret'
    }

    const loginResponse = await api
      .post('/api/login')
      .send(user)
      .expect(200)

    expect(loginResponse.body.token).toBeDefined()

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .expect(204)
  })
})

describe('update a blog', () => {
  test('succeeds with 200', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blog = blogsAtStart[0]

    blog.likes = 99999
    console.log()
    const result = await api
      .put(`/api/blogs/${blog.id}`)
      .send(blog)
      .expect(200)

    expect(result.body.likes).toEqual(99999)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})