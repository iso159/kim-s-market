import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import App from '../shared/App';
import { IntlProvider } from 'react-intl';
import AppLocale from '../language/index';
import { ThemeProvider } from 'styled-components';
import { themeConfig } from '../settings';
import themes from '../settings/themes';
import RootHolder from './rootStyle';
import GlobalStyles from '../static/style/globalStyle';

const currentAppLocale = AppLocale['ko'];

const Root = () => (
    <IntlProvider 
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
    >
        <ThemeProvider theme={themes[themeConfig.theme]}>
            <RootHolder>
                <BrowserRouter>
                    <App>
                        <GlobalStyles />
                    </App>
                </BrowserRouter>
            </RootHolder>
        </ThemeProvider>
    </IntlProvider>
);

export default Root;