import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Dropdown,
    Input,
    Label,
    Search
} from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import logo from 'image/logo.png'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import axios from 'axios'
import { getCategories } from '../../store/actions/categoryActions'
import { FormattedMessage, injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const HomepageHeading = ({ mobile }) => (
    <Container text>
        <Header
            as='h1'
            content='Imagine-a-Company'
            inverted
            style={{
                fontSize: mobile ? '2em' : '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: mobile ? '1.5em' : '3em',
            }}
        />
        <Header
            as='h2'
            content='Do whatever you want when you want to.'
            inverted
            style={{
                fontSize: mobile ? '1.5em' : '1.7em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.5em' : '1.5em',
            }}
        />
        <Button primary size='huge'>
            Get Started
            <Icon name='right arrow' />
        </Button>
    </Container>
)

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
}


const SubCategories = ({ mainCategory, subCategories }) => {
    return subCategories.map((subCategory, index) => {
        return subCategory.categoryParents === mainCategory.categoryNo ? (
            <Dropdown.Item as = { Link } to={ '/items/' + subCategory.categoryNo } key={ subCategory.categoryNo }>
                { subCategory.categoryName }
            </Dropdown.Item>
        ) : null;
    });
}

const MainCategories = ({ mainCategories, subCategories }) => {
    return mainCategories.length !== 0 ? (
        mainCategories.map((mainCategory) => {
            return (
                <Dropdown.Item key={ mainCategory.categoryNo }>
                    <Dropdown text={ mainCategory.categoryName } key={ mainCategory.categoryNo } fluid>
                        <Dropdown.Menu>
                            <SubCategories mainCategory={ mainCategory } subCategories={ subCategories }/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Dropdown.Item>
            );
        })
    ) : null;
}

const SearchButton = (props) => {
    const {searchOnClick} = props;
    const {alertFlag} = props;
    const {keyWord} = props;

    if(alertFlag) {
        return (
            <Label 
                style={{height: '36px', textAlign: 'center'}} 
                color='red'
                pointing='left'
            >
                <FormattedMessage id='message.item.search.blank'></FormattedMessage>
            </Label>
        )
    } else {
        return (
            <Button 
                style={{height: '36px', textAlign: 'center'}} 
                color='orange'
                onClick={searchOnClick}
            >
                Search
            </Button>
        )
    }
}

class DesktopContainer extends Component {

