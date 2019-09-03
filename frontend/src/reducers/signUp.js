import * as types from '../actions/SignUpActionTypes';

const initialState = {
    member: {
        id: "",
        password: "",
        name: "",
        phone: "",
        mail: "",
        zipCode: "",
        address: "",
        authority: "U",
        status: "Y",
        grantor: ""
    }
};

export default function signUp(state = initialState, action) {
    switch(action.type) {
        case types.SIGN_UP:
            return {
                member: {
                    ...state.member,
                    authority: "U",
                    status: "Y"
                }
            };
            
        default:
            return state;
    }
}