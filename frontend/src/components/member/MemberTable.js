import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import MemberTableHeader from './MemberTableHeader'
import MemberTableFooter from './MemberTableFooter'
import MemberRow from './MemberRow'

// 멤버 테이블 컴포넌트
const MemberTable = (props) => {
    const members = props.member.members;

    const memberRows = members.length !== 0 ? (members.map((member) => {
        return (
            <MemberRow key={ member.memberId } member={ member }/>
        )
    })) : (
        <Table.Row>
            <Table.Cell colSpan='8'>검색결과가 존재하지 않습니다.</Table.Cell>
        </Table.Row>
    );

    return (
        <Table>
            <MemberTableHeader/>
            <Table.Body>
                { memberRows }
            </Table.Body>
            <MemberTableFooter/>
        </Table>
    );
}

const mapStateToProps = (state) => {
    return {
        member: state.member
    }
}

export default connect(mapStateToProps)(MemberTable);