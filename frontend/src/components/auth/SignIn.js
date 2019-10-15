import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import logo from 'image/logo.png';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { signIn, signInFailed } from '../../store/actions/authActions'
import { loadingDatas, loadedDatas } from '../../store/actions/loaderActions'
import { FormattedMessage } from 'react-intl'

class SignIn extends Component {
    state = {
        username: '',
        password: '',
        authError: null
    };

    handleOnChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        
        let form = new FormData();
        form.append('username', this.state.username);
        form.append('password', this.state.password);

        this.props.loadingDatas();

        axios.post('/login', form)
        .then(res => {
            this.props.signIn(res.data.data);
        })
        .catch(err => {
            this.props.signInFailed();

            this.setState({
                ...this.state,
                authError: this.props.auth.authError
            });
        })
        .finally(() => {
            this.props.loadedDatas();
        })
    }

    render(){
        if(this.props.auth.authority) return <Redirect to='/'/>

        const signInFailedMessage = this.state.authError ? (
            <Message negative>
                <Message.Header>{ this.state.authError }</Message.Header>
            </Message>
        ) : null

        return(
            <div>
                <Dimmer active={ this.props.loader.isLoading } page>
                    <Loader size='massive'>Loading...</Loader>
                </Dimmer>
                <Grid textAlign='center' style={{ height: '70vh', marginTop: '1%'}} verticalAlign='top'>
                    <Grid.Column style={{ maxWidth: 350 }}>
                        <Header as='h2' textAlign='center'>
                            <Image src={logo} />
                        </Header>
                        <Header as='h2' textAlign='center'>
                            <FormattedMessage id="title.login"/>
                        </Header>
                        { signInFailedMessage }
                        <Form onSubmit={this.handleOnSubmit} size='large'>
                            <Segment stacked>
                                <Form.Field>
                                    <label htmlFor='username' style={{textAlign: 'left'}}>아이디</label>
                                    <input type='text' id='username' onChange={this.handleOnChange} autoFocus/>
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor='password' style={{textAlign: 'left'}}>비밀번호</label>
                                    <input type='password' id='password' onChange={this.handleOnChange}/>
                                </Form.Field>
                                <Button color='green' 
                                    fluid 
                                    size='large'
                                >
                                    <FormattedMessage id="button.login" />
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            Kim's Market에 처음이세요? <Link to='/signup'> 계정 만들기</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        loader: state.loader
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials)),
        signInFailed: () => dispatch(signInFailed()),
        loadingDatas: () => ( dispatch(loadingDatas()) ),
        loadedDatas: () => ( dispatch(loadedDatas()) ),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);