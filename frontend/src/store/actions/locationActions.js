import axios from "axios";

export const selectLocation = (selectedLocation, selectedZipNo) => {
    return {
        type: 'SELECT_LOCATION',
        selectedLocation: selectedLocation,
        selectedZipNo: selectedZipNo
    }
}

export const locationModalClose = () => {
    return {
        type: 'LOCATION_MODAL_CLOSE'
    };
}

export const locationModalOpen = () => {
    return {
        type: 'LOCATION_MODAL_OPEN'
    };
}

export const changeCurrentPage = (currentPage) => {
    return {
        type: 'CHANGE_CURRENT_PAGE',
        currentPage: currentPage
    }
}

export const changeKeyword = (keyword) => {
    return {
        type: 'CHANGE_KEYWORD',
        keyword: keyword
    };
}

export const getLocations = () => {
    return (dispatch, getState) => {
        const locationState = getState().location;

        dispatch({
            type: 'LOADING_DATAS'
        })

        axios.get(locationState.apiUri 
            + '?confmKey=' + locationState.confirmKey
            + '&resultType=' + locationState.resultType
            + '&countPerPage=' + locationState.rowPerPage
            + '&currentPage=' + locationState.currentPage
            + '&keyword=' + locationState.keyword
        )
        .then((res) => {
            dispatch({
                type: 'GET_LOCATIONS_SUCCESS',
                apiResults: res.data.results
            });
        })
        .catch((err) => {
            dispatch({
                type: 'GET_LOCATIONS_FAILED'
            });
        })
        .finally(() => {
            dispatch({
                type: 'LOADED_DATAS'
            });
        })
    }
};