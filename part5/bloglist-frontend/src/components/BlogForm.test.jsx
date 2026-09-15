import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(
    <Router>
      <BlogForm createBlog={createBlog} />
    </Router>
  )

  const input = screen.getByLabelText('title:')

  const sendButton = screen.getByText('create')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
})