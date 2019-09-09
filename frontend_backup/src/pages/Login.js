import React, { Component } from 'react';
import Input from '../components/uielements/input';
import Button from '../components/uielements/button';
import SignInStyleWrapper from './style/login.style';
import IntlMessages from '../components/utility/intlMessages';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setLoginStatus } from '../actions/LoginAction';
import { connect } from 'react-redux';
import Alert from '../components/feedback/alert'


class Login extends Component {
  constructor(props)
  {
      super(props);
      this.handleClick = this.handleClick.bind(this);
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
    .then( response => {
      const userName = response.data.data.memberId;
      const authority = response.data.data.authority;
      const isLogin = response.data.result;
      this.props.handleLoginStatus(userName, authority, isLogin);
      this.setState({
        ...this.state,
        isLogin: this.props.isLogin
      });
    })
    .catch( error => {
      const userName = this.props.userName;
      const authority = this.props.authority;
      const isLogin = error.response.data.result;
      this.props.handleLoginStatus(userName, authority, isLogin);
      this.setState({
        ...this.state,
        isLogin: this.props.isLogin
      });
    });
  };

  loginFailMessage = () => {
    const marginBot = {
      marginBottom: "10px"
    };
    
    if(this.state.isLogin === 'false') {
      return <div><Alert message={<IntlMessages id="message.login.fail" />} type="error" style={marginBot} /> </div>;
    }
  }

  render() {
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/login">
                <IntlMessages id="project.name" />
              </Link>
            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Input size="large" 
                placeholder="아이디"
                name="id" 
                value={this.state.id} 
                onChange={this.handleOnChange}
              />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" type="password"
                placeholder="Password"
                name="password" 
                value={this.state.password} 
                onChange={this.handleOnChange} />
              </div>

              {this.loginFailMessage()}

              <div className="isoInputWrapper isoLeftRightComponent">
                <Button type="primary" onClick={this.handleClick}>
                  <IntlMessages id="page.login" />
                </Button>

                <Link to="/SignUp">
                  <Button type="primary">
                    <IntlMessages id="page.signUp" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);