import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from '@mui/material'
import Notification from './Notification'

const Bloglist = ({ blogs, notification }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}>
        Blogs
      </Typography>

      <Notification message={notification.message} type={notification.type} />
      <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
        <Table>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <TableRow key={blog.id} hover>
                <TableCell>
                  <Link
                    to={`/blogs/${blog.id}`}
                    style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}
                  >
                    {blog.title}
                  </Link>
                </TableCell>
                <TableCell align="right" sx={{ color: 'text.secondary' }}>
                  by {blog.author}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Bloglist