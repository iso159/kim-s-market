import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AppLocale from '../language/index';
import { ThemeProvider } from 'styled-components';
import { themeConfig } from '../settings';
import themes from '../settings/themes';
import RootHolder from './rootStyle';
import GlobalStyles from '../static/style/globalStyle';
import PublicRoute from '../router';
import reducers from '../reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const currentAppLocale = AppLocale['ko'];
const store = createStore(reducers);

const Root = () => (
    <IntlProvider 
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
    >
        <ThemeProvider theme={themes[themeConfig.theme]}>
            <RootHolder>
                <BrowserRouter>
                    <Provider store={store}>
                        <PublicRoute />
                            <GlobalStyles />
                    </Provider>
                </BrowserRouter>
            </RootHolder>
        </ThemeProvider>
    </IntlProvider>
);

export default Root;