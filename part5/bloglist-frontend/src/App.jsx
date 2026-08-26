import { useState, useEffect, useRef } from 'react'
import '../index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    type: 'success',
  })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setUser(null)
      setNotification({ message: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: 'success' })
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const createdBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(createdBlog))

    setNotification({
      message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
      type: 'success',
    })
    setTimeout(() => {
      setNotification({ message: null, type: 'success' })
    }, 5000)
  }

  const addLikes = async (blogId, updatedBlog) => {
    const returnedBlog = await blogService.update(blogId, updatedBlog)
    const originalBlog = blogs.find((b) => b.id === blogId)

    returnedBlog.user = originalBlog.user

    setBlogs(blogs.map((b) => (b.id === blogId ? returnedBlog : b)))
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <LoginForm
        handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
        notification={notification}
      />
    )
  }

  const handleRemove = async (blogId) => {
    const blogToRemove = blogs.find((b) => b.id === blogId)
    if (
      window.confirm(
        `Remove blog "${blogToRemove.title}" by ${blogToRemove.author}?`,
      )
    )
      await blogService.remove(blogId)
    setBlogs(blogs.filter((b) => b.id !== blogId))
    setNotification({
      message: `Blog "${blogToRemove.title}" removed successfully`,
      type: 'success',
    })
    setTimeout(() => {
      setNotification({ message: null, type: 'success' })
    }, 5000)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      <p>{user.name} logged in </p>
      <button
        onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser')
          setUser(null)
        }}
      >
        logout
      </button>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLikes={addLikes}
            user={user}
            handleRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  )
}

export default App
