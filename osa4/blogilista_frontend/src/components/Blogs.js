const Blogs = (props) => {

    const Content = (props) => {

        return (
            <div>
                <h3>{props.blogsTitle}</h3>
                <h4>{props.blogsAuthor}</h4>
                <p>{props.blogsUrl}</p>
                <p>{props.blogsLikes}</p>
                <button onClick={() => 
                    props.incrementVoteCount(props.blogsId)}
                >Vote</button>
                <button onClick={() =>
                    props.deleteBlog(props.blogsId, props.blogsTitle)}>Delete</button>
            </div>
        )
    }

    return (
        <div>
            {props.blogs.map(blog => <Content 
            key={blog._id} 
            blogsId={blog._id}
            blogsTitle={blog.title} 
            blogsAuthor={blog.author} 
            blogsUrl={blog.url} 
            blogsLikes={blog.likes} 
            newLikes={props.newLikes} 
            setNewLikes={props.setNewLikes} 
            incrementVoteCount={props.incrementVoteCount}
            deleteBlog={props.deleteBlog}
            />)}
        </div>
    )
}

export default Blogs