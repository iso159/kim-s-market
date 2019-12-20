const initialState = {
    apiUri: 'http://www.juso.go.kr/addrlink/addrLinkApi.do',
    confirmKey: 'devU01TX0FVVEgyMDE5MTAyNTE1NDgyODEwOTEzOTk=',
    resultType: 'json',
    rowPerPage: '5',
    currentPage: '1',
    keyword: '',
    apiResults: {
        common: {},
        juso: []
    },
    selectedLocation: '',
    selectedZipNo: '',
    locationModalOpen: false
};

const locationReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SELECT_LOCATION' :
            return {
                ...state,
                selectedLocation: action.selectedLocation,
                selectedZipNo: action.selectedZipNo
            }
        case 'LOCATION_MODAL_OPEN' :
            return {
                ...state,
                locationModalOpen: true
            };
        case 'LOCATION_MODAL_CLOSE' :
            return {
                ...state,
                locationModalOpen: false,
                currentPage: '1',
                apiResults: {
                    common: {},
                    juso: []
                }
            };
        case 'GET_LOCATIONS_SUCCESS' :
            return {
                ...state,
                apiResults: action.apiResults
            };
        case 'GET_LOCATIONS_FAILED' :
            return {
                ...state,
                apiResults: {
                    common: {},
                    juso: []
                }
            };
        case 'CHANGE_KEYWORD' :
            return {
                ...state,
                keyword: action.keyword
            };
        case 'CHANGE_CURRENT_PAGE' :
            return {
                ...state,
                currentPage: action.currentPage
            }
        default:
            return state;
    }
}

export default locationReducer;