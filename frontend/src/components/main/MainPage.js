import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Menu, Icon, Dropdown, Grid, Image, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import macBook from '../../image/main/mac-book-resized.png'
import halloweenTicket from '../../image/main/ticket-halloween.png'
import artWork from '../../image/main/art-work.png'
import summer from '../../image/main/summer.png'
import neonStyle from '../../image/main/neon-style.png'

const style = {
    container: {
        marginTop: '2em',
        marginBottom: '2em',
        minHeight: '800px'
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

const MainPage = (props) => {
    const allCategories = props.category.categories;

    let categoryMenu = [];

    for(let i = 0; i < allCategories.length; i++) {
        // 자식 카테고리가 없을 경우
        if(allCategories[i].hasSubCategories === 'N' && allCategories[i].categoryParents === 0) {
            categoryMenu.push(<Menu.Item as={ Link } name={ allCategories[i].categoryName } key={ allCategories[i].categoryNo }/>);
        }

        if(allCategories[i].hasSubCategories === 'Y') {
            let subCategories = [];
            
            for(let j = 0; j < allCategories.length; j++) {
                if(allCategories[i].categoryNo === allCategories[j].categoryParents) {
                    let subCategory = (
                        <Dropdown.Item>
                            { allCategories[j].categoryName }
                        </Dropdown.Item>
                    );

                    subCategories.push(subCategory);
                }
            }

            categoryMenu.push(<CategoryDropdown parentCategoryName={ allCategories[i].categoryName } subCategories={ subCategories } />);
        }
    }

    return (
        <Container style={ style.container }>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column width={4}>
                        <Menu size='huge' vertical>
                            <Menu.Item header active>
                                <Icon name='list' />All Categories
                            </Menu.Item>
                            { categoryMenu }
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Image src={ macBook } fluid />
                    </Grid.Column>
                </Grid.Row>
                <Divider horizontal>TICKETS</Divider>
                <Grid.Row column={2}>
                    <Grid.Column width={10}>
                        <Image src={ halloweenTicket } size='huge' fluid/>
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
        auth: state.auth,
        category: state.category
    };
};

export default connect(mapStateToProps)(MainPage);