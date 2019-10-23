import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Icon, Container, Dimmer, Loader, Table, Pagination, Tab, Input, Dropdown, Grid, Button } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom' 
import { loadingDatas, loadedDatas } from '../../store/actions/loaderActions'
import axios from 'axios'

const style = {
    container: {
        marginTop: '3em',
        marginBottom: '2em',
        minHeight: '800px'
    },
    header: {
        marginBottom: '2em'
    }
}

// 본 페이지 헤더
const PageHeader = () => (
    <Header as='h1' style={ style.header } dividing>
        <Icon name='users' />
        <Header.Content>
            멤버 관리
        <Header.Subheader>멤버 목록 확인 및 권한 등 멤버에 대한 전반적인 관리를 할 수 있습니다.</Header.Subheader>
        </Header.Content>
    </Header>
);

// 멤버 밴 버튼 컴포넌트
const BanButton = (props) => {
    const memberId = props.memberId;
    const handleBanMember = props.handleBanMember;

    return (
        <Button onClick={ () => { handleBanMember(memberId); } } color='red' labelPosition='left' icon><Icon name='ban' />밴</Button>
    );
}

// 멤버 리스트 한 행 컴포넌트
const MemberRow = (props) => {
    let interactionButton;

    const member = props.member;
    const tabIndex = props.tabIndex;
    const handleBanMember = props.handleBanMember;

    if(tabIndex === 0) {
        interactionButton = <BanButton memberId={ member.memberId } handleBanMember={ handleBanMember } />
    }

    return (
        <Table.Row>
            <Table.Cell>{ member.memberId }</Table.Cell>
            <Table.Cell>{ member.authority }</Table.Cell>
            <Table.Cell>{ member.name }</Table.Cell>
            <Table.Cell>{ member.address }</Table.Cell>
            <Table.Cell>{ member.phone }</Table.Cell>
            <Table.Cell>{ member.createdAt }</Table.Cell>
            <Table.Cell>{ interactionButton }</Table.Cell>
        </Table.Row>
    );
}

// 멤버 테이블 푸터 컴포넌트
const MemberTableFooter = (props) => {
    const totalPages = props.totalPages;
    const handlePageChange = props.handlePageChange;

    return (
        <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan='7'>
                    <Pagination defaultActivePage={ 1 } totalPages={ totalPages } onPageChange={ handlePageChange }/>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    );
}

// 멤버 테이블 헤더 컴포넌트
const MemberTableHeader = () => {
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>권한</Table.HeaderCell>
                <Table.HeaderCell>이름</Table.HeaderCell>
                <Table.HeaderCell>주소</Table.HeaderCell>
                <Table.HeaderCell>연락처</Table.HeaderCell>
                <Table.HeaderCell>가입일자</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    );
}

// 멤버 테이블 컴포넌트
const MemberTable = (props) => {
    const members = props.members;

    const memberRows = members.length !== 0 ? (members.map((member) => {
        return (
            <MemberRow key={ member.memberId } member={ member } { ...props } />
        )
    })) : (
        <Table.Row>
            <Table.Cell colSpan='7'>검색결과가 존재하지 않습니다.</Table.Cell>
        </Table.Row>
    );

    return (
        <Table>
            <MemberTableHeader { ...props }/>
            <Table.Body>
                { memberRows }
            </Table.Body>
            <MemberTableFooter { ...props }/>
        </Table>
    );
}

const TabExample = (props) => {
    console.log(props);

    const rowPerPage = props.rowPerPage;
    const totalMembers = props.totalMembers;

    const handleTabChange = props.handleTabChange;
    const handleSearchKeyChange = props.handleSearchKeyChange;
    const handleSearchValueChange = props.handleSearchValueChange;
    const handleRowPerPageChange = props.handleRowPerPageChange;

    // 멤버 리스트 - 검색 드롭다운 리스트 옵션
    const searchKeyOptions = [
        {key: 'memberId', text: '아이디', value: 'memberId'}
    ]

    // 멤버 검색 - n 행씩 보기 드롭다운 리스트 옵션
    const rowPerPageOptions = [
        { key: 'by3', text: '3행 씩 보기', value: '3' },
        { key: 'by5', text: '5행 씩 보기', value: '5' },
        { key: 'by10', text: '10행 씩 보기', value: '10' }
    ]

    const memberTable = (
        <div>
            <Grid columns='equal'>
                <Grid.Column>
                    <Input 
                        placeholder='검색...' 
                        icon={ <Icon name='search' inverted circular link /> }
                        action={ 
                            <Dropdown basic button 
                                options={ searchKeyOptions } 
                                defaultValue='memberId'
                                onChange={ handleSearchKeyChange }
                            /> 
                        }
                        actionPosition='left'
                        onChange={ handleSearchValueChange }
                        fluid
                    />
                </Grid.Column>
                <Grid.Column textAlign='right'>
                    전체 <strong>{ totalMembers }</strong> 건
                    <Dropdown
                        onChange={ handleRowPerPageChange }
                        options={ rowPerPageOptions }
                        value={ rowPerPage }
                        style={ { marginLeft: '3em' } }
                        selection
                    />
                </Grid.Column>
            </Grid>
            <MemberTable { ...props } />
        </div>
    );

    const panes = [
        { menuItem: { key: 'common', icon: 'users', content: '정상' }, render: () => memberTable },
        { menuItem: { key: 'waiting', icon: 'user plus', content: '승인 대기' }, render: () => memberTable },
        { menuItem: { key: 'ban', icon: 'ban', content: '밴' }, render: () => memberTable }
    ]

    return (
        <Tab menu={ { tabular: true, fluid: true } } panes={ panes } onTabChange={ handleTabChange }/>
    );
}

