/* Initial State of the User's Authentication */
export const Auth = {
    user: '',
    id: '',
    token: localStorage.getItem('token'), 
    text: '',
    loading: '', 
}   

/* Reducer Actions to the Authentication State */
export const AuthReducer = (state, action) => {
    switch(action.type){
        case types.authLogin:
            localStorage.setItem('token', action.payload.token);
            //console.log(action.payload)
            return {
                ...state,   
                token: action.payload.token, 
                id: action.payload.id,
                text: 'Welcome back',
                loading: false,
                user: action.payload.user
            }
        case types.authLogout:
            return {
                ...state,
                id: '',
                text: '',
                token: localStorage.removeItem('token'),
                loading: true
            }
        case types.authSignup:
        default:
            return state
    }
}

/* Reducer Authentication Action Types */
export const types = {
    authLogin: 'auth-login',
    authLogout: 'auth-logout',
    authSignup: 'auth-signup',
}