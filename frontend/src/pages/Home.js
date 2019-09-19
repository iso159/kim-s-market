import React, {Component} from 'react';
import {ResponsiveContainer, HomepageLayout} from 'components/Main';
import {connect} from 'react-redux';
import {setLoginStatus} from 'actions/LoginAction';

class Home extends Component {
    constructor(props){
        super(props);
    }

    initLoginStatus = () => {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        if( userInfo === null) {
            return;    
        }

        let userName = userInfo.userName;
        let authority = userInfo.authority;
        let isLogin = userInfo.isLogin;
        this.props.handleLoginStatus(userName, authority, isLogin);
    }

    UNSAFE_componentWillMount() {
        setTimeout(this.initLoginStatus(), 0);
    }

    render(){
        return(
            <div>
                <ResponsiveContainer>
                    <HomepageLayout />
                </ResponsiveContainer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.login.userName,
        authority: state.login.authority,
        isLogin: state.login.isLogin
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLoginStatus: (userName, authority, isLogin) => {dispatch(setLoginStatus(userName, authority, isLogin))},
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);