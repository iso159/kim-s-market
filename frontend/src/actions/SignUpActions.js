import * as types from './SignUpActionTypes'

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