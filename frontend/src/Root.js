import React, {Component} from 'react';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from 'reducers'

const store = createStore(reducers);

class Root extends Component {
    render(){
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        );
    }
}

export default Root;