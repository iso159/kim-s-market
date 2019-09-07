import * as types from './actionTypes/LoginActionTypes';

export const setLoginStatus = (userName, authority, isLogin, token) => ({
    type: types.SET_LOGIN_STATUS,
    userName,
    authority,
    isLogin
});