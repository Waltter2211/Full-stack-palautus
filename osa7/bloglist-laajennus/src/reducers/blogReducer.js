import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs:(state, action) => {
            return state = action.payload
        },
        addBlog:(state, action) => {
            state.push(action.payload)
        },
        likeBlog:(state, action) => {
            const foundBlog = state.find(blog => blog.id === action.payload)
            const updatedBlog = {...foundBlog, likes: foundBlog.likes + 1}
            return state.map((blog) => blog.id !== updatedBlog.id ? blog : updatedBlog)
            .sort((blogA, blogB) => blogB.likes - blogA.likes)
        },
        deleteBlog:(state, action) => {
            const foundBlogId = state.findIndex(blog => blog.id === action.payload)
            state.splice(foundBlogId, 1)
        },
        commentBlog:(state, action) => {
            const foundBlog = state.find(blog => blog.id === action.payload.id)
            foundBlog.comments.push(action.payload.commentText)
        }
    }
})

export const { setBlogs, addBlog, likeBlog, deleteBlog, commentBlog } = blogSlice.actions
export default blogSlice.reducer