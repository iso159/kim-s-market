const initState = {
    status: 'Y',
    currentPage: '1',
    rowPerPage: '5',
    totalPages: 0,
    totalMembers: 0,
    members: [],
    searchObject: {
        searchKey: 'memberId',
        searchValue: ''
    }
}

const memberReducer = (state = initState, action) => {
    switch(action.type) {
        case 'GET_MEMBERS_SUCCESS':
            return {
                ...state,
                totalPages: action.pagination.pageCnt,
                totalMembers: action.pagination.listCnt,
                members: action.members
            }
        case 'GET_MEMBERS_FAILED':
            return {
                ...state,
                members: action.members
            }
        case 'CHANGE_TAB':
            return {
                ...state,
                status: action.status
            }
        case 'SEARCH_MEMBERS':
            return {
                ...state,
                searchObject: action.searchObject
            }
        case 'CHANGE_ROW_PER_PAGE':
            return {
                ...state,
                rowPerPage: action.rowPerPage
            }
        case 'CHANGE_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        default:
            return state;
    }
}

export default memberReducer