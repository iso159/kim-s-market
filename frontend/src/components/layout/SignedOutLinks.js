import React from 'react'
import { Menu, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

const SignedOutLinks = () => {
    return (
        <Menu size='large' color='orange' inverted>
            <Container>
                <Menu.Item
                    name='홈'
                    as={ Link }
                    to='/'
                />
                <Menu.Menu position='right'>
                    <Menu.Item as={ Link } to='/signup'>
                        <FormattedMessage id="button.signUp"/>
                    </Menu.Item>
                    <Menu.Item as={ Link } to='/signin'>
                        <FormattedMessage id="button.login"/>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    );
};

export default SignedOutLinks