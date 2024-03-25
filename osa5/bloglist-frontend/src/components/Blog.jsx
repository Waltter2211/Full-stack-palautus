import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog }) => {
  const [like, setLike] = useState(blog.likes)
  const [visible, setVisible] = useState(false)
  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleBlogUpdate = async () => {
    await blogService.update(blog)
  }

  return (
    <div>
      {visible? <div style={style}>
      <p>{blog.title}<button onClick={() => setVisible(!visible)}>hide</button></p>
      <p>{blog.url}</p>
      <p>likes {like}<button onClick={() => {
        handleBlogUpdate()
        setLike(like + 1)
      }}>like</button></p>
      <p>{blog.author}</p>
    </div>:<div style={style}>{blog.title}<button onClick={() => setVisible(!visible)}>view</button></div>}
    </div>
  )
  
}

export default Blog