class MemberPage extends Component {
    
    state = {
        tabIndex: 0,
        currentPage: '1',
        rowPerPage: '5',
        status: 'Y',
        totalPages: 0,
        totalMembers: 0,
        members: [],
        searchKey: 'memberId',
        searchValue: '',
        searchObject: {
            searchKey: 'memberId',
            searchValue: ''
        }
    }

    // 멤버 밴 이벤트
    handleBanMember = (memberId) => {
        axios.put('/members/ban', {
            memberId: memberId
        })
        .then((res) => {
            
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.axiosGetMembers();
        })
    }

    // n행 씩 보기 드롭다운 체인지 이벤트
    handleRowPerPageChange = (e, data) => {
        this.setState(() => {
            return {
                ...this.state,
                rowPerPage: data.value
            }
        }, this.axiosGetMembers)
    }

    // 멤버 목록 - 페이지 체인지 이벤트
    handlePageChange = (e, data) => {
        console.log(data);

        this.setState(() => {
            return {
                ...this.state,
                currentPage: data.activePage
            }
        }, this.axiosGetMembers)
    }

    // 멤버 검색 - 검색어 입력 이벤트
    handleSearchValueChange = (e) => {
        this.setState(() => {
            return {
                ...this.state,
                searchValue: e.target.value
            }
        })
    }

    // 멤버 검색 - 드롭다운 체인지 메서드
    handleSearchKeyChange = (e, data) => {
        this.setState(() => {
            return {
                ...this.state,
                searchKey: data.value
            };
        })
    }

    // 멤버관리 페이지 좌측 상단 부분 탭 체인지 메서드
    handleTabChange = (e, data) => {
        let status = 'all';

        // 0: 정상, 1: 승인 대기, 2: 밴
        switch(data.activeIndex){
            case 0:
                status = 'Y';
                break;
            case 1:
                status = 'N';
                break;
            case 2:
                status = 'B';
                break;
            default:
                status = 'Y';
        }

        // state 변경 후 멤버 조회
        this.setState((prevState, props) => {
            return {
                ...this.state,
                tabIndex: data.activeIndex,
                currentPage: '1',
                status: status
            }
        }, this.axiosGetMembers);
    }

    // 멤버 조회 메서드
    axiosGetMembers = () => {
        const requestUri = '/members?currentPage=' + this.state.currentPage 
                            + '&rowPerPage=' + this.state.rowPerPage
                            + '&status=' + this.state.status;

        this.props.loadingDatas();

        axios.get(requestUri)
        .then((res) => {
            console.log(res.data);

            const members = res.data.result;
            const totalPages = res.data.pagination.pageCnt;
            const totalMembers = res.data.pagination.listCnt;

            this.setState({
                ...this.state,
                members: members,
                totalPages: totalPages,
                totalMembers: totalMembers
            })
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.props.loadedDatas();
        })
    }

    componentDidMount = () => {
        this.axiosGetMembers();
    }

    render() {
        const { auth } = this.props;

        if(auth.authority !== 'ADMIN') return <Redirect to='/'/>

        return (
            <Container style={ style.container }>
                <Dimmer active={ this.props.loader.isLoading } inverted page>
                    <Loader size='massive'>Loading...</Loader>
                </Dimmer>
                <PageHeader />
                <TabExample { ...this.state }
                    handleTabChange={ this.handleTabChange }
                    handleSearchKeyChange={ this.handleSearchKeyChange }
                    handleSearchValueChange={ this.handleSearchValueChange }
                    handlePageChange={ this.handlePageChange }
                    handleRowPerPageChange={ this.handleRowPerPageChange }
                    handleBanMember={ this.handleBanMember }
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        auth: state.auth,
        loader: state.loader
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingDatas: () => ( dispatch(loadingDatas()) ),
        loadedDatas: () => ( dispatch(loadedDatas()) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberPage);