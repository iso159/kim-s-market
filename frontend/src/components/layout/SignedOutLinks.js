import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import IntlMessages from '../utility/intlMessages'

const SignedOutLinks = () => {
    return (
        <Menu.Menu position='right'>
            <Menu.Item as={ Link } to='/signup'>
                <IntlMessages id="button.signUp"/>
            </Menu.Item>
            <Menu.Item as={ Link } to='/signin'>
                <IntlMessages id="button.login"/>
            </Menu.Item>
        </Menu.Menu>
    );
};

export default SignedOutLinks