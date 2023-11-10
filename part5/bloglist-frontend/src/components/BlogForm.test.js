import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './blogForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog}/>)

  const titleInput = screen.getByRole('textbox', { name: 'title' })
  const authorInput = screen.getByRole('textbox', { name: 'author' })
  const sendButton = screen.getByText('Create')

  await user.type(titleInput, 'testing a form...')
  await user.type(authorInput, 'this is a test')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
})