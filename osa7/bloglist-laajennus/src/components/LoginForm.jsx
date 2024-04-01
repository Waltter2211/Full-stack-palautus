import React, { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";

function LoginForm() {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notifications)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user))
      setUsername("");
      setPassword("");
      dispatch(setNotification({
        type: 'message',
        text: `logged in as ${username}`,
      }))
      setTimeout(() => {
        dispatch(setNotification({
          type: '',
          text: '',
        }))
      }, 5000);
    } catch (exception) {
      console.log(exception);
      dispatch(setNotification({
        type: 'error',
        text: exception.response.data.error,
      }))
      setTimeout(() => {
        dispatch(setNotification({
          type: '',
          text: '',
        }))
      }, 5000);
    }
  };
  return (
    <div>
      <h2>Log in to application</h2>
      {notification.text !== '' && <p className={notification.type}>{notification.text}</p>}
      <form onSubmit={handleLogin}>
        <label>
          username{" "}
          <input
            type="text"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <label>
          password{" "}
          <input
            type="password"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <button>login</button>
      </form>
    </div>
  );
}

/* LoginForm.propTypes = {
  message: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
}; */

export default LoginForm;
