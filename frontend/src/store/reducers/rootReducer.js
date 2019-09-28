import authReducer from './authReducer'
import signUpReducer from './signUpReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    signUp: signUpReducer
});

export default rootReducer;