import React from 'react'
import { Grid, Dropdown, Tab } from 'semantic-ui-react'
import { connect } from 'react-redux'
import MemberTable from './MemberTable'
import MemberSearchBar from './MemberSearchBar'
import { getMembers, changeTab, changeRowPerPage, changeCurrentPage } from '../../store/actions/memberActions'

// 멤버 탭 컴포넌트
const TabByMemberStatus = (props) => {
    console.log(props);

    const totalMembers = props.member.totalMembers;
    const rowPerPage = props.member.rowPerPage;

    // 멤버 검색 - n 행씩 보기 드롭다운 리스트 옵션
    const rowPerPageOptions = [
        { key: 'by3', text: '3행 씩 보기', value: '3' },
        { key: 'by5', text: '5행 씩 보기', value: '5' },
        { key: 'by10', text: '10행 씩 보기', value: '10' }
    ]

    // n행 씩 보기 드롭다운 체인지 이벤트
    const handleRowPerPageChange = (e, data) => {
        let changedRowPerPage = data.value;

        props.changeRowPerPage(changedRowPerPage);
        props.changeCurrentPage(1);
        props.getMembers();
    }

    // 멤버관리 페이지 좌측 상단 부분 탭 체인지 메서드
    const handleTabChange = (e, data) => {
        let status;

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

        props.changeTab(status);
        props.changeCurrentPage(1);
        props.getMembers();
    }

    // 멤버테이블 컴포넌트와 검색창 컴포넌트를 조합하여 변수에 저장
    const tabRenderContents = (
        <div>
            <Grid columns='equal'>
                <Grid.Column>
                    <MemberSearchBar />
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
            <MemberTable />
        </div>
    );

    const panes = [
        { menuItem: { key: 'common', icon: 'users', content: '정상' }, render: () => tabRenderContents },
        { menuItem: { key: 'waiting', icon: 'user plus', content: '승인 대기' }, render: () => tabRenderContents },
        { menuItem: { key: 'ban', icon: 'ban', content: '밴' }, render: () => tabRenderContents }
    ]

    return (
        <Tab menu={ { tabular: true, fluid: true } } panes={ panes } onTabChange={ handleTabChange }/>
    );
}

const mapStateToProps = (state) => {
    return {
        member: state.member
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMembers: () => dispatch(getMembers()),
        changeTab: (status) => dispatch(changeTab(status)),
        changeRowPerPage: (rowPerPage) => dispatch(changeRowPerPage(rowPerPage)),
        changeCurrentPage: (currentPage) => dispatch(changeCurrentPage(currentPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabByMemberStatus);