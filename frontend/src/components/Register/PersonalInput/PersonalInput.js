import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Container,
    Button,
    Form,
    Grid,
    Divider,
    Modal,
    Table,
    Pagination,
    Input,
    Icon,
    Message,
    Select
} from 'semantic-ui-react'
import SimpleReactValidator from 'simple-react-validator';

const style = {
    base : {
        margin: '0.5rem',
        padding: '0.5rem'
    },
    padding: {
        padding: '2% 16%'
    },

    emailpadding: {
        padding: '1% 0%'
    },
    validator: {
        marginTop:'0em'
    },
    modal:{
        textAlign:'center'
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
    const jusoListRows = common.errorCode === '0' ? jusoList.map((result, index) => {
        return (
            <Table.Row key={ index }>
                <Table.Cell><Link value={result.roadAddr} onClick={ () => props.onClickAdd(result.zipNo,result.roadAddr) }>{ result.roadAddr }</Link></Table.Cell>
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

// validator 확인후 오류 메시지 출력부분
const Checkmessage = (props) =>{
    if(props.message === undefined){

    }else{
        return(
            <div className="ui red pointing basic label" style={style.validator}>{ props.message }</div>
        );
    }
    return(
        <div></div>
    );
}

// id validator 확인후 오류 메시지 출력
const IdCheckMessage = (props) => {
    if(props.checkmessage !== undefined){
        return(
            <div className="ui red pointing basic label" style={ style.validator }>{ props.checkmessage }</div>
        );
    }else if(props.message !== undefined){
        return(
            <div className="ui red pointing basic label" style={ style.validator }>{ props.message }</div>
        );
    }
    return (
        <div></div>
    )
}

//email validator 오류 메시지 출력
const EmailCheckMessage = (props) => {
    if(props.emailaddmessage !== undefined){
        return(
            <Grid columns='equal'>
                <Grid.Column>
                    <div></div>
                </Grid.Column>
                <Grid.Column>
                    <div className="ui red pointing basic label">{ props.emailaddmessage }</div>
                </Grid.Column>
                <Grid.Column>
                    <div></div>
                </Grid.Column>
            </Grid>
        );
    }else if(props.emailmessage !== undefined){
        return(
            <Grid columns='equal'>
                <Grid.Column>
                    <div className="ui red pointing basic label">{ props.emailmessage }</div>   
                </Grid.Column>
                <Grid.Column>
                    <div></div>
                </Grid.Column>
                <Grid.Column>
                    <div></div>
                </Grid.Column>
            </Grid>
        );
    }
    return(
        <div></div>
    )
}

// 전화번호 validator 메시지 확인
const PhoneCheckMessage = (props) => {
    if(props.phonenum2 !== undefined){
        return(
            <Grid columns='equal'>
                <Grid.Column>
                    <div></div>
                </Grid.Column>
                <Grid.Column>
                    <div fluid className="ui red pointing basic label" style={ style.validator }>{ props.phonenum2 }</div>
                </Grid.Column>
                <Grid.Column>
                    <div></div>
                </Grid.Column>
            </Grid>
        )
    }else if(props.phonenum3 !== undefined){
        return(
            <Grid columns='equal'>
                <Grid.Column>
                    <div></div>
                </Grid.Column>
                <Grid.Column>
                    <div></div>
                </Grid.Column>
                <Grid.Column>
                    <div fluid className="ui red pointing basic label" style={ style.validator }>{ props.phonenum3 }</div>
                </Grid.Column>
            </Grid>
        )
    }
    return(
        <div></div>
    )
}

// 이메일 선택 입력
const Emailselectaddress = (props) => {
    if(props.emailselectaddress !== '직접 입력'){
        return(
            <Input style={style.emailpadding} type='text' readOnly name='emailaddress' value={props.emailselectaddress}/>
        );
    }
    return(
        <b></b>
    );
}

// 이메일 직접 입력
const Emailaddress = (props) =>{
    if(props.emailselectaddress === '직접 입력'){
        return(
            <Input type='text' name='emailaddress' onChange={ props.handleOnChange }/>
        );
    }
    return(
        <b></b>
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
                //emailadd - 이메일 주소 확인
                emailadd: {
                    message: '이메일주소가 아닙니다.',
                    rule: (val, params, validator) => {
                        return validator.helpers.testRegex(val,/^[A-Z0-9.-]+\.[A-Z]{2,}$/i)
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
                //phonenum2 - 핸드폰 중간자리 확인
                phonenum2: {
                    message: '숫자이면서 3자 이상 4자 이하 이여야합니다.',
                    rule: (val, params, validator) => {
                        return validator.helpers.testRegex(val,/^[0-9]{3,4}$/i)
                    },
                    required: true
                },
                //phonenum3 - 핸드폰 중간자리 확인
                phonenum3: {
                    message: '숫자이면서 4자 이여야합니다.',
                    rule: (val, params, validator) => {
                        return validator.helpers.testRegex(val,/^[0-9]{4,4}$/i)
                    },
                    required: true
                },

            },
            messages: {
                email: '이메일을 확인해주세요.',
                id: '아이디를 확인해주세요.',
                required: '필수입력란 입니다.',
                alpha_num: '영문과 숫자 만 포함 할 수 있습니다.',
                accepted: '이미 사용중이거나 벤 처리된 아이디입니다.',
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
            authority: "",

            open: false,
            
            phonenum1: "",
            phonenum2: "",
            phonenum3: "",

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

            memberId: [],
            memberIdCheck: true,

            emailselectaddress: '',
            emailaddress: '',
            emailaddressvalue: [
                { key: '0', value: '직접 입력', text: '직접 입력' },
                { key: '1', value: 'naver.com', text: 'naver.com' },
                { key: '2', value: 'hanmaile.com', text: 'hanmaile.com' },
                { key: '3', value: 'hotmail.com', text: 'hotmail.com' },
                { key: '4', value: 'yahoo.co.kr', text: 'yahoo.co.kr' },
                { key: '5', value: 'yahoo.com', text: 'yahoo.com' },
                { key: '6', value: 'hanmir.com', text: 'hanmir.com' },
                { key: '7', value: 'empal.com', text: 'empal.com' },
                { key: '8', value: 'hitel.net', text: 'hitel.net' },
                { key: '9', value: 'kebi.com', text: 'kebi.com' },
                { key: '10', value: 'netian.com', text: 'netian.com' },
                { key: '11', value: 'nate.com', text: 'nate.com' },
                { key: '12', value: 'orgio.net', text: 'orgio.net' },
                { key: '13', value: 'korea.com', text: 'korea.com' },
                { key: '14', value: 'wail.co.kr', text: 'wail.co.kr' },
                { key: '15', value: 'lycos.co.kr', text: 'lycos.co.kr' },
                { key: '16', value: 'chol.com', text: 'chol.com' },
                { key: '17', value: 'intizen.com', text: 'intizen.com' },
                { key: '18', value: 'freechal.com', text: 'freechal.com' },
                { key: '19', value: 'teramail.com', text: 'teramail.com' },
            ],

            phonenum: [
                { key: '0', value: '010', text: '010' },
                { key: '1', value: '011', text: '011' },
                { key: '2', value: '016', text: '016' },
                { key: '3', value: '017', text: '017' },
                { key: '4', value: '019', text: '019' },
            ],

            authorityLsit: [
                { key: '0', value: 'USER', text: '구매자' },
                { key: '1', value: 'SELLER', text: '판매자' },
                { key: '2', value: 'ADMIN', text: '관리자' },

            ],

        };
    }

    onClickAdd = (clickZipcode,clickAdd) => {
        this.validator.showMessageFor('address')
        this.setState({
            ...this.state,
            clickZipcode : clickZipcode,
            clickAdd : clickAdd
        })
        this.modalclose()
    }

    handlePaginationChange = ({ activePage }) => {
        this.callApi(activePage);
    }

    modalopen = () => this.setState({ open: true });
    modalclose = () => this.setState({ open: false });
    
    idvalidator = () => {
        this.validator.showMessageFor('id')
        this.state.memberId.some((member)=>{
            if(member.memberId === this.state.id){
                this.setState({...this.state,memberIdCheck: false})
                return true;
            }else{
                this.setState({...this.state,memberIdCheck: true})
                return false;
            }
            
        })
    }

    handleOnChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
        //이메일 주소일경우 주소 validation 확인
        if(e.target.name === 'emailaddress'){
            this.validator.showMessageFor('emailaddress')
        }
    }

    handleAdressSelectChange = (e,{value}) => {
        if(value==='직접 입력'){
            this.setState({
                ...this.state,
                emailselectaddress:value
            })
        }else if(value !=='직접 입력'){
            this.setState({
                ...this.state,
                emailselectaddress:value,
                emailaddress:value
            })
        }
    }

    handleAuthoritySelectChange = (e,{value}) => {
        this.setState({
            ...this.state,
            authority:value
        })
    }

    handlePhonenumSelectChange = (e,{value}) => {
        this.setState({
            ...this.state,
            phonenum1:value
        })
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
                    zipCode : this.state.clickZipcode,
                    address: this.state.clickAdd+this.state.detailAdd,
                    phone: this.state.phonenum1+this.state.phonenum2+this.state.phonenum3,
                    mail: this.state.mail+"@"+this.state.emailaddress,
                    authority: this.state.authority,
                }
            }
        })
    }

    getMemberId = () => {
        axios.get('/membersId')
        .then(response => {
            let memberId = [];
            response.data.forEach( (member) => {
                memberId.push(member);
            });
            this.setState({
                ...this.state,
                memberId
            })
        })
        .catch(error => {
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
            this.check();
            window.location.assign('/');
        } else {
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
    
    componentDidMount = () => {
        this.getMemberId();
    }

    render() {
        const { open } = this.state;
        return (
            <div className="container">
                <Container style={style.padding}>
                <Message
                    attached
                    header='저희 사이트에 방문해주셔서 감사합니다.'
                    content='새로운 계정을 만드시려면 아래 양식을 작성해주세요.'
                />
                    <Form className='attached fluid segment'>
                    
                    <Form.Input required label='ID' placeholder='UserID' type='text' name='id' onChange={this.handleOnChange} onBlur={() => this.idvalidator()} />
                    <IdCheckMessage message={this.validator.message('id', this.state.id, 'required|alpha_num')} checkmessage={this.validator.message('id', this.state.memberIdCheck, 'accepted')}/>

                    <Form.Input required label='비밀번호' placeholder='password' type='password' name='password' onChange={ this.handleOnChange } onBlur={() => this.validator.showMessageFor('password')} />
                    <Checkmessage message={this.validator.message('password', this.state.password, 'required|password')}/>

                    <Form.Input required label='이름' type='text' placeholder='NAME' name='name' onChange={ this.handleOnChange } onBlur={() => this.validator.showMessageFor('name')} />
                    <Checkmessage message={this.validator.message('name', this.state.name, 'required|krString')}/>
                    <div><Form.Field required><label>이메일</label></Form.Field></div>
                    <Input type='text' name='mail' placeholder='Email' onChange={ this.handleOnChange } onBlur={() => this.validator.showMessageFor('mail')}/>
                    <Icon name='at'></Icon>
                    <Emailaddress emailselectaddress={ this.state.emailselectaddress } handleOnChange={ this.handleOnChange } />
                    <Emailselectaddress emailselectaddress={ this.state.emailselectaddress } handleOnChange={ this.handleOnChange } />
                    <Select
                        placeholder='이메일 주소 선택' 
                        name='emailaddress'
                        options={ this.state.emailaddressvalue } 
                        onChange={ this.handleAdressSelectChange } 
                        value={ this.state.emailaddressvalue.value }
                    />
                    <EmailCheckMessage emailaddmessage={this.validator.message('emailaddress', this.state.emailaddress, 'required|emailadd')} emailmessage={this.validator.message('mail', this.state.mail, 'required|alpha_num')} />

                    <div><Form.Field required><label>전화번호</label></Form.Field></div>
                    <Form.Group widths='equal'>
                        <Select fluid
                            placeholder='000' 
                            name='phonenum1'
                            options={ this.state.phonenum } 
                            onChange={ this.handlePhonenumSelectChange } 
                            value={ this.state.phonenum.value }
                        />
                        &nbsp;
                        <Form.Input fluid type='text' name='phonenum2' placeholder='0000' onChange={this.handleOnChange} onBlur={() => this.validator.showMessageFor('phonenum2')}/>
                        <Form.Input fluid type='text' name='phonenum3' placeholder='0000' onChange={this.handleOnChange} onBlur={() => this.validator.showMessageFor('phonenum3')}/>
                    </Form.Group>
                    <PhoneCheckMessage phonenum2={this.validator.message('phonenum2', this.state.phonenum2, 'required|phonenum2')} phonenum3={this.validator.message('phonenum3', this.state.phonenum3, 'required|phonenum3')}/>

                    <div><Form.Field required><label>주소 검색</label></Form.Field></div>
                    <Form.Group width='equal'>
                        <Button color='green' size='mini' onClick={this.modalopen}>주소 검색</Button>
                        <Form.Input readOnly placeholder='우편번호' value={this.state.clickZipcode} type='text'/>
                    </Form.Group>
                    <Form.Input readOnly type='text' placeholder='주소' value={this.state.clickAdd} name='clickAdd'/>
                    <Checkmessage message={this.validator.message('clickAdd', this.state.clickAdd, 'required')}/>
                    <Form.Input type='text' placeholder='상세주소' name='detailAdd' onChange={this.handleOnChange}/>

                    <div><Form.Field required><label>권한 선택</label></Form.Field></div>
                    <Form.Group width='equal'>
                        <Select 
                            placeholder='user' 
                            name='authority'
                            options={ this.state.authorityLsit } 
                            onChange={ this.handleAuthoritySelectChange } 
                            value={ this.state.authorityLsit.value }
                            onBlur={() => this.validator.showMessageFor('authority')}
                        />
                    </Form.Group>
                    <Checkmessage message={this.validator.message('authority', this.state.authority, 'required')}/>

                    <Modal style={style.modal} open={open} onClose={this.modalclose}>
                        <Modal.Header>주소 검색</Modal.Header>
                        <Modal.Content>
                            <Form.Group width='equal'>
                                <Input type='text' placeholder='주소' name='keywordset' onChange={ this.handleOnChange }/>
                                <Button color='blue' size='medium' onClick={ () => { this.callApi(1) } }>검색</Button>
                            </Form.Group>
                            <SearchAddressTable apiResults={ this.state.apiResults } onClickAdd={ this.onClickAdd}/>
                            <Pagination defaultActivePage={ this.state.activePage } totalPages={ this.state.totalPages } onPageChange={ this.handlePaginationChange } />
                        </Modal.Content>
                    </Modal>

                    <Divider />
                    <Link to="/signup"><Button color='blue' size='medium' onClick={ this.submitForm }>계정 만들기</Button></Link>
                    </Form>

                    <Message attached='bottom' warning>
                    <Icon name='help' />
                    이미 회원가입을 하셨다구요 ?&nbsp;<a href='/signin'>여기를 통해서</a>&nbsp;로그인해주세요.
                </Message>
                </Container>
            </div>
        );
    }
}
export default PersonalInput;