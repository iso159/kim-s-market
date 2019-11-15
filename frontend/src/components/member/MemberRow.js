import React from 'react'
import { Table } from 'semantic-ui-react'
import { formatDate } from '../../customLibrary'
import { connect } from 'react-redux'
import BanModal from './BanModal'
import ApproveModal from './ApproveModal'
import CancelBannedModal from './CancelBannedModal'

// 멤버 리스트 한 행 컴포넌트
const MemberRow = (props) => {
    let interactionButton;

    // redux store의 member state를 전달받은 객체
    const reduxMember = props.reduxMember;
    const status = reduxMember.status;

    // member table에서 속성으로 전달받은 member 객체
    const member = props.member;

    if(status === 'Y') {
        // 정상 회원 조회 시
        interactionButton = <BanModal memberId={ member.memberId } />
    } else if(status === 'N') {
        // 가입신청 대기 회원 조회 시
        interactionButton = <ApproveModal memberId={ member.memberId } />
    } else {
        // 밴 회원 조회 시
        interactionButton = <CancelBannedModal memberId={ member.memberId } />
    }

    return (
        <Table.Row>
            <Table.Cell>{ member.memberId }</Table.Cell>
            <Table.Cell>{ member.authority }</Table.Cell>
            <Table.Cell>{ member.name }</Table.Cell>
            <Table.Cell>{ member.address }</Table.Cell>
            <Table.Cell>{ member.phone }</Table.Cell>
            <Table.Cell>{ formatDate(member.createdAt) }</Table.Cell>
            { status === 'B' && <Table.Cell>{ member.reasonToBan } </Table.Cell> }
            <Table.Cell>{ interactionButton }</Table.Cell>
        </Table.Row>
    );
}

const mapStateToProps = (state) => {
    return {
        reduxMember: state.member
    }
}

export default connect(mapStateToProps)(MemberRow);