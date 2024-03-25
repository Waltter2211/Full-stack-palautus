import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div>
      {visible? <div style={style}>
      <p>{blog.title}<button onClick={() => setVisible(!visible)}>hide</button></p>
      <p>{blog.url}</p>
      <p>likes {blog.likes}<button>like</button></p>
      <p>{blog.author}</p>
    </div>:<div style={style}>{blog.title}<button onClick={() => setVisible(!visible)}>view</button></div>}
    </div>
    
  )
  
}

export default Blog