import React, { Component, createRef } from 'react'
import { Grid, Menu, Icon, Dropdown, Ref, Sticky, Rail } from 'semantic-ui-react'
import { HashRouter, Route, Switch, Link } from 'react-router-dom'
import MainPage from './components/main/MainPage'
import ResponsiveContainer from './components/layout/ResponsiveContainer'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import { connect } from 'react-redux'
import { signInCheck } from './store/actions/authActions'
import ItemPage from './components/item/ItemPage'
import ItemInput from './components/item/ItemInput'
import CategoryPage from './components/category/CategoryPage'
import MemberPage from './components/member/MemberPage'
import ItemManage from './components/item/ItemManage'
import CartPage from './components/cart/CartPage'

const style = {
  container: {
      marginTop: '2em',
      marginBottom: '2em',
      minHeight: '800px',
      marginLeft: '2em',
      marginRigth: '2em'
  }
}

// 서브 카테고리를 위한 컴포넌트
const CategoryDropdown = (props) => {
  return (
      <Dropdown text={ props.parentCategoryName } pointing='left' item>
          <Dropdown.Menu>
              { props.subCategories }
          </Dropdown.Menu>
      </Dropdown>
  );
};

class App extends Component {
  
  contextRef = createRef();

  render() {
    this.props.signInCheck()

    const allCategories = this.props.category.categories
    
    let categoryMenu = [];

    for(let i = 0; i < allCategories.length; i++) {
        // 자식 카테고리가 없을 경우
        if(allCategories[i].hasSubCategories === 'N' && allCategories[i].categoryParents === 0) {
            categoryMenu.push(<Menu.Item as={ Link } to={ '/items/' + allCategories[i].categoryNo } name={ allCategories[i].categoryName } key={ allCategories[i].categoryNo }/>);
        }

        if(allCategories[i].hasSubCategories === 'Y') {
            let subCategories = [];
            
            for(let j = 0; j < allCategories.length; j++) {
                if(allCategories[i].categoryNo === allCategories[j].categoryParents) {
                    let subCategory = (
                        <Dropdown.Item as={ Link } to={ '/items/' + allCategories[j].categoryNo } key={ allCategories[j].categoryNo }>
                            { allCategories[j].categoryName }
                        </Dropdown.Item>
                    );

                    subCategories.push(subCategory);
                }
            }

            categoryMenu.push(<CategoryDropdown parentCategoryName={ allCategories[i].categoryName } subCategories={ subCategories } key={ allCategories[i].categoryNo } />);
        }
    }

    return (
      <HashRouter>
        <Switch>
          <ResponsiveContainer>
            <Grid style={ style.container } columns={3}>
              <Grid.Column width={1}>
                <Ref innerRef={ this.contextRef }>
                  <Rail
                    internal
                    position='left'
                  >
                    <Sticky context={ this.contextRef }>
                      <Menu size='large' vertical>
                        <Menu.Item header active>
                            <Icon name='list'/>All Categories
                        </Menu.Item>
                        { categoryMenu }
                      </Menu>
                    </Sticky>
                  </Rail>
                </Ref>
              </Grid.Column>
              <Grid.Column width={14}>
                <Route exact path='/' component={ MainPage } />
                <Route path='/signin' component={ SignIn }/>
                <Route path='/signup' component={ SignUp }/>
                <Switch>
                  <Route exact path='/items/manage' component={ ItemManage } />
                  <Route exact path='/items/input' component={ ItemInput } />
                  <Route path={'/items/:categoryNo'} component={ ItemPage } key={window.location.pathname}/>
                </Switch>
                <Route exact path='/manage-categories' component={ CategoryPage } />
                <Route exact path='/manage-members' component={ MemberPage } />
                <Route exact path='/cart' component={ CartPage } />
              </Grid.Column>
              <Grid.Column width={1}></Grid.Column>
            </Grid>
          </ResponsiveContainer>
        </Switch>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      category: state.category
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInCheck: () => dispatch(signInCheck(window.sessionStorage))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
