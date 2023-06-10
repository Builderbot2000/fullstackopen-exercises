import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        showNotification(state, action) {
            const content = action.payload
            return content
        },
        removeNotification(state, action) {
            return null
        }
    }
})

export const { showNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, duration) => {
    return async dispatch => {
        dispatch(showNotification(content))
        setTimeout(() => {
            dispatch(removeNotification())
        }, duration)
    }
}

export default notificationSlice.reducer