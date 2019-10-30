import React, { Component } from 'react';
import { 
    Container,
    Header,
    Icon,
    Item,
    Label,
    Button,
    Grid,
    Image,
    Pagination,
    Modal,
    Form,
    Input,
    TextArea,
    Select
 } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import axios from 'axios';
import { signOut } from '../../store/actions/authActions'
import ItemModifyModal from './ItemModifyModal'

const style = {
    container: {
        marginTop: '3em',
        marginBottom: '2em',
        minHeight: '520px'
    },
    header: {
        marginBottom: '1.3em'
    },
    itemDescription: {
        wordBreak: 'break-all'
    }
}

// 상품에 따른 Grid.Column 컴포넌트
const GridColumn = ( props ) => {
    var itemCategory = '';
    const { item, categories, clickModifyBtn } = props;

    categories.forEach( category => {
        if(category.categoryNo === item.categoryNo) {
            itemCategory = category.categoryName;
        }
    })

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
                        <Item.Extra>
                            <Label icon='list' content={itemCategory} />
                            <Label icon='boxes' content={item.stock}/>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            </Item.Group>

            <Grid columns='equal'>
                <Grid.Row>
                    <Grid.Column>
                        <Button 
                            color='teal' 
                            fluid
                            onClick={ () => {
                                clickModifyBtn(item)
                            }}
                        >
                            <FormattedMessage id='button.update' />
                            <Icon name='right chevron' />
                        </Button>
                    </Grid.Column>

                    <Grid.Column>
                        <Button color='red' fluid>
                            <FormattedMessage id='button.remove' />
                            <Icon name='right chevron' />
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Grid.Column>
    );
}


class ItemManage extends Component {

    state = {
        mainCategories: [],
        subCategories: [],
        itemList: [],
        itemSeparate: {
            itemListOne: [],
            itemListTwo: [],
            itemListThree: []
        },
        startPage: 1,
        currentPage: 1,
        pageSize: 9,
        itemCount: 0,
        modalFlag: false,
        selectModifyItem: {}
    }

    getMyItems = (num) => {
        var pageNum = num === undefined ? this.state.startPage : num;

        axios.get('/items/' + this.props.auth.memberId, {
            params: {
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
            })
        })
        .catch( error => {
            if(error.response.status === 401) {
                alert(error.response.data.body);
                this.props.signOut();
                this.props.history.push('/signin')
            }
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

    componentDidMount() {
        this.getMyItems();
    }

    handlePage = (e, data) => {
        this.getMyItems(data.activePage);
    }

    clickModifyBtn = (item) => {
        if(this.state.modalFlag) {
            this.setState({
                ...this.state,
                selectModifyItem: {},
                modalFlag: false
            }, this.getMyItems())
        } else {
            this.setState({
                ...this.state,
                selectModifyItem: item,
                itemName: item.itemName,
                itemInfo: item.itemInformation,
                itemPrice: item.itemPrice,
                stock: item.stock,
                modalFlag: true
            })
        }
    }

    render() {
        return (
            <Container style={style.container}>
                <Header as='h1' style={style.header} >
                    <Icon name='cart plus' />
                    <Header.Content>
                        <FormattedMessage id='title.item.manage' />
                    </Header.Content>
                </Header>

                <Grid columns={3} divided='vertically' celled='internally'>
                    <Grid.Row stretched>
                        {this.state.itemSeparate.itemListOne.map( (item, index) => { 
                            return (
                                <GridColumn 
                                    item={item} 
                                    key={index} 
                                    categories={this.props.category.categories}
                                    clickModifyBtn={this.clickModifyBtn}
                                /> 
                            )
                        })}
                    </Grid.Row>

                    <Grid.Row stretched>
                        {this.state.itemSeparate.itemListTwo.map( (item, index) => { 
                            return (
                                <GridColumn 
                                    item={item} 
                                    key={index} 
                                    categories={this.props.category.categories}
                                    clickModifyBtn={this.clickModifyBtn}
                                /> 
                            )
                        })}
                    </Grid.Row>

                    <Grid.Row stretched>
                        {this.state.itemSeparate.itemListThree.map( (item, index) => { 
                            return (
                                <GridColumn 
                                    item={item} 
                                    key={index} 
                                    categories={this.props.category.categories}
                                    clickModifyBtn={this.clickModifyBtn}
                                /> 
                            )
                        })}
                    </Grid.Row>
                </Grid>

                <Grid centered>
                    <Pagination 
                        defaultActivePage={1} 
                        totalPages={Math.ceil(this.state.itemCount / this.state.pageSize)} 
                        onPageChange={this.handlePage}
                    />
                </Grid>
                <ItemModifyModal 
                    handle={this.state.modalFlag} 
                    close={this.clickModifyBtn} 
                    item={this.state.selectModifyItem}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        category: state.category
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ItemManage));