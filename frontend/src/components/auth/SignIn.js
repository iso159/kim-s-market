import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import userLogo from 'image/userLogo.png';
import adminLogo from 'image/adminLogo.jpg';
import sellerLogo from 'image/sellerLogo.png';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { signIn, signInFailed } from '../../store/actions/authActions'
import { loadingDatas, loadedDatas } from '../../store/actions/loaderActions'
import { FormattedMessage } from 'react-intl'

class SignIn extends Component {
    state = {
        adminId: 'admin',
        adminPassword: '1111',
        sellerId: 'seller',
        sellerPassword: '1111',
        userId: 'user',
        userPassword: '1111',
        username: '',
        password: '',
        authError: null
    };

    handleOnChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleOnSubmit = (type) => {       
        let username = '';
        let password = '';

        if(type === 'A') {
            username = this.state.adminId;
            password = this.state.adminPassword;    
        } else if(type === 'S') {
            username = this.state.sellerId;
            password = this.state.sellerPassword;
        } else {
            username = this.state.userId;
            password = this.state.userPassword;
        }

        let form = new FormData();
        form.append('username', username);
        form.append('password', password);

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
                <Dimmer active={ this.props.loader.isLoading } inverted page>
                    <Loader size='massive'>Loading...</Loader>
                </Dimmer>
                <Grid textAlign='center' style={{ height: '70vh', marginTop: '1%'}} verticalAlign='top' columns='equal'>
                    <Grid.Column style={{ maxWidth: 350 }}>
                        <Header as='h2' textAlign='center'>
                            <Image src={adminLogo} />
                        </Header>
                        <Header as='h2' textAlign='center'>
                            <FormattedMessage id="title.admin.login"/>
                        </Header>
                        { signInFailedMessage }
                        <Form onSubmit={ () => { this.handleOnSubmit('A') }} size='large'>
                            <Segment stacked>
                                <Form.Field>
                                    <label style={{textAlign: 'left'}}>아이디</label>
                                    <input type='text' id='adminId' value={this.state.adminId} onChange={this.handleOnChange} autoFocus/>
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor='password' style={{textAlign: 'left'}}>비밀번호</label>
                                    <input type='password' id='adminPassword' value={this.state.adminPassword} onChange={this.handleOnChange}/>
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

                    <Grid.Column style={{ maxWidth: 350 }}>
                        <Header as='h2' textAlign='center'>
                            <Image src={sellerLogo} />
                        </Header>
                        <Header as='h2' textAlign='center'>
                            <FormattedMessage id="title.seller.login"/>
                        </Header>
                        { signInFailedMessage }
                        <Form onSubmit={ () => { this.handleOnSubmit('S') } } size='large'>
                            <Segment stacked>
                                <Form.Field>
                                    <label htmlFor='username' style={{textAlign: 'left'}}>아이디</label>
                                    <input type='text' id='sellerId' value={this.state.sellerId} onChange={this.handleOnChange} autoFocus/>
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor='password' style={{textAlign: 'left'}}>비밀번호</label>
                                    <input type='password' id='sellerPassword' value={this.state.sellerPassword} onChange={this.handleOnChange}/>
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

                    <Grid.Column style={{ maxWidth: 350 }}>
                        <Header as='h2' textAlign='center'>
                            <Image src={userLogo} />
                        </Header>
                        <Header as='h2' textAlign='center'>
                            <FormattedMessage id="title.user.login"/>
                        </Header>
                        { signInFailedMessage }
                        <Form onSubmit={ () => { this.handleOnSubmit('U') } } size='large'>
                            <Segment stacked>
                                <Form.Field>
                                    <label htmlFor='username' style={{textAlign: 'left'}}>아이디</label>
                                    <input type='text' id='userId' value={this.state.userId} onChange={this.handleOnChange} autoFocus/>
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor='password' style={{textAlign: 'left'}}>비밀번호</label>
                                    <input type='password' id='userPassword' value={this.state.userPassword} onChange={this.handleOnChange}/>
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