const initialState = {
    memberId: null,
    authority: null,
    authError: null
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SIGN_IN_SUCCESS' :
            console.log('sign in success');
            
            window.sessionStorage.setItem('memberId', action.credentials.memberId);
            window.sessionStorage.setItem('authority', action.credentials.authority);
            
            return {
                ...state,
                memberId: action.credentials.memberId,
                authority: action.credentials.authority
            };
        
        case 'SIGN_IN_FAILED' :
            console.log('sign in failed');

            return {
                ...state,
                authError: '아이디 또는 비밀번호가 일치하지 않습니다.'
            }

        case 'SIGN_OUT_SUCCESS' :
            console.log('sign out success');
            
            window.sessionStorage.removeItem('memberId');
            window.sessionStorage.removeItem('authority');

            return {
                ...state,
                memberId: '',
                authority: ''
            }
        
        case 'SIGN_IN_CHECK' :
            console.log('sign in check');

            return {
                ...state,
                memberId: action.sessionStorage.getItem('memberId'),
                authority: action.sessionStorage.getItem('authority')
            }
        default:
            return state;
    }
}

export default authReducer