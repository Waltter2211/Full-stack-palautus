import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import usersService from './services/users'
import LoginForm from "./components/LoginForm";
import "./App.css";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "./reducers/BlogReducer";
import { setUser } from "./reducers/userReducer";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import { setUsers } from './reducers/usersReducer'
import Blogs from "./components/Blogs";

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notifications)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((blogsA, blogsB) => blogsB.likes - blogsA.likes);
      dispatch(setBlogs(blogs))
    });
  }, []);

  useEffect(() => {
    usersService.getAllUsers().then((users) => {
     dispatch(setUsers(users))
    })
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user))
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
        <LoginForm />
      </Togglable>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <h2>blog app</h2>
        <Link to='/users'>Users</Link>
        <Link to='/blogs'>Blogs</Link>
        {notification.text !== '' && <p className={notification.type}>{notification.text}</p>}
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>
      <Routes>
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User users={users} />} />
        <Route path="/blogs/:id" element={<Blog blogs={blogs} />} />
        <Route path="/blogs" element={<Blogs blogs={blogs} />} />
      </Routes>
      <div>
        <Togglable buttonLabel="add new" ref={blogFormRef}>
          <BlogForm
            blogs={blogs}
            user={user}
            blogFormRef={blogFormRef.current}
          />
        </Togglable>
      </div>
      
    </BrowserRouter>
  );
};

export default App;
