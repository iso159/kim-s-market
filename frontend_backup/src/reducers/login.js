import * as types from '../actions/actionTypes/LoginActionTypes';

const initialState = {
    userName: "",
    authority: "",
    isLogin: ""
};

export default function login(state = initialState, action) {
    switch(action.type) {
        case types.SET_LOGIN_STATUS:
            return {
                ...state,
                userName: action.userName,
                authority: action.authority,
                isLogin: action.isLogin
            };
        default:
            return state;
    }
}