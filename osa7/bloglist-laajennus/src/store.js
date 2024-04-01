import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer"
import BlogReducer from "./reducers/BlogReducer";

export default configureStore({
    reducer: {
        notifications: notificationReducer,
        blogs: BlogReducer
    }
})