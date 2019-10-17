import React, {Component} from 'react'
import Slider from 'react-slick'
import {
    Header,
    Container,
    Icon,
    Grid,
    Item,
    Image,
    Pagination
  } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import axios from 'axios';

class ItemPage extends Component {

    state = {
        itemList: [],
        itemSeparate: {
            itemListOne: [],
            itemListTwo: [],
            itemListThree: []
        },
        startPage: 1,
        currentPage: 1,
        pageSize: 9,
        itemCount: 0
    }

    // 상품 리스트 요청
    getItems = (categoryNoProp, num) => {
        let categoryNo = categoryNoProp === undefined ? this.props.match.params.categoryNo :  categoryNoProp
        let pageNum = num === undefined ? this.state.startPage : num;
        axios.get('/items', {
            params: {
                categoryNo: categoryNo,
                pageNum: pageNum,
                pageSize: this.state.pageSize
            }
        })
        .then(response => {
            this.setState({
                ...this.state,
                itemList: response.data.result,
                itemSeparate: this.separateItemList(response.data.result),
                itemCount: response.data.count,
                currentPage: response.data.pagination.curPage
            });
        })
    }

    // Grid.Row 태그별로 상품 분리
    separateItemList = (itemList) => {
        let itemListOne = [];
        let itemListTwo = [];
        let itemListThree = [];

        itemList.forEach( (item, index) => {
            if(Math.floor(index / 3) === 0) {
                itemListOne.push(item);
            } else if(Math.floor(index / 3) === 1){
                itemListTwo.push(item);
            } else {
                itemListThree.push(item);
            }
        })

        let itemSeparate = {
            itemListOne: itemListOne,
            itemListTwo: itemListTwo,
            itemListThree: itemListThree
        }

        return itemSeparate;
    }

    handlePage = (e, data) => {
        this.getItems(undefined, data.activePage);
    }

    componentDidMount() {
        this.getItems();
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        const { match } = this.props;
        const prevCategoryNo = match.params.categoryNo;
        const nextCategoryNo = nextProps.match.params.categoryNo;

        if(prevCategoryNo !== nextCategoryNo){
            this.getItems(nextCategoryNo);
        }
    }

    render() {
        const style = {
            container: {
                marginTop: '3em',
                marginBottom: '2em',
                minHeight: '520px'
            },
            textArea: {
                minHeight: 100
            },
            label: {
                fontSize: '1.4rem'
            },
            header: {
                marginBottom: '1.3em'
            },
            image: {
                width: '200px',
                height: '200px',
                resizeMode: 'contain'
            },
            backgroundImage: {
                height: '200px',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            },
            itemDescription: {
                wordBreak: 'break-all'
            }
        }

        // 상품에 따른 Grid.Column 컴포넌트
        const GridColumn = ({item}) => {
            return (
                <Grid.Column>
                    <Item.Group>
                        <Item>
                            <Image width={200} height={200} src={item.imagePath} />
                            <Item.Content>
                                <Item.Header as='a'>{item.itemName}</Item.Header>
                                <Item.Meta>
                                    <span className='price'>{item.itemPrice}원</span>
                                </Item.Meta>
                                <Item.Description style={style.itemDescription}>
                                    <p>{item.itemInformation}</p>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
            );
        }

        return (
            <Container style={style.container}>
                <Header as='h1' style={style.header} >
                    <Icon name='shop' />
                    <Header.Content>
                        상품
                    </Header.Content>
                </Header>


                <Grid columns={3} divided='vertically'>
                    <Grid.Row stretched>
                        {this.state.itemSeparate.itemListOne.map( (item, index) => { return <GridColumn item={item} key={index}/> })}
                    </Grid.Row>

                    <Grid.Row stretched>
                        {this.state.itemSeparate.itemListTwo.map( (item, index) => { return <GridColumn item={item} key={index}/> })}
                    </Grid.Row>

                    <Grid.Row stretched>
                        {this.state.itemSeparate.itemListThree.map( (item, index) => { return <GridColumn item={item} key={index}/> })}
                    </Grid.Row>
                </Grid>

                <Grid centered>
                    <Pagination 
                        defaultActivePage={1} 
                        totalPages={Math.ceil(this.state.itemCount / this.state.pageSize)} 
                        onPageChange={this.handlePage}
                    />
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, null)(injectIntl(ItemPage));