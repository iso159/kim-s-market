import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

// 멤버 테이블 헤더 컴포넌트
const MemberTableHeader = (props) => {
    let date;
    const status = props.member.status;

    if(status === 'Y') {
        date = '가입일자';
    } else if(status === 'N') {
        date = '신청일자';
    } else {
        date = '밴 처리 일자'
    }

    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>권한</Table.HeaderCell>
                <Table.HeaderCell>이름</Table.HeaderCell>
                <Table.HeaderCell>주소</Table.HeaderCell>
                <Table.HeaderCell>연락처</Table.HeaderCell>
                <Table.HeaderCell>{ date }</Table.HeaderCell>
                { status === 'B' ? (<Table.HeaderCell>밴 사유</Table.HeaderCell>) : null }
                <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    );
}

const mapStateToProps = (state) => {
    return {
        member: state.member
    }
}

export default connect(mapStateToProps)(MemberTableHeader);