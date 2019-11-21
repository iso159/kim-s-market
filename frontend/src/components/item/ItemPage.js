import React, {Component} from 'react'
import {
    Header,
    Container,
    Icon,
    Grid,
    Item,
    Image,
    Pagination,
    Input,
    Modal,
    Dimmer,
    Loader,
    Segment
  } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import { signOut } from '../../store/actions/authActions';

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

const Checkmessage = (props) =>{
    if(props.message === undefined){
    }else{
        return(
            <div className="ui red pointing basic label">{props.message}</div>
        );
    }
    return(
        <div></div>
    );
}

// 상품 컴포넌트
const GridColumn = (props) => {
    const {item, intl, handleOnChange, cartCount, addToCart, validator} = props;
    
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

            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Input
                            id={ String(item.itemNo) }
                            action={{
                                color: 'teal',
                                labelPosition: 'right',
                                icon: 'cart',
                                content: intl.formatMessage({ id: 'button.cart' }),
                                onClick: () => {
                                    addToCart(item, cartCount);
                                }
                            }}
                            onChange={ handleOnChange }
                            value={ cartCount === undefined ? 0 : cartCount }
                        />
                        <Checkmessage message={validator.message(String(item.itemNo), cartCount , 'required|integer')}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Grid.Column>
    );
}

const ModalKinds = (props) => {
    const { open, stockLimit, handleModalClose, modalOption } = props;
    if(modalOption === 'stock') {
        return (
            <Modal
                onClose={ handleModalClose }
                open={ open }
            >
                <Header icon='boxes' content='상품 재고 부족' />
                <Modal.Content>
                    <h3>상품 재고가 {stockLimit}개 남아있습니다.</h3>
                </Modal.Content>
            </Modal>
        )
    } else if(modalOption === 'authority') {
        return (
            <Modal
                onClose={ handleModalClose }
                open={ open }
            >
                <Header icon='user' content='접근 불가 권한' />
                <Modal.Content>
                    <h3>로그인한 '사용자'만 장바구니 담기를 사용할 수 있습니다.</h3>
                </Modal.Content>
            </Modal>
        )
    } else if(modalOption === 'success') {
        return (
            <Modal
                onClose={ handleModalClose }
                open={ open }
            >
                <Header icon='cart' content='장바구니' />
                <Modal.Content>
                    <h3>상품이 장바구니에 담겼습니다.</h3>
                </Modal.Content>
            </Modal>
        )
    }

    return null;
}

class ItemPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
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
            modalOpen: false,
            stockLimit: 0,
            modalOption: '',
            isLoading: false
        }

        this.validator = new SimpleReactValidator({
            messages: {
                required: '필수입력란 입니다.',
                integer: '정수 이어야 합니다.'
            },
        })
    }

    // 상품 리스트 요청
    getItems = (nextProps, num) => {
        let searchRequest = false;
        if(nextProps === undefined){
            if(this.props.match.params.categoryNo === 'search') {
                searchRequest = true;
            }
            
        } else {
            if(nextProps.match.params.categoryNo === 'search') {
                searchRequest = true
            }
        }
        var pageNum = num === undefined ? this.state.startPage : num;

        if(searchRequest) {
            let search = nextProps === undefined ? this.props.location.search : nextProps.location.search;
            let params = new URLSearchParams(search);
            let keyWord = params.get('keyWord');

            axios.get('/items/search', {
                params: {
                    keyWord: keyWord,
                    pageNum: pageNum,
                    pageSize: this.state.pageSize
                }
            })
            .then(response => {
                this.setState({
                    ...this.state,
                    itemList: response.data.result,
                    itemSeparate: this.separateItemList(response.data.result),
                    itemCount: response.data.pagination.listCnt,
                    currentPage: response.data.pagination.curPage
                });
            })
            .catch(err => {
                alert(err);
            })

        } else {
            let categoryNo = nextProps === undefined ? this.props.match.params.categoryNo : nextProps.match.params.categoryNo

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
                    itemCount: response.data.pagination.listCnt,
                    currentPage: response.data.pagination.curPage
                });
            })
            .catch(err => {
                alert(err);
            })
        }
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
    
    addToCart = (item, cartCount) => {
        if(this.validator.fieldValid(String(item.itemNo))){
            // 상품 재고량 체크
            if(item.stock < cartCount) {
                this.setState({
                    modalOpen: true,
                    modalOption: 'stock',
                    stockLimit: item.stock
                })
            } else if(this.props.auth.authority !== 'USER'){
                this.setState({
                    modalOpen: true,
                    modalOption: 'authority'
                })
            } else {
                axios.post('/carts', {
                    requestData: {
                        itemNo : item.itemNo,
                        count : cartCount,
                        memberId : this.props.auth.memberId
                    }
                })
                .then( response => {
                    this.setState({
                        modalOpen: true,
                        modalOption: 'success'
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

            this.validator.hideMessageFor(String(item.itemNo));
        } else {
            this.validator.showMessageFor(String(item.itemNo));
            this.forceUpdate();
        }
    }

    handlePage = (e, data) => {
        this.getItems(undefined, data.activePage);
    }

    handleModalClose = () => {
        this.setState({
            ...this.state,
            modalOpen: false,
            modalOption: '',
            stockLimit: 0
        })
    }

    componentDidMount() {
        this.getItems();
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        const { match } = this.props;
        const { location } = this.props;

        const prevCategoryNo = match.params.categoryNo;
        const nextCategoryNo = nextProps.match.params.categoryNo;

        const prevKeyWord = location.search;
        const nextKeyWord = nextProps.location.search;

        if(prevKeyWord !== nextKeyWord || prevCategoryNo !== nextCategoryNo) {
            this.getItems(nextProps);
        }
    }

    handleOnChange = e => {
        this.validator.showMessageFor(String(e.target.id))
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    }

    render() {
        const {intl} = this.props
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
                        {this.state.itemSeparate.itemListOne.map( (item, index) => { 
                            return ( 
                                <GridColumn 
                                    item={ item } 
                                    key={ index } 
                                    intl={ intl }
                                    handleOnChange={ this.handleOnChange }
                                    cartCount={ this.state[item.itemNo] }
                                    addToCart={ this.addToCart }
                                    validator={ this.validator }
                                /> 
                            )
                        })}
                    </Grid.Row>

                    <Grid.Row stretched>
                        {this.state.itemSeparate.itemListTwo.map( (item, index) => { 
                            return ( 
                                <GridColumn 
                                    item={ item } 
                                    key={ index } 
                                    intl={ intl }
                                    handleOnChange={ this.handleOnChange }
                                    cartCount={ this.state[item.itemNo] }
                                    addToCart={ this.addToCart }
                                    validator={ this.validator }
                                /> 
                            )
                        })}
                    </Grid.Row>

                    <Grid.Row stretched>
                        {this.state.itemSeparate.itemListThree.map( (item, index) => { 
                            return ( 
                                <GridColumn 
                                    item={ item } 
                                    key={ index } 
                                    intl={ intl }
                                    handleOnChange={ this.handleOnChange }
                                    cartCount={ this.state[item.itemNo] }
                                    addToCart={ this.addToCart }
                                    validator={ this.validator }
                                /> 
                            )
                        })}
                    </Grid.Row>
                </Grid>

                <Grid centered>
                    <Pagination 
                        defaultActivePage={1} 
                        totalPages={ Math.ceil(this.state.itemCount / this.state.pageSize) } 
                        onPageChange={ this.handlePage }
                    />
                </Grid>

                <ModalKinds 
                    open={ this.state.modalOpen } 
                    stockLimit={ this.state.stockLimit } 
                    handleModalClose={ this.handleModalClose }
                    modalOption={ this.state.modalOption }
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        loader: state.loader
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ItemPage));