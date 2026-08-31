import { render, screen } from '@testing-library/react'
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