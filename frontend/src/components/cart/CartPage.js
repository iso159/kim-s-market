import React, {Component} from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { 
    Container,
    Header,
    Icon,
    Image,
    Table,
    Button,
    Input
 } from 'semantic-ui-react';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';


 const style = {
    header: {
        marginBottom: '1.3em'
    },
    cartItem: {
        width: '50px',
        height: '50px'
    },
    totalSum: {
        backgroundColor: '#454545',
        fontWeight: 'bold',
        fontSize: '19px',
        color: 'white',
        fontFamily: '돋움'
    },
    totalSum2: {
        backgroundColor: '#333333',
        fontWeight: 'bold',
        fontSize: '15px',
        color: 'white',
        fontFamily: '돋움'
    }
}

const Checkmessage = (props) => {
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

const TotalSum = (props) => {
    const { totalPrice } = props;
    return (
        <Table.Footer>
            <Table.Row textAlign='center'>
                <Table.HeaderCell colSpan='4' style={ style.totalSum2 }>
                    { totalPrice }원
                </Table.HeaderCell>

                <Table.HeaderCell collapsing style={{padding: '0px'}}>
                    <Button color='blue' size='big' floated='left' fluid>
                        <FormattedMessage id='button.order' />
                    </Button>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    );
}

const CartItem = (props) => {
    const { cart, handleOnChange, validator, cartCount } = props;
    return (
        <Table.Row>
            <Table.Cell>
                <Header as='h4'>
                    <Image style={style.cartItem} src={cart === undefined ? null : cart.item.imagePath} />
                    <Header.Content>
                        {cart === undefined ? null : cart.item.itemName}
                    </Header.Content>
                </Header>
            </Table.Cell>

            <Table.Cell>
                {cart === undefined ? null : cart.item.itemPrice}원
            </Table.Cell>
            
            <Table.Cell>
                <Input
                    id={ String(cart.item.itemNo) }
                    onChange={ handleOnChange }
                    value={ cartCount }
                />개
                <br />
                <Checkmessage message={validator.message(String(cart.item.itemNo), cartCount , 'required|integer')}/>
            </Table.Cell>

            <Table.Cell>
                {cart === undefined ? null : cart.count * cart.item.itemPrice}원
            </Table.Cell>

            <Table.Cell>
                <Button color='green' size='small'><FormattedMessage id='button.change'/></Button>
                <br />
                <Button color='red' size='small'><FormattedMessage id='button.remove'/></Button>
            </Table.Cell>
        </Table.Row>
    ); 
}

class CartPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            cart: [],
            totalPrice: 0
        }

        this.validator = new SimpleReactValidator({
            messages: {
                required: '필수입력란 입니다.',
                integer: '정수 이어야 합니다.'
            },
        })
    }

    getCart = () => {
        axios.get('/carts/' + this.props.auth.memberId, {

        })
        .then( response => {
            let totalPrice = this.cartTotalPrice(response.data.result);

            this.setState({
                ...this.state,
                cart: response.data.result,
                totalPrice: totalPrice
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

    // 장바구니 상품 총 가격
    cartTotalPrice = (cartList) => {
        let totalCount = 0;

        cartList.forEach( (cart) => {
            totalCount += cart.count * cart.item.itemPrice;
        })

        return totalCount;
    }

    handleOnChange = e => {
        console.log(e.target.id);
        this.validator.showMessageFor(String(e.target.id))
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    }

    componentDidMount() {
        this.getCart();
    }

    render() {
        return (
            <Container>
                <Header as='h1' style={style.header} >
                    <Icon name='cart' />
                    <Header.Content>
                        장바구니
                    </Header.Content>
                </Header>

                <Table color='yellow' celled padded fixed verticalAlign='middle'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <FormattedMessage id='item.info'/>
                            </Table.HeaderCell>

                            <Table.HeaderCell>
                                <FormattedMessage id='item.price'/>
                            </Table.HeaderCell>

                            <Table.HeaderCell>
                                <FormattedMessage id='item.count'/>
                            </Table.HeaderCell>

                            <Table.HeaderCell>
                                <FormattedMessage id='item.total.price'/>
                            </Table.HeaderCell>

                            <Table.HeaderCell>
                                <FormattedMessage id='button.select'/>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.cart.map( (cart, index) => {
                            let cartCount = this.state[cart.item.itemNo] === undefined ? cart.item.itemNo : this.state[cart.item.itemNo];
                            return (
                                <CartItem 
                                    cart={ cart } 
                                    key={ index } 
                                    handleOnChange={ this.handleOnChange } 
                                    cartCount={ cartCount }
                                    validator={ this.validator }
                                />
                            );
                        })}
                    </Table.Body>

                    <TotalSum totalPrice={ this.state.totalPrice }/>
                    
                </Table>
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CartPage));