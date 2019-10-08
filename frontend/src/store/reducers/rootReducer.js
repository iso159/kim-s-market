import authReducer from './authReducer'
import signUpReducer from './signUpReducer'
import categoryReducer from './categoryReducer'
import loaderReducer from './loaderReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    signUp: signUpReducer,
    category: categoryReducer,
    loader: loaderReducer
});

export default rootReducer;