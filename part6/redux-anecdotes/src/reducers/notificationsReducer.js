const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.message
        case 'CLEAR':
            return initialState
        default:
            return state
    }
}

export const setNotification = message => {
    return {
        type: 'NOTIFICATION',
        message
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR'
    }
}

export default notificationReducer