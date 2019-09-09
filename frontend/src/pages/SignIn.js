import React, {Component} from 'react';
import {Login} from 'components/Login';
import axios from 'axios';
import {connect} from 'react-redux';
import {setLoginStatus} from 'actions/LoginAction';
import {
    Message
} from 'semantic-ui-react';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: "",
            password: "",
            isLogin: ""
        };
    }

    handleOnChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    handleClick = () => {
        let form = new FormData();
        form.append('username', this.state.id);
        form.append('password', this.state.password);

        axios({
            url: '/login',
            method: 'post',
            headers: { 'Content-type': 'application/x-www-form-urlencoded', },
            data: form
        })
        .then(response => {
            const userName = response.data.data.memberId;
            const authority = response.data.data.authority;
            const isLogin = response.data.result;
            
            this.props.handleLoginStatus(userName, authority, isLogin);
            this.setState({
                ...this.state,
                isLogin: this.props.isLogin
            });
        })
        .catch(error => {
            const userName = this.props.userName;
            const authority = this.props.authority;
            const isLogin = false;
            this.props.handleLoginStatus(userName, authority, isLogin);
            this.setState({
                ...this.state,
                isLogin: this.props.isLogin
            });
        })
    }

    loginFailMessage = () => {
        const marginBot = {
            marginBottom: "10px"
        };
        
        if(this.state.isLogin === 'false') {
            return <div><Message positive>Login failed</Message> </div>;
        }
    }

    render(){
        return(
            <div>
                <Login handleClick={this.handleClick}/>
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
        handleLoginStatus: (userName, authority, isLogin) => { dispatch(setLoginStatus(userName, authority, isLogin))},
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);