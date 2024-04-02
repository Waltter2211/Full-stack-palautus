import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { commentBlog, deleteBlog, likeBlog } from "../reducers/BlogReducer";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Blog = ({ blogs }) => {
  const [comment, setComment] = useState('')
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = blogs.find((blog) => blog.id === id)
  const user = useSelector(state => state.user)

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handlePostComment = async () => {
    try {
      await blogService.comment(blog.id, comment)
      setComment('')
      const commentData = {id: blog.id, commentText: comment}
      dispatch(commentBlog(commentData))
    } catch (error) {
      console.log(error)
    }
  }

  const handleBlogUpdate = async () => {
    await blogService.update(blog);
    dispatch(likeBlog(blog.id))
  };

  const handleBlogDelete = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog);
      dispatch(deleteBlog(blog.id))
    }
  };

  if (!blog) {
    return null
  }

  return (
    <div data-testid="testBlog">
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes}</p>
      <button onClick={handleBlogUpdate}>like</button>
      <p>added by {blog.user.name}</p>
      {user.name === blog.user.name && <button onClick={handleBlogDelete}>delete blog</button>}
      <h3>comments</h3>
      <input type="text" onChange={handleCommentChange} value={comment} />
      <button onClick={handlePostComment}>add comment</button>
      <ul>
        {blog.comments.map((comment, i) => {
          return <li key={i}>{comment}</li>
        })}
      </ul>
    </div>
  );
};

export default Blog;
