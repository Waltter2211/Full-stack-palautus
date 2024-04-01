import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/BlogReducer";
import userReducer from "./reducers/userReducer";

export default configureStore({
    reducer: {
        notifications: notificationReducer,
        blogs: blogReducer,
        users: userReducer
    }
})