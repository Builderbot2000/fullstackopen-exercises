import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let mockHandler

  const blog = {
    title: 'BaseTest',
    author: 'admin',
    url: 'localhost1',
    likes: 13,
    user: { username: 'admin', id: '6472c949cf6ef90932a68952' }
  }

  const user = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2NDcyYzk0OWNmNmVmOTA5MzJhNjg5NTIiLCJpYXQiOjE2ODU0OTg5MzZ9.uNYbWZyGx27INAravzQIkofxUNjsQV6o0eKi37Ms91c',
    username: 'admin'
  }

  beforeEach(() => {
    mockHandler = jest.fn()
    container = render(<Blog
      blog={blog}
      user={user}
      blogsTrigger={() => {}}
      setBlogsTrigger={() => {}}
      mockLike={mockHandler}
    />).container
  })

  test('renders blog title and author, does not render url or likes', () => {
    const basic_info_div = container.querySelector('.blog-basic-info')
    expect(basic_info_div).toHaveTextContent('BaseTest')
    expect(basic_info_div).toHaveTextContent('admin')

    const url = screen.queryByText('localhost1')
    expect(url).toBeNull()
    const likes = screen.queryByText('13')
    expect(likes).toBeNull()
  })

  test('clicking the view button shows url and likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const details_div = container.querySelector('.blog-details')
    expect(details_div).toHaveTextContent('localhost1')
    expect(details_div).toHaveTextContent('13')
  })

  test('clicking the like button twice calls event handler twice', async () => {

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})


