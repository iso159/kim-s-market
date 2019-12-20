import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    List,
    Responsive,
    Segment,
    Visibility,
    Input,
    Image,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import logo from '../../image/logo.png'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import axios from 'axios'
import { getCategories } from '../../store/actions/categoryActions'
import { injectIntl } from 'react-intl';
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
        const { intl } = this.props;
        const links = this.props.auth.authority ? <SignedInLinks /> : <SignedOutLinks/>;

        return (
            <Responsive getWidth={getWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment style={ {marginBottom: '0px'} } basic>
                        <Container>
                            <Grid columns='3' verticalAlign='middle'>
                                <Grid.Column width='3' style={ {marginRight: '3%'} }>
                                    <Image src={ logo } as={ Link } to='/' />
                                </Grid.Column>
                                <Grid.Column width='9'>
                                    <Input
                                        id='keyWord'
                                        style={ { border: '3px solid orange' } }
                                        icon={ {name: 'search', link: true, onClick: this.searchOnClick } }
                                        value={ this.state.keyword }
                                        placeholder={ intl.formatMessage({
                                            id: 'item.search'
                                        }) }
                                        onChange={ this.handleOnChange }
                                        onKeyPress={ event => {
                                            if(event.key === 'Enter') {
                                                this.searchOnClick()
                                            }
                                        } }
                                        size='huge'
                                        fluid
                                    />
                                </Grid.Column>
                                <Grid.Column width='3'>
                                </Grid.Column>
                            </Grid>
                        </Container>
                    </Segment>
                    { links }
                </Visibility>
            
                { this.props.children }

                <Segment color='grey' inverted vertical style={ { padding: '5em 0em' } }>
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

const ResponsiveContainer = (props) => {
    return (
        <div>
            <DesktopContainer {...props}/>
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
