import React,{ Component } from "react";
import { 
    Icon,
    Label,
    Button,
    Grid,
    Image,
    Modal,
    Form,
    Input,
    TextArea,
    Select,
    Message
 } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import axios from 'axios';

const initialState = {
    selectMainCategory: {},
    selectSubCategory: {},
    itemNo: '',
    itemName: '',
    itemInfo: '',
    itemPrice: '',
    stock: '',
    file: null,
    itemModifyFailFlag: false
};

const ItemModifyFailMessage = (props) => {
    const { itemModifyFailFlag, handleDismiss, intl } = props;
    if(itemModifyFailFlag){
        return (
            <Message 
                negative
                onDismiss={handleDismiss}
            >
                <Message.Header>{ intl.formatMessage({ id: 'message.item.input.fail' }) }</Message.Header>
            </Message>  
        );
    } else {
        return null;
    }
}

class ItemModifyModal extends Component {

    fileInputRef = React.createRef();

    state= {
        parentCategory: {},
        childCategory: {},
        selectMainCategory: {},
        selectSubCategory: {},
        itemNo: '',
        itemName: '',
        itemPrice: '',
        stock: '',
        itemInfo: '',
        file: null,
        itemModifyFailFlag: false
    }

    handleDismiss = () => {
        this.setState({ itemModifyFailFlag: false })
    }

