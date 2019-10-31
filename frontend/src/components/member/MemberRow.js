import React from 'react'
import { Table } from 'semantic-ui-react'
import { formatDate } from '../../customLibrary';
import BanModal from './BanModal'

// 멤버 리스트 한 행 컴포넌트
const MemberRow = (props) => {
    let interactionButton;

    const member = props.member;
    const tabIndex = props.tabIndex;
    const handleBanMember = props.handleBanMember;
    const handleApproveMember = props.handleApproveMember;

    if(tabIndex === 0) {
        interactionButton = <BanModal memberId={ member.memberId } handleBanMember={ handleBanMember } />
    } else if(tabIndex === 1) {
    }

    return (
        <Table.Row>
            <Table.Cell>{ member.memberId }</Table.Cell>
            <Table.Cell>{ member.authority }</Table.Cell>
            <Table.Cell>{ member.name }</Table.Cell>
            <Table.Cell>{ member.address }</Table.Cell>
            <Table.Cell>{ member.phone }</Table.Cell>
            <Table.Cell>{ formatDate(member.createdAt) }</Table.Cell>
            <Table.Cell>{ interactionButton }</Table.Cell>
        </Table.Row>
    );
}

export default MemberRow;