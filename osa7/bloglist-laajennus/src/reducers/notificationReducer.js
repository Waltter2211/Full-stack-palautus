import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        type: '',
        text: ''
    },
    reducers: {
        setNotification: (state, action) => {
            state.type = action.payload.type,
            state.text = action.payload.text
        }
    }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer