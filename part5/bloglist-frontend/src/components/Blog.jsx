import { useState } from "react";

const Blog = ({ blog, addLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    addLikes(blog.id, updatedBlog);
  };

  if (visible) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}{" "}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    );
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={toggleVisibility}>view</button>
    </div>
  );
};

export default Blog;
