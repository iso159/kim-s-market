import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class SignUp extends Component {

    render(){
        if(this.props.auth.authority) return <Redirect to='/'/>

        return (
            <div>
                Sign Up Page
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