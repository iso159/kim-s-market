import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setLoginStatus} from 'actions/LoginAction';
import '../style/Login.css';
import logo from 'image/logo.png';
import {Link} from 'react-router-dom';
import {Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';
import IntlMessages from '../components/utility/intlMessages';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: "",
            password: "",
            isLogin: "",
            alertVisible: true
        };
        
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.loginFailMessage = this.loginFailMessage.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
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

        this.setState({alertVisible: true});

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
            const isLogin = 'false';
            this.props.handleLoginStatus(userName, authority, isLogin);
            this.setState({
                ...this.state,
                isLogin: this.props.isLogin
            });
        })
    }

    handleDismiss = () => {
        this.setState({alertVisible: false});
    }

    loginFailMessage = () => {

        if(this.state.isLogin === 'false' && this.state.alertVisible === true) {
            return (
                <div>
                    <Message 
                        negative 
                        style={{margin: '1em 0 1em 0'}}
                        onDismiss={this.handleDismiss}
                        size='small'
                    >
                        <IntlMessages id="message.login.fail" />
                    </Message>
                </div>
            );
        }
    }

    render(){
        return(
            <div>
                <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 350 }}>
                    <Header as='h2' textAlign='center'>
                        <Image src={logo} />
                    </Header>
                    <Header as='h2' textAlign='center'>
                        <IntlMessages id="loginTitle"/>
                    </Header>
                    {this.loginFailMessage()}
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Field>
                                <label htmlFor='id' style={{textAlign: 'left'}}>이메일</label>
                                <input id='id' name='id' onChange={this.handleOnChange} autoFocus/>
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor='password' style={{textAlign: 'left'}}>비밀번호</label>
                                <input type='password' id='password' name='password' onChange={this.handleOnChange}/>
                            </Form.Field>

                            
                            <Button color='green' 
                                fluid 
                                size='large'
                                onClick={this.handleClick}
                            >
                                <IntlMessages id="loginButton" />
                            </Button>
                            
                        </Segment>
                    </Form>
                    <Message>
                        Kim's Market에 처음이세요? <Link className='toSignUp' to='/signup'> 계정 만들기</Link>
                    </Message>
                    </Grid.Column>
                </Grid>
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