const initialState = ''

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER':
            console.log(action)
            return action.filter
        default:
            return state
    }
}

export const setFilter = filter => {
    return {
        type: 'FILTER',
        filter
    }
}

export default filterReducer