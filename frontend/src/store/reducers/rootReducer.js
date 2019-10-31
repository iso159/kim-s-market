import authReducer from './authReducer'
import signUpReducer from './signUpReducer'
import categoryReducer from './categoryReducer'
import loaderReducer from './loaderReducer'
import memberReducer from './memberReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    signUp: signUpReducer,
    category: categoryReducer,
    loader: loaderReducer,
    member: memberReducer
});

export default rootReducer;