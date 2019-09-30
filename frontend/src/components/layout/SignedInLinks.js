import React from 'react'
import { Menu, Image } from 'semantic-ui-react'
import IntlMessages from '../utility/intlMessages'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { Link } from 'react-router-dom'
import testAvatar from '../../image/logo.png'

const ManageCaregories = (props) => {
    console.log(props.auth.authority);

    const authority = props.auth.authority;

    return authority === 'ADMIN' ? (
        <Menu.Item as={ Link } to='/manage-categories'>
            <IntlMessages id="button.manageCategories"/>
        </Menu.Item>
    ) : null;
}

const SignedInLinks = (props) => {
    return (
        <Menu.Menu position='right'>
            <ManageCaregories auth={props.auth}/>
            <Menu.Item as={ Link } to='/'>
                <Image src={ testAvatar } avatar />
                <span>{ props.auth.memberId }</span>
            </Menu.Item>
            <Menu.Item as='a' onClick={ props.signOut }>
                <IntlMessages id="button.logout"/>
            </Menu.Item>
        </Menu.Menu>
    );
};

const mapStateToProps = (state) => {
    return {
        ...state,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)