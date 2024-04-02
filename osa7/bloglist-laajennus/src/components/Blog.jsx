import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/BlogReducer";
import { useParams } from "react-router-dom";

const Blog = ({ blogs }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = blogs.find((blog) => blog.id === id)
  const user = useSelector(state => state.user)

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
      <ul>
        {blog.comments.map((comment, i) => {
          return <li key={i}>{comment}</li>
        })}
      </ul>
    </div>
  );
};

export default Blog;
