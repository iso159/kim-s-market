import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/uielements/input';
import Button from '../components/uielements/button';
import IntlMessages from '../components/utility/intlMessages';
import SignUpStyleWrapper from './style/signup.style';
import axios from 'axios';

class SignUp extends Component {
  constructor(props)
  {
      super(props);
      this.handleClick.bind(this);
      this.state = {
        member: {
          id: "",
          password: "",
          name: "",
          phone: "",
          mail: "",
          zipCode: "",
          address: "",
          authority: "U",
          status: "Y",
          grantor: ""
        }
      };
  }

  handleClick = () => {
    axios({
      url: '/member/join',
      method: 'post',
      data: {
        requestData: {
          memberId: this.state.member.id,
          password: this.state.member.password,
          name: this.state.member.name,
          phone: this.state.member.phone,
          mail: this.state.member.mail,
          zipCode: this.state.member.zipCode,
          address: this.state.member.address,
          authority: this.state.member.authority,
          status: this.state.member.status,
          grantor: this.state.member.grantor
        }
      }
    })
    .then(response => {
      console.log('완료');
      this.props.history.push('/login');
    });
  };

  handleOnChange = (e) => {
    this.setState({
      member:{
        ...this.state.member,
        [e.target.name]: e.target.value
      }
    });
  }

  render() {
    return (
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.signUp" />
              </Link>
            </div>

            <div className="isoSignUpForm">
              <div className="isoInputWrapper">
                <Input size="large" 
                  placeholder="아이디" 
                  name="id" 
                  value={this.state.member.id} 
                  onChange={this.handleOnChange} 
                />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" 
                  type="password" 
                  placeholder="패스워드" 
                  name="password" 
                  value={this.state.member.password}
                  onChange={this.handleOnChange}
                />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Input size="large" 
                  placeholder="성명" 
                  name="name" 
                  value={this.state.member.name} 
                  onChange={this.handleOnChange}
                />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" 
                  placeholder="Email" 
                  name="mail" 
                  value={this.state.member.mail} 
                  onChange={this.handleOnChange}
                />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" 
                  placeholder="전화번호" 
                  name="phone" 
                  value={this.state.member.phone} 
                  onChange={this.handleOnChange}
                />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" 
                  placeholder="우편번호" 
                  name="zipCode" 
                  value={this.state.member.zipCode} 
                  onChange={this.handleOnChange}
                />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" 
                  placeholder="주소" 
                  name="address" 
                  value={this.state.member.address} 
                  onChange={this.handleOnChange}
                />
              </div>

              <div className="isoInputWrapper">
                <Button type="primary" onClick={this.handleClick}>
                  <IntlMessages id="page.signUp" />
                </Button>
              </div>

              <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                <Link to="/signin">
                  <IntlMessages id="page.moveLogin" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignUpStyleWrapper>
    );
  }
}

export default SignUp;
