import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Step} from 'semantic-ui-react';

const style = {
    h1: {
        marginTop: '3em'
    },
    h2: {
        margin: '4em 0em 2em'
    },
    h3: {
        marginTop: '0.5em',
        padding: '2em 5em'
    },
    last: {
        marginBottom: '300px'
    },
    comp: {
        margin: '0.5rem',
        padding: '0.5rem'
    },
    base: {
        marginBottom: '2rem',
        padding: '0em 5em'
    }
};

class RegisterHeader extends Component {
    render() {
        const {number, onClickHome} = this.props;
        const prior = (number > 1) ? '/signup/' + (number - 1) : '/';

        return (
            <div>
                <Container style={style.h3}>
                    <h1>Kim's Market에 참여하세요!</h1>
                    소비를 하는 가장 현명한 방법, Kim's Market을 이용해보세요.
                </Container>
                <Container style={style.base}>
                    <Step.Group fluid>
                        {
                            (number === '1' || number === undefined) ? 
                            (<Step active icon='address card' title='Step 1:' description='계정 생성하기'/>)
                            : (<Step disabled icon='address card' title='Step 1:' description='계정 생성하기'/>)
                        }
                        { 
                            number === '2' ?
                            ( <Step active icon='clipboard outline' title='Step 2:' description='추가정보 입력하기' /> )
                            : ( <Step disabled icon='clipboard outline' title='Step 2:' description='추가정보 입력하기' /> )
                        }
                        { 
                            number === '3' ?
                            ( <Step active icon='tasks' title='Step 3:' description='간단한 설문조사' /> )
                            : ( <Step disabled icon='tasks' title='Step 3:' description='간단한 설문조사' /> )
                        }
                    </Step.Group>
                </Container>
            </div>
        );
    }
}

export default RegisterHeader;