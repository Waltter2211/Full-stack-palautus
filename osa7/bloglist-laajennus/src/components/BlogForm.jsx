import React from "react";
import { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

function BlogForm({ blogs, setBlogs, blogFormRef }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch()

  const handleBlogPost = async (event) => {
    event.preventDefault();
    const newObject = {
      title,
      author,
      url,
    };
    try {
      blogFormRef.toggleVisibility();
      const blog = await blogService.create(newObject);
      setBlogs(blogs.concat(newObject));
      setTitle("");
      setAuthor("");
      setUrl("");
      dispatch(setNotification({
        type: "message",
        text: `a new blog ${blog.title} by ${blog.author} added`,
      }))
      setTimeout(() => {
        dispatch(setNotification({
          type: '',
          text: '',
        }))
      }, 5000);
      console.log(blog);
    } catch (exception) {
      console.log(exception);
      dispatch(setNotification({
        type:'error', 
        text: exception.response.data.error
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
      <h2>create new</h2>
      <form onSubmit={handleBlogPost}>
        <label>
          title
          <input
            data-testid="title"
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <label>
          author{" "}
          <input
            data-testid="author"
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <label>
          url
          <input
            data-testid="url"
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
        <button>create</button>
      </form>
    </div>
  );
}

export default BlogForm;
