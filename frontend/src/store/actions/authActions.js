export const signIn = (credentials) => {
    return {
        type: 'SIGN_IN_SUCCESS',
        credentials
    };
};

export const signOut = () => {
    return {
        type: 'SIGN_OUT_SUCCESS'
    };
};

export const signInCheck = (sessionStorage) => {
    return {
        type: 'SIGN_IN_CHECK',
        sessionStorage
    }
}

export const signInFailed = () => {
    return {
        type: 'SIGN_IN_FAILED'
    }
}