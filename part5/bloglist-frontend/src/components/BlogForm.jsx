import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, TextField, Button } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const navigate = useNavigate()

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
    navigate('/')
  }

  return (
    <Container>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <TextField
          label="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="dense"
          size="small"
        />
        <br />
        <TextField
          label="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          margin="dense"
          size="small"
        />
        <br />
        <TextField
          label="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          margin="dense"
          size="small"
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          create
        </Button>
      </form>
    </Container>
  )
}

export default BlogForm
