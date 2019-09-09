import * as types from './actionTypes/SignUpActionTypes'

export function signUp(member) {
    return {
        type: types.SIGN_UP,
        member: {
            id,
            password,
            name,
            phone,
            mail,
            zipCode,
            address,
            authority,
            status,
            grantor
        }
    };
}