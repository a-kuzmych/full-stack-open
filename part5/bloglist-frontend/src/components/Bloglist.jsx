import { useRef } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import Notification from "./Notification";

const Bloglist = ({ blogs, addBlog, addLikes, handleRemove, user, notification }) => {
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
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLikes={addLikes}
            handleRemove={handleRemove}
            user={user}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
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
  );
};

export default Bloglist;