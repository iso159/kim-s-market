import React, { Component } from 'react'
import App from './App'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import locale from './language/ko_KR'
import ReduxThunk from 'redux-thunk';

const defaultLang = 'ko'
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

class Root extends Component {    
    render(){
        return (
            <IntlProvider
                locale='ko'
                messages={locale[defaultLang]}
            >
                <Provider store={store}>
                    <App/>
                </Provider>
            </IntlProvider>
        );
    }
}

export default Root;