import { useRef } from "react";
import { Link } from "react-router-dom";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import Notification from "./Notification";

const Bloglist = ({ blogs, addBlog, addLikes, deleteBlog, user, notification }) => {
  const blogFormRef = useRef();

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const handleCreateBlog = (blogObject) => {
    addBlog(blogObject);
    blogFormRef.current.toggleVisibility();
  };

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={notification.message} type={notification.type} />
        <ul>
          {sortedBlogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      <div>
        <ul>
          {sortedBlogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Bloglist;