import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LikeButton from './likeButton'

test('like button calls handleLike when clicked', () => {
  const blog = {
    title: 'Hello World',
    author: 'Paul McA',
    url: 'http://www.contoso.com',
    likes: '9',
    user: {
      name: 'faceface'
    }
  }

  const handleLike = jest.fn()
  const user = userEvent.setup()

  render(<LikeButton blog={blog} handleLike={handleLike} />)
  const likeButton = screen.getByText('Like')
  screen.debug(likeButton)
  user.click(likeButton)

  expect(handleLike.mock.calls).toHaveLength(1)

})

