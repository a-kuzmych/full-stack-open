import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author, but not url or likes by default', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
  }

  render(<Blog blog={blog} />)

  const titleElement = screen.getByText('Test Blog Title', { exact: false })
  const authorElement = screen.getByText('Test Author', { exact: false })
  const urlElement = screen.queryByText('http://testurl.com')
  const likesElement = screen.queryByText('likes 5')

  expect(titleElement).toBeInTheDocument()
  expect(authorElement).toBeInTheDocument()
  expect(urlElement).not.toBeInTheDocument()
  expect(likesElement).not.toBeInTheDocument()
})

test('clicking the view button shows url and likes', async () => {
  const blog = {
    title: 'Test Blog Title', 
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      name: 'Test User',
      username: 'testuser',
    },
  }

  const testActiveUser = {
    username: 'testuser',
    name: 'Test User'
  }

  const mockHandleLike = vi.fn()

  render(<Blog blog={blog} handleLike={mockHandleLike} user={testActiveUser} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const urlElement = screen.getByText('http://testurl.com')
  const likesElement = screen.getByText('likes 5')

  expect(urlElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
})