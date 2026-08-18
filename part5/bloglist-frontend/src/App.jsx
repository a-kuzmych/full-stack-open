import { useState, useEffect } from "react";
import "../index.css";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: "success",
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setUser(null);
      setNotification({ message: "wrong username or password", type: "error" });
      setTimeout(() => {
        setNotification({ message: null, type: "success" });
      }, 5000);
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };

    const createdBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(createdBlog));

    setTitle("");
    setAuthor("");
    setUrl("");

    setNotification({
      message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
      type: "success",
    });
    setTimeout(() => {
      setNotification({ message: null, type: "success" });
    }, 5000);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification.message} type={notification.type} />
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      <p>{user.name} logged in</p>
      <button
        onClick={() => {
          window.localStorage.removeItem("loggedBlogappUser");
          setUser(null);
        }}
      >
        logout
      </button>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <label>
          <p>
            title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </p>
        </label>
        <label>
          <p>
            author:
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </p>
        </label>
        <label>
          <p>
            url:
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </p>
        </label>

        <button type="submit">create</button>
      </form>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
