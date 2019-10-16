import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PersonalInput from '../Register/PersonalInput/PersonalInput'

class SignUp extends Component {

    render(){
        if(this.props.auth.authority) return <Redirect to='/'/>

        return (
            <div>
                <PersonalInput/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(SignUp);