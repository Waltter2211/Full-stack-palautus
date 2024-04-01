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
        }
    }
})

export const { setBlogs, addBlog } = blogSlice.actions
export default blogSlice.reducer