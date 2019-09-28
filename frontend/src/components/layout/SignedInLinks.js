import React from 'react'
import { Menu } from 'semantic-ui-react'
import IntlMessages from '../utility/intlMessages'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    return (
        <Menu.Menu position='right'>
            <Menu.Item as='a'>
                <IntlMessages id="button.profile"/>
            </Menu.Item>
            <Menu.Item as='a' onClick={ props.signOut }>
                <IntlMessages id="button.logout"/>
            </Menu.Item>
        </Menu.Menu>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    };
};

export default connect(null, mapDispatchToProps)(SignedInLinks)