import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let container
  let mockHandler

  const user = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2NDcyYzk0OWNmNmVmOTA5MzJhNjg5NTIiLCJpYXQiOjE2ODU0OTg5MzZ9.uNYbWZyGx27INAravzQIkofxUNjsQV6o0eKi37Ms91c',
    username: 'admin'
  }

  beforeEach(() => {
    mockHandler = jest.fn()
    container = render(<BlogForm
      user={user}
      setMessageMode={() => { }}
      setMessage={() => { }}
      blogsTrigger={() => { }}
      setBlogsTrigger={() => { }}
      mockCreate={mockHandler}
    />).container
  })

  test('right details are given to event handler when a new blog is created', async () => {
    const user = userEvent.setup()

    const revealButton = screen.getByText('new note')
    await user.click(revealButton)
    const titleInput = screen.getByPlaceholderText('enter title')
    await user.type(titleInput, 'form test 1')
    const authorInput = screen.getByPlaceholderText('enter author')
    await user.type(authorInput, 'admin')
    const urlInput = screen.getByPlaceholderText('enter url')
    await user.type(urlInput, 'localhost')
    const sendButton = container.querySelector('.new-blog-submit-button')
    await user.click(sendButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('form test 1')
    expect(mockHandler.mock.calls[0][0].author).toBe('admin')
    expect(mockHandler.mock.calls[0][0].url).toBe('localhost')
  })
})
