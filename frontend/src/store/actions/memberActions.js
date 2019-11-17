import axios from "axios"

export const getMembers = () => {
    return (dispatch, getState) => {
        const memberState = getState().member;

        dispatch({
            type: 'LOADING_DATAS'
        })

        // 멤버리스트 조회 API 메서드
        axios.get('/members?currentPage=' + memberState.currentPage 
            + '&rowPerPage=' + memberState.rowPerPage 
            + '&status=' + memberState.status
            + '&searchKey=' + memberState.searchObject.searchKey
            + '&searchValue=' + memberState.searchObject.searchValue
        )
        .then((res) => {
            const members = res.data.result;
            const pagination = res.data.pagination;

            dispatch({ 
                type: 'GET_MEMBERS_SUCCESS',
                pagination,
                members
            })
        })
        .catch((err) => {
            console.log(err);
            
            dispatch({
                type: 'GET_MEMBERS_FAILED',
                members: []
            })
        })
        .finally(() => {
            dispatch({
                type: 'LOADED_DATAS'
            })
        })
    }
}

export const changeTab = (status) => {
    return {
        type: 'CHANGE_TAB',
        status
    }
}

export const changeRowPerPage = (rowPerPage) => {
    return {
        type: 'CHANGE_ROW_PER_PAGE',
        rowPerPage
    }
}

export const searchMembers = (searchObject) => {
    return {
        type: 'SEARCH_MEMBERS',
        searchObject
    }
}

export const changeCurrentPage = (currentPage) => {
    return {
        type: 'CHANGE_CURRENT_PAGE',
        currentPage
    }
}