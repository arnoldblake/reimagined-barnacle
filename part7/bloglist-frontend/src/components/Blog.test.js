import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './blog'

test('renders content', () => {
  const blog = {
    title: 'Hello World',
    author: 'Paul McA',
    url: 'http://www.contoso.com',
    likes: '9',
    user: {
      name: 'faceface',
    },
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Title: Hello World Author: Paul McA')
  expect(element).toBeDefined()
})
