const initState = {
    isLoading: false
}

const loaderReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOADING_DATAS':
            return {
                ...state,
                isLoading: true
            }
        case 'LOADED_DATAS':
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}

export default loaderReducer;