import React from 'react'
import { Menu, Image } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { Link } from 'react-router-dom'
import testAvatar from '../../image/logo.png'

const ManageCaregories = (props) => {
    const { authority } = props;
    
    return authority === 'ADMIN' ? (
        <Menu.Item as={ Link } to='/manage-categories'>
            <FormattedMessage id="button.manage.categories"/>
        </Menu.Item>
    ) : null;
}

const ItemInput = (props) => {
    const { authority } = props;

    return authority === 'SELLER' ? (
        <Menu.Item as={ Link } to='/items/input'>
            <FormattedMessage id="button.item.input"/>
        </Menu.Item>
    ) : null;
}

const SignedInLinks = (props) => {
    return (
        <Menu.Menu position='right'>
            <ManageCaregories authority={props.auth.authority}/>
            <ItemInput authority={props.auth.authority}/>
            <Menu.Item as={ Link } to='/'>
                <Image src={ testAvatar } avatar />
                <span>{ props.auth.memberId }</span>
            </Menu.Item>
            <Menu.Item as='a' onClick={ props.signOut }>
                <FormattedMessage id="button.logout"/>
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