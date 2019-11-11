import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
import fcbar from '../../../image/fcbar.jpg';
import SimpleReactValidator from 'simple-react-validator';

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
    },
    inputBar: {
        width: '1rem'
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

//주소 선택후 뿌려주고 상세주소 입력
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

//주소 검색후 주소 입력부분
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
                    <input id='zipCode' name='zipCode' type='text' value={zipCode} onBlur={ () => props.validator.showMessageFor('zipCode') } readOnly/>
                    <Checkmessage message={props.validator.message('zipCode', zipCode, 'required|numeric')}/>
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

// validator 확인후 오류 메시지 출력부분
const Checkmessage = (props) =>{
    console.log(props)
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

class PersonalInput extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            validators: {
                //krString - 이름입력 확인
                krString: {
                message: '한글 또는 영문을 입력해주세요.',
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val,/^[ㄱ-ㅎㅏ-ㅣ가-힣A-Z]*$/i)
                },
                required: true
                },
                //password - 비밀번호 확인
                password: {
                    message: '패스워드는 숫자,특수문자,대문자,소문자를 포함해야합니다.최대15자 최소8자 이상이여야합니다.',
                    rule: (val, params, validator) => {
                        return validator.helpers.testRegex(val,/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/g)
                    },
                    required: true
                    },
            },
            messages: {
                email: '이메일을 확인해주세요.',
                id: '아이디를 확인해주세요.',
                required: '필수입력란 입니다.',
                alpha_num: 'ID는 문자와 숫자 만 포함 할 수 있습니다.',
            },
        })

        this.state = {
            id: "",
            password: "",
            name: "",
            phone: "",
            mail: "",
            zipCode: "",
            address: "",
            open: false,

            fetch:"http://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=devU01TX0FVVEgyMDE5MTAyNTE1NDgyODEwOTEzOTk=&countPerPage=10&resultType=json",
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

            buttencheck: false,

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

    submitForm = () => {
        if (this.validator.allValid()) {
            //alert('회원가입이 완료되었습니다. 로그인해주세요.');
            this.check();
            window.location.assign('/');
        } else {
            //alert('정보가 입력되지 않았거나 필수요소가 충족되지 않았습니다.');
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    buttencheck = () => {
        this.setState({
            ...this.state,
            buttencheck : true
        })
    }

    render() {
        const { open } = this.state;
        return (
            <div className="container">
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
                                        <input id='id' name='id' type='text' onChange={this.handleOnChange} onBlur={() => this.validator.showMessageFor('id')}/>
                                        <Checkmessage message={this.validator.message('id', this.state.id, 'required|alpha_num')}/>
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Field width={16} required>
                                        <label htmlFor='password'>비밀번호</label>
                                        <input id='password' name='password' type='password' onChange={this.handleOnChange} onBlur={() => this.validator.showMessageFor('password')}/>
                                        <Checkmessage message={this.validator.message('password', this.state.password, 'required|password')}/>
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Field width={16} required>
                                        <label htmlFor='mail'>이메일</label>
                                        <input id='mail' name='mail' type='text' onChange={this.handleOnChange} onBlur={() => this.validator.showMessageFor('email')}/>
                                        <Checkmessage message={this.validator.message('email', this.state.mail, 'required|email')}/>
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Field width={16} required >
                                        <label htmlFor='name'>이름</label>
                                        <input id='name' name='name' type='text' onChange={ this.handleOnChange } onBlur={ () => this.validator.showMessageFor('name') }/>
                                        <Checkmessage message={this.validator.message('name', this.state.name, 'required|krString')}/>
                                    </Form.Field>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Field width={16} required >
                                        <label htmlFor='phone'>전화번호</label>
                                        <input id='phone' name='phone' type='text' onChange={ this.handleOnChange }/>
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group >
                                    <Form.Field width={16} required >
                                        <Button color='green' size='medium' onClick={this.modalopen}>주소검색</Button>
                                        <Modal open={open} onClose={this.modalclose}>
                                            <Modal.Header>주소 검색</Modal.Header>
                                            <Modal.Content>
                                                검색어 : <input id='keywordset' name='keywordset' type='text' onChange={ this.handleOnChange }/>
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
                                <CheckAdd validator={ this.validator }clickZipcode={ this.state.clickZipcode } clickAdd={ this.state.clickAdd } detailAdd={ this.state.detailAdd } addressSet={ this.addressSet } handleOnChange={ this.handleOnChange } />
                                </Form>
                                <Divider />
                                <Link to="/signup"><Button color='green' size='medium' onClick={ this.submitForm }>계정 만들기</Button></Link>
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
export default PersonalInput;