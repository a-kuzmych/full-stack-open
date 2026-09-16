import { useNavigate } from 'react-router-dom'
import { Card, CardContent, Typography, Button, Box, Link } from '@mui/material'

const Blog = ({ blog, addLikes, deleteBlog, user }) => {
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    addLikes(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    if (window.confirm(`Delete blog "${blog.title}"?`)) {
      deleteBlog(blog.id)
      navigate('/')
    }
  }

  return (
    <Card sx={{ mt: 3, mb: 3, border: '1px solid #e0e0e0', boxShadow: 1, borderRadius: 1 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {blog.title}
        </Typography>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          by {blog.author}
        </Typography>

        <Box sx={{ mb: 1 }}>
          <Link href={blog.url} target="_blank" rel="noopener noreferrer" underline="hover">
            {blog.url}
          </Link>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Added by {blog.user?.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {blog.likes} likes
          </Typography>

          {user && (
            <Button variant="outlined" size="small" onClick={handleLike}>
              LIKE
            </Button>
          )}

          {user && blog.user?.username === user.username && (
            <Button variant="outlined" color="error" size="small" onClick={handleDelete}>
              REMOVE
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default Blog