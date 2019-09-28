import React, { Component } from 'react'
import App from './App'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import AppLocale from './language/index'
import rootReducer from './store/reducers/rootReducer'

const currentAppLocale = AppLocale['ko'];
const store = createStore(rootReducer);

class Root extends Component {
    render(){
        return (
            <IntlProvider
                locale={currentAppLocale.locale}
                messages={currentAppLocale.messages}
            >
                <Provider store={store}>
                    <App/>
                </Provider>
            </IntlProvider>
        );
    }
}

export default Root;