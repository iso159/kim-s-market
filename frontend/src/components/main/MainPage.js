import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid, Image, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import macAds from '../../image/main/mac_ads.png'
import halloweenTicket from '../../image/main/ticket-halloween.png'
import artWork from '../../image/main/art-work.png'
import summer from '../../image/main/summer.png'
import neonStyle from '../../image/main/neon-style.png'

const MainPage = (props) => {
    return (
        <Container>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column width={16}>
                        <Image src={ macAds } fluid />
                    </Grid.Column>
                </Grid.Row>
                <Divider horizontal>TICKETS</Divider>
                <Grid.Row column={2}>
                    <Grid.Column width={10}>
                        <Image src={ halloweenTicket } fluid />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Image src={ artWork } size='huge'/>
                    </Grid.Column>
                </Grid.Row>
                <Divider horizontal>FASHIONS</Divider>
                <Grid.Row column={2}>
                    <Grid.Column width={5}>
                        <Image src={ neonStyle } fluid />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Image src={ summer } fluid/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        category: state.category
    };
};

export default connect(mapStateToProps)(MainPage);