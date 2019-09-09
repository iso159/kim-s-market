import React, {Component} from 'react';
import logo from 'image/logo.png';
import {Link} from 'react-router-dom';

import './Login.css';

import {Button, Form, Grid, Header, Image, Message, Segment, Label, Container} from 'semantic-ui-react';

const style = {
    base: {
        margin: '0.5rem',
        padding: '0.5rem'
    }
}

class Login extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 350 }}>
                <Header as='h2' textAlign='center'>
                    <Image src={logo} />
                </Header>
                <Header as='h2' textAlign='center'>
                    Kim's Market에 로그인
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Field>
                            <label htmlFor='email' style={{textAlign: 'left'}}>이메일</label>
                            <input id='email' autoFocus/>
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor='password' style={{textAlign: 'left'}}>비밀번호</label>
                            <input type='password' id='password'/>
                        </Form.Field>

                        <Link to='/'>
                            <Button color='green' 
                            fluid 
                            size='large'
                            onClick={this.props.handleClick}
                            >
                                로그인
                            </Button>
                        </Link>
                    </Segment>
                </Form>
                <Message>
                    Kim's Market에 처음이세요? <Link className='toSignUp' to='/signup'> 계정 만들기</Link>
                </Message>
                </Grid.Column>
            </Grid>
        );
        }
}

export default Login;