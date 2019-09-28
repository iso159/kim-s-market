export const signUp = (member) => {
    return {
        type: 'SIGN_UP',
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