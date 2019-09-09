import React, {Component} from 'react';
import {PersonalInput, DevelopInput, ExperienceInput, CompleteRegister, RegisterHeader} from 'components/Register';
import {
    Container
} from 'semantic-ui-react'

class SignUp extends Component {
    render(){
        const {match} = this.props;
        const number = match.params.number;

        return (
            <div>
                <RegisterHeader number={number} />
                <Container>
                    {(number === '1' || number === undefined) && <PersonalInput/>}
                    {(number === '2') && <DevelopInput/>}
                    {(number === '3') && <ExperienceInput/>}
                    {(number === '4') && <CompleteRegister/>}
                </Container>
            </div>
        );
    }
}

export default SignUp;