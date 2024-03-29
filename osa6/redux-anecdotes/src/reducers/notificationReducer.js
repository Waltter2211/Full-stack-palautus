import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
    name: 'Notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return action.payload = null
        }
    }
})

export const { showNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(showNotification(content))
      setTimeout(() => {
        dispatch(removeNotification())
      }, time)
    }
  }

export default notificationSlice.reducer