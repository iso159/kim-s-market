import React, { Component } from 'react';
import Input from '../components/uielements/input';
import Button from '../components/uielements/button';
import SignInStyleWrapper from './style/login.style';
import IntlMessages from '../components/utility/intlMessages';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  axiosTest = () => {
    axios({
      url: '/test',
      method: 'post',
      data: {
        object: {
          name: "test"
        }
      }
    });
  };

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
                <Input size="large" placeholder="Username" />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" type="password" placeholder="Password" />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Button type="primary" onClick={this.axiosTest}>
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

export default Login;