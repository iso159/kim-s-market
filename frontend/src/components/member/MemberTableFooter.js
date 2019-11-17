import React from 'react'
import { connect } from 'react-redux'
import { changeCurrentPage, getMembers } from '../../store/actions/memberActions'
import { Table, Pagination } from 'semantic-ui-react'

// 멤버 테이블 푸터 컴포넌트
const MemberTableFooter = (props) => {
    const totalPages = props.member.totalPages;
    const currnetPage = props.member.currentPage;

    // 멤버 목록 - 페이지 체인지 이벤트
    const handlePageChange = (e, data) => {
        props.changeCurrentPage(data.activePage);
        props.getMembers();
    }

    return (
        <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan='8'>
                    <Pagination activePage={ currnetPage } totalPages={ totalPages } onPageChange={ handlePageChange }/>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    );
}

const mapStateToProps = (state) => {
    return {
        member: state.member
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrentPage: (currentPage) => dispatch(changeCurrentPage(currentPage)),
        getMembers: () => dispatch(getMembers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberTableFooter);