import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import "./App.css";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((blogsA, blogsB) => blogsB.likes - blogsA.likes);
      setBlogs(blogs);
    });
  }, [blogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (user === null) {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          message={message}
          setMessage={setMessage}
          setUser={setUser}
        />
      </Togglable>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {message.text !== "" ? (
        <p className={message.type}>{message.text}</p>
      ) : (
        <p></p>
      )}
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="add new" ref={blogFormRef}>
        <BlogForm
          message={message}
          blogs={blogs}
          user={user}
          setBlogs={setBlogs}
          setMessage={setMessage}
          blogFormRef={blogFormRef.current}
        />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default App;
