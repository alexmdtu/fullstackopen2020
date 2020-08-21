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

export const setNotification = (message, time) => {
    return dispatch => {
        dispatch({
            type: 'NOTIFICATION',
            message
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR'
            })
        }, time * 1000)
    }
}

export default notificationReducer