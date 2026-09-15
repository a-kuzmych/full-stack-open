import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Blog = ({ blog, addLikes, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const id = useParams().id;
  const navigate = useNavigate();

  if (!blog) {
    return null;
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    addLikes(blog.id, updatedBlog);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete blog "${blog.title}"?`)) {
      deleteBlog(blog.id);
      navigate("/");
    }
  };

  return (
    <li key={blog.id}>
      <h2>{`${blog.author}: ${blog.title}`}</h2>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} {user && <button onClick={handleLike}>like</button>}
      </div>
      <div>Added by {blog.user.name}</div>
      {user && blog.user.username === user.username && (
        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "blue",
            color: "white",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          remove
        </button>
      )}
    </li>
  );
};

export default Blog;
