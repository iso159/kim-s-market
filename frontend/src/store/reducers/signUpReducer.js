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

const signUp = (state = initialState, action) => {
    switch(action.type) {
        case 'SIGN_UP':
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

export default signUp