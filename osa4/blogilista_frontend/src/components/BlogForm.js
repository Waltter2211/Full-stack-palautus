import blogServices from "../services/blogServices"

const BlogForm = ({blogs, setBlogs, newTitle, newAuthor, newUrl, newLikes, setNewTitle, setNewAuthor, setNewUrl, setNewLikes}) => {

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
      }
        
      const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
      }

      const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
      }

      const handleLikeChange = (event) => {
        setNewLikes(event.target.value)
      }

        const addBlog = (event) => {
            event.preventDefault()
            const blogObject = {
                title: newTitle,
                author: newAuthor,
                url: newUrl,
                likes: newLikes
            }

            const createBlog = () => {
                blogServices.create(blogObject).then(response => {
                    setBlogs(blogs.concat(response.data))
                    setNewTitle('')
                    setNewAuthor('')
                    setNewUrl('')
                    setNewLikes('')
                    })
                }
            createBlog()
        }

    return (
        <form onSubmit={addBlog}>
            <div>
                title: <input value={newTitle} onChange={handleTitleChange}/>
            </div>
            <div>
                author: <input value={newAuthor} onChange={handleAuthorChange} />
            </div>
            <div>
                url: <input value={newUrl} onChange={handleUrlChange} />
            </div>
            <div>
                likes: <input value={newLikes} onChange={handleLikeChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default BlogForm