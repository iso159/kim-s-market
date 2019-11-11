import React from 'react'
import { Menu, Image, Container } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { Link } from 'react-router-dom'
import adminLogo from '../../image/adminLogo.jpg'
import sellerLogo from '../../image/sellerLogo.png'
import userLogo from '../../image/userLogo.png'

// 메뉴 우측 프로필 아바타
const Avatar = (props) => {
    const { authority } = props;

    let avatar;
    
    if(authority === 'ADMIN') {
        avatar = <Image src={ adminLogo } avatar />
    } else if(authority === 'SELLER') {
        avatar = <Image src={ sellerLogo } avatar />
    } else {
        avatar = <Image src={ userLogo } avatar />
    }

    return avatar;
}

// 회원 관리 (관리자)
const ManageMembers = (props) => {
    const { authority } = props;

    return authority === 'ADMIN' ? (
        <Menu.Item as={ Link } to='/manage-members'>
            <FormattedMessage id='button.manage.members' />
        </Menu.Item>
    ) : null;
}

// 상품 카테고리 관리 (관리자)
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

const ManageItem = (props) => {
    const { authority } = props;

    return authority === 'SELLER' ? (
        <Menu.Item as={ Link } to='/items/manage'>
            <FormattedMessage id="button.manage.item"/>
        </Menu.Item>
    ) : null;
}

const SignedInLinks = (props) => {
    return (
        <Menu size='large' color='orange' inverted>
            <Container>
                <Menu.Item
                    name='홈'
                    as={ Link }
                    to='/'
                />
                <ManageMembers authority={ props.auth.authority } />
                <ManageCaregories authority={ props.auth.authority } />
                <Menu.Menu position='right'>
                    <Menu.Item as={ Link } to='/'>
                        <Avatar authority={ props.auth.authority }/>
                        <span>{ props.auth.memberId }</span>
                    </Menu.Item>
                    <Menu.Item as='a' onClick={ props.signOut }>
                        <FormattedMessage id="button.logout"/>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
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