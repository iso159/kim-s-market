import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {
    Container,
    Header,
    Button,
    Form,
    Segment,
    Grid,
    Divider,
    Image,
    Modal,
    Table,
    Pagination
} from 'semantic-ui-react'
import fcbar from 'image/fcbar.jpg';

const style = {
    base : {
        margin: '0.5rem',
        padding: '0.5rem'
    },
    padding: {
        padding: '1em 5em'
    },
    h2: {
        fontSize: '22px'
    }
};

const SearchAddressTableBody = (props) => {
    const common = props.common;
    const jusoList = props.jusoList;

    console.log(common);

    const jusoListRows = common.errorCode === '0' ? jusoList.map((result, index) => {
        return (
            <Table.Row key={ index }>
                <Table.Cell><a href="#nono" value={result.roadAddr} onClick={ () => props.onClickAdd(result.zipNo,result.roadAddr) }>{ result.roadAddr }</a></Table.Cell>
                <Table.Cell>{ result.zipNo }</Table.Cell>
            </Table.Row>
        );
    }) : (
        <Table.Row>
            <Table.Cell>{ common.errorMessage }</Table.Cell>
        </Table.Row>
    );

    return jusoListRows;
}

// 주소 검색 모달 테이블 컴포넌트
const SearchAddressTable = (props) => {
    const common = props.apiResults.common;
    const jusoList = props.apiResults.juso;
    console.log(common);

    return (
      <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>주소</Table.HeaderCell>
                <Table.HeaderCell>우편번호</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <SearchAddressTableBody common={ common } jusoList={ jusoList } onClickAdd={ props.onClickAdd } />
        </Table.Body>
        <Table.Footer>
        </Table.Footer>
      </Table>
    );
}

const Addressinput = (props) =>{
    const zipCode = props.clickZipcode;
    const clickAdd = props.clickAdd;
    return(
        <div>
        {zipCode ==="" ? (        
            <label></label>
        ):(
            <Form.Field width={16} required >
            <label htmlFor='clickZipcode'>우편번호 : </label>
            <input id='clickZipcode' name='clickZipcode' value={zipCode} type='text' readOnly onChange={props.handleOnChange}/>
            <label htmlFor='clickAdd'>도로명 주소 : </label>
            <input id='clickAdd' name='clickAdd' value={clickAdd} type='text' readOnly onChange={props.handleOnChange}/>
            <label htmlFor='detailAdd'>상세주소 : </label>
            <input id='detailAdd' name='detailAdd' type='text' onChange={props.handleOnChange}/>
            </Form.Field>
        )}
        </div>
    );
}

const CheckAdd = (props) =>{
    const zipCode = props.clickZipcode;
    const address = props.clickAdd + props.detailAdd;

    return(
        <div>
        {address === "" ? (
            <a></a>
        ):(
            <Form>
            <Form.Group >
                <Form.Field width={16} required >
                <label htmlFor='zipCode'>우편번호 </label>
                <input id='zipCode' name='zipCode' type='text' value={zipCode} readOnly/>
                </Form.Field>
            </Form.Group>
            <Form.Group >
                <Form.Field width={16} required >
                    <label htmlFor='address'>주소</label>
                    <input id='address' name='address' type='text' value={address} readOnly/>
                </Form.Field>
            </Form.Group>
            </Form>
        )}
        </div>
    );
}

class PersonalInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            password: "",
            name: "",
            phone: "",
            mail: "",
            zipCode: "",
            address: "",
            open: false,

            fetch:"http://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=devU01TX0FVVEgyMDE5MDkyMzEyNTYyNjEwOTA0Mjg=&countPerPage=10&resultType=json",
            currentPage:"&currentPage=",
            activePage: 1,
            keyword: "&keyword=",
            keywordset: "",
            totalPages: 0,

            apiResults: {
                common: {},
                juso: []
            },

            clickAdd : "",
            clickZipcode : "",
            detailAdd: "",

        };
    }

    addressSet = () =>{
        this.setState({
            ...this.state,
            zipCode : this.state.clickZipcode,
            address : this.state.clickAdd+this.state.detailAdd
        })
        this.modalclose()
    }

    onClickAdd = (clickZipcode,clickAdd) => {
        this.setState({
            ...this.state,
            clickZipcode : clickZipcode,
            clickAdd : clickAdd
        })
        
    }

    handlePaginationChange = (e, { activePage }) => {
        this.callApi(activePage);
    }

    modalopen = () => this.setState({ open: true });
    modalclose = () => this.setState({ open: false });

    handleOnChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    check = () => {
        console.log('check');

        axios({
            url: '/member/join',
            method: 'post',
            data: {
                requestData : {
                    memberId : this.state.id,
                    password : this.state.password,
                    name : this.state.name,
                    phone : this.state.phone,
                    mail : this.state.mail,
                    zipCode : this.state.zipCode,
                    address : this.state.address,
                }
            }
        })
    }

    callApi = (activePage) => {
        console.log(this.state.fetch + this.state.currentPage + this.state.activePage + this.state.keyword + this.state.keywordset);

        fetch(this.state.fetch +
            this.state.currentPage +
            activePage +
            this.state.keyword +
            this.state.keywordset
        )
        .then(res => res.json())
        .then(json => {
            console.log(json);
            
            this.setState({
                ...this.state,
                apiResults: json.results
            })
            let totalCount = this.state.apiResults.common.totalCount;
            let listcount = 10;
            let totalpage = totalCount / listcount;
            if(totalCount % listcount >0){
                totalpage++;
            }
            this.setState({
                totalPages : Math.floor(totalpage)
            })
        })
      }

    render() {
        const { open } = this.state;

        return (
            <div>
                <Container style={style.padding}>
                    <p style={style.h2}>계정 생성하기</p>
                </Container>
                <Container style={style.padding}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Form size='small'>

                                <Form.Group>
                                        <Form.Field width={16} required>
                                            <label htmlFor='id'>아이디</label>
                                            <input id='id' name='id' type='text' onChange={this.handleOnChange}/>
                                        </Form.Field>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Field width={16} required>
                                            <label htmlFor='password'>비밀번호</label>
                                            <input id='password' name='password' type='password' onChange={this.handleOnChange}/>
                                        </Form.Field>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Field width={16} required>
                                            <label htmlFor='mail'>이메일</label>
                                            <input id='mail' name='mail' type='text' onChange={this.handleOnChange}/>
                                        </Form.Field>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Field width={16} required >
                                            <label htmlFor='name'>이름</label>
                                            <input id='name' name='name' type='text' onChange={this.handleOnChange}/>
                                        </Form.Field>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Field width={16} required >
                                            <label htmlFor='phone'>전화번호</label>
                                            <input id='phone' name='phone' type='text' onChange={this.handleOnChange}/>
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Field width={16} required >
                                            <Button color='green' size='medium' onClick={this.modalopen}>주소검색</Button>
                                            <Modal open={open} onClose={this.modalclose}>
                                                <Modal.Header>주소 검색</Modal.Header>
                                                <Modal.Content>
                                                    검색어 : <input id='keywordset' name='keywordset' type='text' onChange={this.handleOnChange}/>
                                                    <Button color='blue' size='medium' onClick={ () => { this.callApi(1) } }>검색</Button>
                                                    <Addressinput clickZipcode={ this.state.clickZipcode } clickAdd={ this.state.clickAdd } handleOnChange={ this.handleOnChange }/>
                                                    <SearchAddressTable apiResults={ this.state.apiResults } onClickAdd={ this.onClickAdd}/>
                                                    <Pagination defaultActivePage={ this.state.activePage } totalPages={ this.state.totalPages } onPageChange={ this.handlePaginationChange } />
                                                </Modal.Content>
                                                <Modal.Actions>
                                                <Button color='green' onClick={ this.addressSet }>완료</Button>
                                                <Button negative onClick={ this.modalclose }>닫기</Button>
                                                </Modal.Actions>
                                            </Modal>
                                        </Form.Field>
                                    </Form.Group>
                                <CheckAdd clickZipcode={ this.state.clickZipcode } clickAdd={this.state.clickAdd} detailAdd={this.state.detailAdd} addressSet={this.addressSet} handleOnChange={this.handleOnChange} />
                                </Form>
                                <Divider />
                                <Link to='/'><Button color='green' size='medium' onClick={ this.check }>계정 만들기</Button></Link>
                            </Grid.Column>
                            

                            <Grid.Column floated='right' width={6}>
                                <Segment>
                                    <Header>Kim's Market에 오신 것을 환영합니다 !</Header>
                                    <Divider/>
                                    <Image src={fcbar} bordered />
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}

export default PersonalInput;