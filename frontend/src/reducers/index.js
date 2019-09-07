import { combineReducers } from 'redux';
import signUp from './signUp';
import login from './login';

const reducers = combineReducers({
    signUp, login
});

export default reducers;