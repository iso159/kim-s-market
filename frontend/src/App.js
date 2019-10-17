import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MainPage from './components/main/MainPage'
import ResponsiveContainer from './components/layout/ResponsiveContainer'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import { connect } from 'react-redux'
import { signInCheck } from './store/actions/authActions'
import ItemPage from './components/item/ItemPage'
import ItemInput from './components/item/ItemInput'
import CategoryPage from './components/category/CategoryPage'

class App extends Component {
  
  render() {
    this.props.signInCheck();

    return (
      <BrowserRouter>
        <Switch>
          <ResponsiveContainer>
            <Route exact path='/' component={ MainPage } />
            <Route path='/signin' component={ SignIn }/>
            <Route path='/signup' component={ SignUp }/>
            <Switch>
              <Route exact path='/items/input' component={ ItemInput } />
              <Route path={'/items/:categoryNo'} component={ ItemPage } key={window.location.pathname}/>
            </Switch>
            <Route exact path='/manage-categories' component={ CategoryPage } />
          </ResponsiveContainer>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInCheck: () => dispatch(signInCheck(window.sessionStorage))
  };
}

export default connect(null, mapDispatchToProps)(App);
