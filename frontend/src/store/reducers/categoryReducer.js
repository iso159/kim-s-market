const initState = {
    categories: []
}

const categoryReducer = (state = initState, action) => {
    switch(action.type) {
        case 'GET_CATEGORIES':
            return {
                ...state,
                categories: action.categories
            }
        default:
            return state;
    }
}

export default categoryReducer