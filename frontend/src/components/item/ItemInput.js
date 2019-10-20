import React, { Component } from 'react';
import {
    Header,
    Form,
    Input,
    TextArea,
    Label,
    Select,
    Container,
    Grid,
    Icon,
    Button,
    Message
  } from 'semantic-ui-react';
import axios from 'axios';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

const initialState = {
    selectMainCategory: {},
    selectSubCategory: {},
    itemName: '',
    itemInfo: '',
    itemPrice: '',
    stock: '',
    file: null
};

class ItemInput extends Component {
    constructor(props) {
        super(props);
        const {intl} = this.props;
    }
    fileInputRef = React.createRef();

    state = {
        mainCategories: [],
        subCategories: [],
        subCategoriesDisplay: false,
        selectMainCategory: {},
        selectSubCategory: {},
        itemName: '',
        itemInfo: '',
        itemPrice: '',
        stock: '',
        file: null,
        itemInputSuccessFlag: '',
        messageVisible: false
    }

    handleOnChange = e => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    }

    getCategories = () => {
        axios.get('/categories')
        .then(response => {
            let mainCategories = [];
            let subCategories = [];
            response.data.forEach( (category) => {
                if(category.categoryParents === 0) {
                    mainCategories.push(category);
                } else {
                    subCategories.push(category);
                }
            });
            
            this.setState({
                ...this.state,
                mainCategories,
                subCategories
            });
        })
        .catch(error => {

        })
    }

    componentDidMount (){
        this.getCategories();
    }

    categoryOnChange = (e, data) => {
        e.preventDefault();
        const { value } = data;
        const { key } = data.options.find(options => options.value === value);

        let categoryFlag = data.id;
        if(categoryFlag === 'select_main_category') {
            this.setState({
                ...this.state,
                selectMainCategory: data.options[key],
                selectSubCategory: {},
                subCategoriesDisplay: true
            })
        } else if(categoryFlag === 'select_sub_category') {
            this.setState({
                ...this.state,
                selectSubCategory: data.options[key]
            })
        }
    }

    fileChange = e => {
        if(e.target.files.length !== 0){
            this.setState({ 
                ...this.state,
                file: e.target.files[0] 
            });
        }
    };

    fileClick = e => {
        this.setState({ 
            ...this.state,
            file: null
        });
    };

    handleOnSubmit = e => {
        e.preventDefault();
        let data = {
            categoryNo: this.state.selectSubCategory.value,
            itemName: this.state.itemName,
            itemPrice: this.state.itemPrice,
            stock: this.state.stock,
            itemInformation: this.state.itemInfo,
            registrar: this.props.auth.memberId
        }

        let test = new FormData();
        test.append('file', this.state.file);
        test.append('item', JSON.stringify(data));

        axios({
            method: 'post',
            url: '/items',
            data: test
        })
        .then(res => {
            this.setState({
                ...initialState,
                itemInputSuccessFlag: true,
                messageVisible: true
            })
        })
        .catch(err => {
            this.setState({
                itemInputSuccessFlag: false,
                messageVisible: true
            })
        })
    }

    handleDismiss = () => {
        this.setState({ messageVisible: false })
    }

    mainCategories = () => {
        let {intl} = this.props;
        let mainCategories = [];
        this.state.mainCategories.some( (category, index) => {
            if(this.state.mainCategories.length === 0){
                mainCategories.push({ key: index, text: intl.formatMessage({ id: 'message.category.nothing' }), value: 'n' });
                return true;
            }
            mainCategories.push({ key: index, text: category.categoryName, value: category.categoryNo });
            return false;
        })

        return mainCategories;
    }

    subCategories = () => {
        let {intl} = this.props;
        let subCategories = [];
        this.state.subCategories.some( (category, index) => {
            if(this.state.subCategoriesDisplay && this.state.selectMainCategory.value === category.categoryParents){
                subCategories.push({ key: index, text: category.categoryName, value: category.categoryNo });
                return false;
            } else if( Object.keys(this.state.selectMainCategory).length === 0 ) {
                subCategories.push({ key: index, text: intl.formatMessage({ id: 'message.category.select.one' }), value: 'n' });
                return true;
            }
        })

        if( subCategories.length === 0) {
            subCategories.push({ key: 0, text: intl.formatMessage({ id: 'message.category.nothing' }), value: 'n' });
        }
        
        return subCategories;
    }

    render (){
        const {intl} = this.props;

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
            inputButton: {
                marginTop: '5em'
            }
        }

        const ItemInputMessage = () => {
            if(this.state.itemInputSuccessFlag === true && this.state.messageVisible === true){
                return (
                    <Message 
                        positive
                        onDismiss={this.handleDismiss}
                        attached
                    >
                        <Message.Header>{ intl.formatMessage({ id: 'message.item.input.success' }) }</Message.Header>
                    </Message>
                )
            } else if(this.state.itemInputSuccessFlag === false && this.state.messageVisible === true) {
                return (
                    <Message 
                        negative
                        onDismiss={this.handleDismiss}
                    >
                        <Message.Header>{ intl.formatMessage({ id: 'message.item.input.fail' }) }</Message.Header>
                    </Message>
                )
            }
            return null;
        }

        return (
            <Container style={style.container}>
                <Header as='h1' style={style.header} >
                    <Icon name='shop' />
                    <Header.Content>
                        <FormattedMessage id="title.item.input"/>
                    </Header.Content>
                </Header>
                <Grid columns={3} divided>
                    <Grid.Row stretched>
                        <Grid.Column>
                            <Form size='small' style={style.form}>
                                <Form.Field>
                                    <label style={style.label}><FormattedMessage id="item.name"/></label>
                                    <Input 
                                        type='text' 
                                        id='itemName' 
                                        onChange={this.handleOnChange}
                                        placeholder={
                                            intl.formatMessage({ 
                                                id: 'item.name' 
                                            })
                                        }
                                        value={this.state.itemName} 
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <label style={style.label}><FormattedMessage id="item.info" /></label>
                                    <TextArea 
                                        style={style.textArea} 
                                        id='itemInfo'
                                        onChange={this.handleOnChange}
                                        placeholder={
                                            intl.formatMessage({ 
                                                id: 'item.info' 
                                            })
                                        } 
                                        value={this.state.itemInfo}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <label style={style.label}><FormattedMessage id="item.stock" /></label>
                                    <Input 
                                        labelPosition='right' 
                                        id='stock'
                                        onChange={this.handleOnChange}
                                        placeholder={
                                            intl.formatMessage({ 
                                                id: 'item.stock' 
                                            })
                                        }
                                        type='text'
                                        value={this.state.stock}
                                    >
                                        <Label basic><Icon name='box' />️</Label>
                                        <input />
                                        <Label></Label>
                                    </Input>
                                </Form.Field>

                                <Form.Field>
                                    <label style={style.label}><FormattedMessage id="item.price" /></label>
                                    <Input 
                                        labelPosition='right' 
                                        id='itemPrice'
                                        onChange={this.handleOnChange}
                                        placeholder={
                                            intl.formatMessage({ 
                                                id: 'item.price' 
                                            })
                                        }
                                        type='text'
                                        value={this.state.itemPrice}
                                    >
                                        <Label basic><Icon name='won' />️</Label>
                                        <input />
                                        <Label></Label>
                                    </Input>
                                </Form.Field>

                                <Form.Field>
                                    <Input
                                        fluid
                                        action={{
                                            color: 'black',
                                            labelPosition: 'right',
                                            icon: 'file',
                                            content: 'Image',
                                            onClick: () => this.fileInputRef.current.click()
                                        }}
                                        readOnly
                                        value={this.state.file === null ? '' : this.state.file.name}
                                    />
                                    <input
                                        ref={this.fileInputRef}
                                        type="file"
                                        hidden
                                        onClick={this.fileClick}
                                        onChange={this.fileChange}
                                    />
                                </Form.Field>

                                <Button 
                                    style={style.inputButton}
                                    color='orange' 
                                    fluid 
                                    size='large'
                                    onClick={this.handleOnSubmit}
                                >
                                    <FormattedMessage id="button.item.input" />
                                </Button>
                                <ItemInputMessage />
                            </Form>
                        </Grid.Column>

                        <Grid.Column>
                            <Form size='small' style={style.form}>
                                <Form.Field>
                                    <label style={style.label}><FormattedMessage id="item.main.categories" /></label>
                                    <Select 
                                        options={this.mainCategories()} 
                                        placeholder={
                                            intl.formatMessage({ 
                                                id: 'message.category.select' 
                                            })
                                        }
                                        onChange={ this.categoryOnChange } 
                                        id='select_main_category'
                                        value={Object.keys(this.state.selectMainCategory).length === 0 ? null : this.state.selectMainCategory.value}
                                    />
                                </Form.Field>
                            </Form>
                        </Grid.Column>

                        <Grid.Column>
                            <Form size='small' style={style.form}>
                                <Form.Field>
                                    <label style={style.label}><FormattedMessage id="item.sub.categories" /></label>
                                    <Select 
                                    options={this.subCategories()} 
                                    placeholder={
                                        intl.formatMessage({ 
                                            id: 'message.category.select' 
                                        })
                                    }
                                    onChange={ this.categoryOnChange }
                                    id="select_sub_category"
                                    value={Object.keys(this.state.selectSubCategory).length === 0 ? null : this.state.selectSubCategory.value}
                                />
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row stretched>
                    </Grid.Row>
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

export default connect(mapStateToProps, null)(injectIntl(ItemInput));