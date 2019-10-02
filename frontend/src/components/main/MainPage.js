import React from 'react'
import {
    Segment,
    Grid,
    Header,
    Container,
    Button,
    Divider,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import Slider from 'react-slick'

const MainPage = () => {
    const slickSettings = {
        dots: false,
        infinite: true,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return (
        <Container>
            <Slider {...slickSettings} className="slide">
                <Segment inverted vertical textAlign="center">
                    <Container text className="active">
                        <Header inverted as="h1">
                            Example headline.
                        </Header>
                        <p>
                            Note: If you're viewing this page via a <code>file://</code>
                            URL, the "next" and "previous" Glyphicon buttons on the left and
                            right might not load/display properly due to web browser
                            security rules.
                        </p>
                        <Button primary size="huge">
                            Sign up today
                        </Button>
                    </Container>
                </Segment>
                <Segment inverted vertical textAlign="center">
                    <Container text className="active">
                        <Header inverted as="h1">
                            Another example headline.
                        </Header>
                        <p>
                            Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                            Donec id elit non mi porta gravida at eget metus. Nullam id
                            dolor id nibh ultricies vehicula ut id elit.
                        </p>
                        <Button primary size="huge">
                            Learn more
                        </Button>
                    </Container>
                </Segment>
                <Segment inverted vertical textAlign="center">
                    <Container text className="active">
                        <Header inverted as="h1">
                            One more for good measure
                        </Header>
                        <p>
                            Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                            Donec id elit non mi porta gravida at eget metus. Nullam id
                            dolor id nibh ultricies vehicula ut id elit.
                        </p>
                        <Button primary size="huge">
                            Browse gallery
                        </Button>
                    </Container>
                </Segment>
            </Slider>
            <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header as='h3' style={{ fontSize: '2em' }}>
                                We Help Companies and Companions
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                We can give your company superpowers to do things that they never thought possible.
                                Let us delight your customers and empower your needs... through pure data analytics.
                            </p>
                            <Header as='h3' style={{ fontSize: '2em' }}>
                                We Make Bananas That Can Dance
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                Yes that's right, you thought it was the stuff of dreams, but even bananas can be
                                bioengineered.
                            </p>
                        </Grid.Column>
                        <Grid.Column floated='right' width={6}>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign='center'>
                            <Button size='huge'>Check Them Out</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Segment style={{ padding: '0em' }} vertical>
                <Grid celled='internally' columns='equal' stackable>
                    <Grid.Row textAlign='center'>
                        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                            <Header as='h3' style={{ fontSize: '2em' }}>
                                "What a Company"
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
                        </Grid.Column>
                        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                            <Header as='h3' style={{ fontSize: '2em' }}>
                                "I shouldn't have gone with their competitor."
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                <b>Nan</b> Chief Fun Officer Acme Toys
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Segment style={{ padding: '8em 0em' }} vertical>
                <Container text>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                        Breaking The Grid, Grabs Your Attention
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                        Instead of focusing on content creation and hard work, we have learned how to master the
                        art of doing nothing by providing massive amounts of whitespace and generic content that
                        can seem massive, monolithic and worth your attention.
                    </p>
                    <Button as='a' size='large'>
                        Read More
                    </Button>
                    <Divider
                        as='h4'
                        className='header'
                        horizontal
                        style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                    >
                        <a href='#'>Case Studies</a>
                    </Divider>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                        Did We Tell You About Our Bananas?
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                        Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
                        it's really true. It took years of gene splicing and combinatory DNA research, but our
                        bananas can really dance.
                    </p>
                    <Button as='a' size='large'>
                        I'm Still Quite Interested
                    </Button>
                </Container>
            </Segment>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(MainPage);