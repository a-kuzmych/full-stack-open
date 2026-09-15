import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import Blog from './Blog'

describe('Blog component', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      name: 'Blog Creator',
      username: 'creator_user',
    },
  }

  test('blog info and like counts are shown to anonymous users, buttons are not', () => {
    render(
      <Router>
        <Blog blog={blog} user={null} addLikes={() => {}} deleteBlog={() => {}} />
      </Router>
    )

    expect(screen.getByText('Test Author: Test Blog Title')).toBeInTheDocument()
    expect(screen.getByText('http://testurl.com')).toBeInTheDocument()
    expect(screen.getByText(/likes 5/)).toBeInTheDocument()

    const likeButton = screen.queryByText('like')
    expect(likeButton).toBeNull()

    const removeButton = screen.queryByText('remove')
    expect(removeButton).toBeNull()
  })

  test('like button is shown to authenticated non-creator users', () => {
    const nonCreatorUser = {
      name: 'Random User',
      username: 'random_user'
    }

    render(
      <Router>
        <Blog blog={blog} user={nonCreatorUser} addLikes={() => {}} deleteBlog={() => {}} />
      </Router>
    )

    const likeButton = screen.queryByText('like')
    expect(likeButton).toBeInTheDocument()

    const removeButton = screen.queryByText('remove')
    expect(removeButton).toBeNull()
  })

  test('delete button is also shown to the creator', () => {
    const creatorUser = {
      name: 'Blog Creator',
      username: 'creator_user'
    }

    render(
      <Router>
        <Blog blog={blog} user={creatorUser} addLikes={() => {}} deleteBlog={() => {}} />
      </Router>
    )

    const likeButton = screen.queryByText('like')
    expect(likeButton).toBeInTheDocument()

    const removeButton = screen.queryByText('remove')
    expect(removeButton).toBeInTheDocument()
  })
})