import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import "./App.css";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "./reducers/BlogReducer";

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notifications)
  const blogs = useSelector(state => state.blogs)
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((blogsA, blogsB) => blogsB.likes - blogsA.likes);
      dispatch(setBlogs(blogs))
      console.log(blogs)
    });
  }, []);

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
          setUser={setUser}
        />
      </Togglable>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification.text !== '' && <p className={notification.type}>{notification.text}</p>}
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="add new" ref={blogFormRef}>
        <BlogForm
          blogs={blogs}
          user={user}
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
