import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useMatch,
  useNavigate,
} from "react-router-dom";
import "../index.css";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import Bloglist from "./components/Bloglist";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: "success",
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const navigate = useNavigate();

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
      const user = await loginService.login({ username, password });
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

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    navigate("/");
  };

  const addBlog = async (blogObject) => {
    const createdBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(createdBlog));

    setNotification({
      message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
      type: "success",
    });
    setTimeout(() => {
      setNotification({ message: null, type: "success" });
    }, 5000);
  };

  const addLikes = async (blogId, updatedBlog) => {
    const returnedBlog = await blogService.update(blogId, updatedBlog);
    const originalBlog = blogs.find((b) => b.id === blogId);
    returnedBlog.user = originalBlog.user;
    setBlogs(blogs.map((b) => (b.id === blogId ? returnedBlog : b)));
  };

  const deleteBlog = async (blogId) => {
    const blogToRemove = blogs.find((b) => b.id === blogId);
    if (
      window.confirm(
        `Remove blog "${blogToRemove.title}" by ${blogToRemove.author}?`,
      )
    ) {
      await blogService.remove(blogId);
      setBlogs(blogs.filter((b) => b.id !== blogId));
      setNotification({
        message: `Blog "${blogToRemove.title}" removed successfully`,
        type: "success",
      });
      setTimeout(() => {
        setNotification({ message: null, type: "success" });
      }, 5000);
    }
  };

  const padding = { padding: 5 };

  const match = useMatch("/blogs/:id");

  const blogToShow = match
    ? blogs.find((blog) => blog.id === match.params.id)
    : null;

  return (
    <Container>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          {user && (
            <Button color="inherit" component={Link} to="/create">
              create new
            </Button>
          )}
          {user ? (
            <span>
              <Button color="inherit" onClick={handleLogout}>
                logout
              </Button>
            </span>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route
          path="/"
          element={
            <Bloglist
              blogs={blogs}
              addBlog={addBlog}
              addLikes={addLikes}
              deleteBlog={deleteBlog}
              user={user}
              notification={notification}
            />
          }
        />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate replace to="/" />
            ) : (
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
                notification={notification}
              />
            )
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blogToShow}
              addLikes={addLikes}
              deleteBlog={deleteBlog}
              user={user}
            />
          }
        />
        <Route path="/create" element={<BlogForm createBlog={addBlog} />} />
      </Routes>
    </Container>
  );
};

export default App;