    state = {
        fixed: false,
        keyWord: '',
        alertFlag: false
    };

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    componentDidMount = () => {
        axios.get('/categories')
        .then((res) => {
            const categories = res.data;
            this.props.getCategories(categories);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    searchOnClick = () => {
        let keyWord = this.state.keyWord.trim();
        if(keyWord === '') {
            this.setState({
                ...this.state,
                alertFlag: true,
                keyWord: ''
            })
        } else {
            this.props.history.push('/items/search?keyWord=' + this.state.keyWord);
            this.setState({
                ...this.state,
                keyWord: ''
            })
        }
    }

    handleOnChange = e => {
        this.setState({
            ...this.state,
            alertFlag: false,
            [e.target.id]: e.target.value
        });
    }

    render() {
        const {intl} = this.props;

        const links = this.props.auth.authority ? <SignedInLinks /> : <SignedOutLinks/>;
        
        const categories = this.props.category.categories;
        const mainCategories = categories.filter(category => (category.categoryParents === 0));
        const subCategories = categories.filter(category => (category.categoryParents !== 0));

        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment size='mini' style={{backgroundColor: '#2f4f6f'}} inverted basic>
                        <Container>
                            <Menu size='large' style={{backgroundColor: '#2f4f6f'}} inverted borderless>
                                <Menu.Item as={ Link } to='/'>
                                    <img src={ logo } alt='logo'/>
                                </Menu.Item>

                                <Dropdown text='전체 카테고리' pointing item>
                                    <Dropdown.Menu>
                                        <MainCategories mainCategories={ mainCategories } subCategories = { subCategories }/>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Menu.Item>
                                    <Input 
                                        style={{width: '800px', height: '35px'}}
                                        id='keyWord'
                                        value={this.state.keyWord}
                                        placeholder={intl.formatMessage({ 
                                            id: 'item.search' 
                                        })}
                                        label={
                                            <SearchButton 
                                                searchOnClick={this.searchOnClick} 
                                                alertFlag={this.state.alertFlag}
                                            />
                                        }
                                        labelPosition='right'
                                        onChange={this.handleOnChange}
                                        onKeyPress={event => {
                                            if (event.key === 'Enter') {
                                              this.searchOnClick()
                                            }
                                        }}
                                    >
                                    </Input>
                                </Menu.Item>
                                
                                { links }

                            </Menu>
                        </Container>
                    </Segment>
                </Visibility>
                
                { this.props.children }

                <Segment inverted vertical style={{ padding: '5em 0em', backgroundColor: '#2f4f6f'}}>
                    <Container>
                        <Grid divided inverted stackable>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Header inverted as='h4' content='About' />
                                    <List link inverted>
                                        <List.Item as='a'>Sitemap</List.Item>
                                        <List.Item as='a'>Contact Us</List.Item>
                                        <List.Item as='a'>Religious Ceremonies</List.Item>
                                        <List.Item as='a'>Gazebo Plans</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Header inverted as='h4' content='Services' />
                                    <List link inverted>
                                        <List.Item as='a'>Banana Pre-Order</List.Item>
                                        <List.Item as='a'>DNA FAQ</List.Item>
                                        <List.Item as='a'>How To Access</List.Item>
                                        <List.Item as='a'>Favorite X-Men</List.Item>
                                    </List>
                                </Grid.Column>
                                
                                <Grid.Column width={7}>
                                    <Header as='h4' inverted>
                                        Footer Header
                                    </Header>
                                    <p>
                                        Extra space for a call to action inside the footer that could help re-engage users.
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>
            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

class MobileContainer extends Component {
    state = {
        sidebarOpened: false
    }

    handleSidebarHide = () => this.setState({ sidebarOpened: false })

    handleToggle = () => this.setState({ sidebarOpened: true })

    render() {
        const { children } = this.props
        const { sidebarOpened } = this.state

        return (
            <Responsive
                as={Sidebar.Pushable}
                getWidth={getWidth}
                maxWidth={Responsive.onlyMobile.maxWidth}
            >
                <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={sidebarOpened}
                >
                    <Menu.Item as='a' active>
                        Home
                    </Menu.Item>
                    <Menu.Item as='a'>Work</Menu.Item>
                    <Menu.Item as='a'>Log in</Menu.Item>
                    <Menu.Item as='a'>Sign Up</Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 350, padding: '1em 0em' }}
                        vertical
                    >
                        <Container>
                            <Menu inverted pointing secondary size='large'>
                                <Menu.Item onClick={this.handleToggle}>
                                    <Icon name='sidebar' />
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    <Button as='a' inverted>
                                        Log in
                                    </Button>
                                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                                        Sign Up
                                    </Button>
                                </Menu.Item>
                            </Menu>
                        </Container>
                        <HomepageHeading mobile />
                    </Segment>

                    { children }
                    <Segment inverted vertical style={{ padding: '5em 0em' }}>
                        <Container>
                            <Grid divided inverted stackable>
                                <Grid.Row>
                                    <Grid.Column width={3}>
                                        <Header inverted as='h4' content='About' />
                                        <List link inverted>
                                            <List.Item as='a'>Sitemap</List.Item>
                                            <List.Item as='a'>Contact Us</List.Item>
                                            <List.Item as='a'>Religious Ceremonies</List.Item>
                                            <List.Item as='a'>Gazebo Plans</List.Item>
                                        </List>
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <Header inverted as='h4' content='Services' />
                                        <List link inverted>
                                            <List.Item as='a'>Banana Pre-Order</List.Item>
                                            <List.Item as='a'>DNA FAQ</List.Item>
                                            <List.Item as='a'>How To Access</List.Item>
                                            <List.Item as='a'>Favorite X-Men</List.Item>
                                        </List>
                                    </Grid.Column>
                                    <Grid.Column width={7}>
                                        <Header as='h4' inverted>
                                            Footer Header
                                        </Header>
                                        <p>
                                            Extra space for a call to action inside the footer that could help re-engage users.
                                        </p>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </Segment>
                </Sidebar.Pusher>
            </Responsive>
        )
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
}

const ResponsiveContainer = (props) => {
    return (
        <div>
            <DesktopContainer {...props}/>
            <MobileContainer {...props}/>
        </div>
    );
}

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        category: state.category
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: (categories) => dispatch(getCategories(categories))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(ResponsiveContainer)));
