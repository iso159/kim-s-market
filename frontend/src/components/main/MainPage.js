import React from 'react'
import {
    Segment,
    Grid,
    Header,
    Container,
    Button,
    Divider,
    Image,
    Item
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import banana from '../../image/banana.jpg'
import bananaMain from '../../image/bananaMain.png'

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
            <Segment style={{ padding: '0em'}} vertical>
                <Slider {...slickSettings}>
                    <div>
                        <Image src={bananaMain} fluid/>
                    </div>
                    <div>
                        <Image src={bananaMain} fluid/>
                    </div>
                </Slider>
            </Segment>
            <Segment style={{ padding: '0em' }} vertical>
                <Grid columns='equal' stackable>
                    <Grid.Row>
                        <Grid.Column style={{ paddingTop: '5em' }}>
                            <Header as='h3' style={{ fontSize: '2em'}}>
                                오늘의 인기상품
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row width={4}>
                        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                            <Item.Group>
                                <Item>
                                    <Item.Image widht={ 300 } height={ 300 } src={ banana } />
                                    <Item.Content>
                                        <Item.Header as='a'>바나나</Item.Header>
                                        <Item.Meta>&#8361; 3,000</Item.Meta>
                                        <Item.Description>
                                            맛있는 바나나 ~
                                        </Item.Description>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Grid.Column>
                        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                            <Item.Group>
                                <Item>
                                    <Item.Image widht={ 300 } height={ 300 } src={ banana } />
                                    <Item.Content>
                                        <Item.Header as='a'>바나나</Item.Header>
                                        <Item.Meta>&#8361; 3,000</Item.Meta>
                                        <Item.Description>
                                            맛있는 바나나 ~
                                        </Item.Description>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Grid.Column>
                        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                            <Item.Group>
                                <Item>
                                    <Item.Image widht={ 300 } height={ 300 } src={ banana } />
                                    <Item.Content>
                                        <Item.Header as='a'>바나나</Item.Header>
                                        <Item.Meta>&#8361; 3,000</Item.Meta>
                                        <Item.Description>
                                            맛있는 바나나 ~
                                        </Item.Description>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Grid.Column>
                        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                            <Item.Group>
                                <Item>
                                    <Item.Image widht={ 300 } height={ 300 } src={ banana } />
                                    <Item.Content>
                                        <Item.Header as='a'>바나나</Item.Header>
                                        <Item.Meta>&#8361; 3,000</Item.Meta>
                                        <Item.Description>
                                            맛있는 바나나 ~
                                        </Item.Description>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
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