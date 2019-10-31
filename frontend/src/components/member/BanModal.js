import React from 'react'
import { Modal, Button, Icon } from 'semantic-ui-react'

// 멤버 밴 버튼 컴포넌트
const BanModal = (props) => {
    const memberId = props.memberId;
    const handleBanMember = props.handleBanMember;

    return (
        <div>
            <Button color='red' labelPosition='left' icon><Icon name='ban'/>밴</Button>
            <Modal size='mini'>
                <Modal.Header>선택한 회원 밴하기</Modal.Header>
                <Modal.Content>
                    <p>해당 회원을 밴 하시겠습니까 ?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive>네</Button>
                    <Button negative>아니오</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export default BanModal;