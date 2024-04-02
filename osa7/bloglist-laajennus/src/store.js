import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/BlogReducer";
import userReducer from "./reducers/userReducer";
import usersReducer from "./reducers/usersReducer";

export default configureStore({
    reducer: {
        notifications: notificationReducer,
        blogs: blogReducer,
        user: userReducer,
        users: usersReducer
    }
})