    handleOnChange = e => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    }

    mainCategories = () => {
        let {intl} = this.props;
        let mainCategories = [];

        this.props.category.categories.some( (category, index) => {
            if(this.props.category.categories.length === 0){
                mainCategories.push({ key: index, text: intl.formatMessage({ id: 'message.category.nothing' }), value: 'n' });
                return true;
            } else if(category.categoryParents === 0) {
                mainCategories.push({ key: index, text: category.categoryName, value: category.categoryNo });
                return false;
            }
            return false;
        })

        return mainCategories;
    }

    subCategories = () => {
        let {intl} = this.props;
        let subCategories = [];

        this.props.category.categories.some( (category, index) => {
            if(this.state.selectMainCategory.value === category.categoryParents){
                subCategories.push({ key: index, text: category.categoryName, value: category.categoryNo });
                return false;
            } else if(Object.keys(this.state.selectMainCategory).length === 0 && this.state.parentCategory.categoryNo === category.categoryParents){
                subCategories.push({ key: index, text: category.categoryName, value: category.categoryNo });
                return false;
            } else if(Object.keys(this.state.selectMainCategory).length === 0 && 
                      subCategories.length === 0 && this.props.category.categories.length === index+1) {
                subCategories.push({ key: index, text: intl.formatMessage({ id: 'message.category.select.one' }), value: 'n' });
                return true;
            } else {
                return false;
            }
        })

        if( subCategories.length === 0) {
            subCategories.push({ key: 0, text: intl.formatMessage({ id: 'message.category.nothing' }), value: 'n' });
        }
        
        return subCategories;
    }

    handleOnChange = e => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    }

    categoryOnChange = (e, data) => {
        e.preventDefault();
        const { value } = data;
        const { key } = data.options.find(options => options.value === value);

        let categoryFlag = data.id;
        let changeCategory = {}

        data.options.some( data => {
            if(data.key === key) {
                changeCategory = data;
                return true;
            } else {
                return false;
            }
        })

        if(categoryFlag === 'select_main_category') {
            this.setState({
                ...this.state,
                selectMainCategory: changeCategory,
                selectSubCategory: {}
            })
        } else if(categoryFlag === 'select_sub_category') {
            this.setState({
                ...this.state,
                selectSubCategory: changeCategory
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

    fileClick = () => {
        this.setState({ 
            ...this.state,
            file: null
        });
    };

    handleOnSubmit = e => {
        e.preventDefault();
        let categoryNo = this.state.selectSubCategory.value !== undefined ? this.state.selectSubCategory.value : this.state.childCategory.categoryNo;
        let data = {
            categoryNo: categoryNo,
            itemName: this.state.itemName,
            itemPrice: this.state.itemPrice,
            stock: this.state.stock,
            itemInformation: this.state.itemInfo,
            itemUpdator: this.props.auth.memberId
        }

        let item = new FormData();
        item.append('file', this.state.file);
        item.append('item', JSON.stringify(data));
        
        axios({
            method: 'put',
            url: '/items/' + this.state.itemNo,
            data: item
        })
        .then(response => {
            this.setState({
                ...initialState
            },this.props.close())
        })
        .catch(error => {
            if(error.response.status === 401) {
                alert(error.response.data.body);
                this.props.close();
                this.props.signOut();
                this.props.history.push('/signin')
            }else {
                this.setState({
                    ...this.state,
                    itemModifyFailFlag: true
                })
            }
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { item } = nextProps;
        let parentCategory = '';
        let childCategory = '';

        this.props.category.categories.some( (category) => {
            if(category.categoryNo === item.categoryNo) {
                childCategory = category;
                return true;
            }
            return false;
        })

        this.props.category.categories.some( (category) => {
            if(category.categoryNo === childCategory.categoryParents) {
                parentCategory = category;
                return true;
            }
            return false;
        })

        this.setState({
            selectMainCategory: {},
            selectSubCategory: {},
            parentCategory: parentCategory,
            childCategory: childCategory,
            itemNo: item.itemNo,
            itemName: item.itemName,
            itemPrice: item.itemPrice,
            stock: item.stock,
            itemInfo: item.itemInformation
        })
    }

    render() {
        const {intl} = this.props;

        const style = {
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
            },
            modalDescription: {
                width: '500px'
            }
        }

        const { item, 
                handle, 
                close
        } = this.props;

        return (
            <Modal
                open={handle}
                onClose={close}
                centered={false}
            >
            <Modal.Header>{this.state.parentCategory.categoryName} > {this.state.childCategory.categoryName}</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src={item.imagePath} />
                    <Modal.Description style={style.modalDescription}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form size='small'>
                                        <Form.Field>
                                            <label style={style.label}><FormattedMessage id="item.name"/></label>
                                            <Input 
                                                type='text' 
                                                id='itemName' 
                                                value={this.state.itemName} 
                                                onChange={this.handleOnChange}
                                            />
                                        </Form.Field>

                                        <Form.Field>
                                            <label style={style.label}><FormattedMessage id="item.info" /></label>
                                            <TextArea 
                                                style={style.textArea} 
                                                id='itemInfo'
                                                value={this.state.itemInfo}
                                                onChange={this.handleOnChange}
                                            />
                                        </Form.Field>

                                        <Grid columns={2}>
                                            <Grid.Row>
                                                <Grid.Column>
                                                    <Form.Field>
                                                        <label style={style.label}><FormattedMessage id="item.stock" /></label>
                                                        <Input 
                                                            labelPosition='right' 
                                                            id='stock'
                                                            type='text'
                                                            value={this.state.stock}
                                                            onChange={this.handleOnChange}
                                                        >
                                                            <Label basic><Icon name='box' />️</Label>
                                                            <input />
                                                            <Label></Label>
                                                        </Input>
                                                    </Form.Field>
                                                </Grid.Column>

                                                <Grid.Column>
                                                    <Form.Field>
                                                        <label style={style.label}><FormattedMessage id="item.price" /></label>
                                                        <Input 
                                                            labelPosition='right' 
                                                            id='itemPrice'
                                                            type='text'
                                                            value={this.state.itemPrice}
                                                            onChange={this.handleOnChange}
                                                        >
                                                            <Label basic><Icon name='won' />️</Label>
                                                            <input />
                                                            <Label></Label>
                                                        </Input>
                                                    </Form.Field>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>

                                        <Form.Field>
                                            <label style={style.label}><FormattedMessage id="item.main.categories" /></label>
                                            <Select 
                                                options={this.mainCategories()} 
                                                defaultValue={this.state.parentCategory.categoryNo}
                                                id='select_main_category'
                                                onChange={ this.categoryOnChange } 
                                            />
                                        </Form.Field>

                                        <Form.Field>
                                            <label style={style.label}><FormattedMessage id="item.sub.categories" /></label>
                                            <Select 
                                                options={this.subCategories()} 
                                                id="select_sub_category"
                                                defaultValue={this.state.childCategory.categoryNo}
                                                onChange={ this.categoryOnChange } 
                                            />
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
                                                ref={ this.fileInputRef }
                                                type="file"
                                                hidden
                                                onClick={ this.fileClick }
                                                onChange={ this.fileChange }
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
                                        <ItemModifyFailMessage 
                                            itemModifyFailFlag={ this.state.itemModifyFailFlag } 
                                            handleDismiss={ this.handleDismiss } 
                                            intl={intl}
                                        />
                                    </Form>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        category: state.category
    };
};

export default connect(mapStateToProps, null)(injectIntl(ItemModifyModal));