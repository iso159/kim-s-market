import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Dropdown,
    Input
} from 'semantic-ui-react'
import logo from 'image/logo.png'
import IntlMessages from '../utility/intlMessages'
import {axios} from 'axios';

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
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

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            topCategories: []
        };

        this.renderCategories = this.renderCategories.bind(this);
    }

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    componentDidMount() {
        const axios = require('axios');
        const state = this;

        axios.get('/categories')
        .then(function (response) {
            state.setState({topCategories: response.data});
        })
        .catch(function (error) {
        });
    }

    renderCategories() {
        return this.state.topCategories.map(function(category){
            return (
                <Dropdown.Item key={category.categoryName}>
                    {category.categoryName}
                </Dropdown.Item>
            );
        });
    }

    render() {
        const { children } = this.props;

        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment size='huge' style={{backgroundColor: '#2f4f6f'}} inverted basic>
                        <Menu size='large' style={{backgroundColor: '#2f4f6f'}} inverted borderless>
                            <Menu.Item as='a' onClick={()=>{window.location.href='/'}}>
                                <img src={logo}/>
                            </Menu.Item>
                            <Dropdown
                                onClick={()=>{window.location.href='/'}}
                                text='전체 카테고리'
                                simple
                                item
                            >
                                <Dropdown.Menu>
                                    {this.renderCategories()}
                                </Dropdown.Menu>
                            </Dropdown>
                            
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Input 
                                        action={{icon: 'search', color: 'orange'}} 
                                        placeholder='Search...' 
                                    />
                                </Menu.Item>
                                <Menu.Item as='a' onClick={()=>{window.location.href='/login'}}>
                                    <IntlMessages id="loginButton"/>
                                </Menu.Item>
                                <Menu.Item as='a' onClick={()=>{window.location.href='/signup'}}>
                                    <IntlMessages id="signUpButton"/>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    </Segment>
                </Visibility>

                {children}
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
    state = {}

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

                    {children}
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

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
)

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}

export {ResponsiveContainer};