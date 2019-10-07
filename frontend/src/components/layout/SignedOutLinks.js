import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

const SignedOutLinks = () => {
    return (
        <Menu.Menu position='right'>
            <Menu.Item as={ Link } to='/signup'>
                <FormattedMessage id="button.signUp"/>
            </Menu.Item>
            <Menu.Item as={ Link } to='/signin'>
                <FormattedMessage id="button.login"/>
            </Menu.Item>
        </Menu.Menu>
    );
};

export default SignedOutLinks