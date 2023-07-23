import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import blogServices from './services/blogServices';
import blogi from './teams.json';

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')

  useEffect(() => {
    blogServices.getAll().then(response => {
      setBlogs(response.data)
    })
  }, [])

  useEffect(() => {
    setBlogs(blogi)
  }, [])

  const incrementVoteCount = (blogId) => {
    const updatedBlogs = blogs.map(blog => {
      if (blog._id === blogId) {
        blog.likes = blog.likes + 1;
      }
      return blog;
    });

    const currentBlog = updatedBlogs.find(blog => {
      return blog._id === blogId
    })

    blogServices.update(currentBlog._id, currentBlog)
    setBlogs(updatedBlogs)
  }

  const deleteBlog = (_id, title) => {
    if (window.confirm(`Delete ${title}?`) === true) {
      blogServices.deleteOne(_id)
      const blogsNew = blogs.filter(blog => blog._id !== _id)
      setBlogs(blogsNew)
    }
  }

  return (
    <div className="App">
      <h1>Add blog</h1>
      <BlogForm blogs={blogs} setBlogs={setBlogs} newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl} newLikes={newLikes} setNewTitle={setNewTitle} setNewAuthor={setNewAuthor} setNewUrl={setNewUrl} setNewLikes={setNewLikes} />
      <h1>Blogs</h1>
      <Blogs blogs={blogs} newLikes={newLikes} setBlogs={setBlogs} setNewLikes={setNewLikes} incrementVoteCount={incrementVoteCount} deleteBlog={deleteBlog} />
    </div>
  );
}

export default App
