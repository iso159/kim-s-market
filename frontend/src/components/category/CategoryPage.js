import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class CategoryPage extends Component {
    render() {
        const { auth } = this.props;

        if(auth.authority !== 'ADMIN') return <Redirect to='/'/>

        return (
            <div>
                Category Test
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        auth: state.auth
    };
}

export default connect(mapStateToProps)(CategoryPage)