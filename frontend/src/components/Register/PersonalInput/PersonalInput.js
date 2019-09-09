import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    Container,
    Header,
    Button,
    Form,
    Label,
    Segment,
    Message,
    Grid,
    Input,
    Divider,
    Image
} from 'semantic-ui-react'

import fcbar from 'image/fcbar.jpg';

const style = {
    base : {
        margin: '0.5rem',
        padding: '0.5rem'
    },
    padding: {
        padding: '1em 5em'
    },
    h2: {
        fontSize: '22px'
    }
};

class PersonalInput extends Component {
    render() {
        return (
            <div>
                <Container style={style.padding}>
                    <p style={style.h2}>계정 생성하기</p>
                </Container>
                <Container style={style.padding}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Form size='small'>
                                    <Form.Group >
                                        <Form.Field width={16} required >
                                            <label for='username'>사용자명</label>
                                            <input id='username' name='username'/>
                                        </Form.Field>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Field width={16} required>
                                            <label for='email'>이메일</label>
                                            <input id='email' name='email'/>
                                        </Form.Field>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Field width={16} required>
                                            <label for='password'>비밀번호</label>
                                            <input id='password' name='password'/>
                                        </Form.Field>
                                    </Form.Group>
                                </Form>
                                <Divider />
                                <Link to='/'><Button color='green' size='medium'>계정 만들기</Button></Link>
                            </Grid.Column>

                            <Grid.Column floated='right' width={6}>
                                <Segment>
                                    <Header>Kim's Market에 오신 것을 환영합니다 !</Header>
                                    <Divider/>
                                    <Image src={fcbar} bordered />
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default PersonalInput;