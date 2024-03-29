import { createSlice } from "@reduxjs/toolkit"


const initialState = ''

const notificationSlice = createSlice({
    name: 'Notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return action.payload
        }
    }
})

export const { showNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer