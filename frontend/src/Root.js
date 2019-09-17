import React, {Component} from 'react';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {IntlProvider} from 'react-intl';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import AppLocale from './language/index';
import reducers from 'reducers';

const currentAppLocale = AppLocale['ko'];
const store = createStore(reducers);

class Root extends Component {
    render(){
        return (
            <IntlProvider
                locale={currentAppLocale.locale}
                messages={currentAppLocale.messages}
            >
                <BrowserRouter>
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </BrowserRouter>
            </IntlProvider>
        );
    }
}

export default Root;