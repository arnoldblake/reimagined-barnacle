import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './blogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn(blog => blog)
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog}/>)

  const titleInput = screen.getByRole('textbox', { name: 'title' })
  const authorInput = screen.getByRole('textbox', { name: 'author' })
  const urlInput = screen.getByRole('textbox', { name: 'url' })
  const sendButton = screen.getByText('Create')

  await user.type(titleInput, 'testing a form...')
  await user.type(authorInput, 'this is a test')
  await user.type(urlInput, 'http://contoso.com')
  await user.click(sendButton)


  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.results[0].value.title).toBe('testing a form...')
  expect(createBlog.mock.results[0].value.author).toBe('this is a test')
  expect(createBlog.mock.results[0].value.url).toBe('http://contoso.com')
})