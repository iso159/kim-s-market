import React from 'react'
import { Button } from 'semantic-ui-react'

// 멤버 가입 승인 버튼 컴포넌트
const ApproveButton = (props) => {
    const memberId = props.memberId;
    const handleApproveMember = props.handleApproveMember;

    return (
        <Button onClick={ () => handleApproveMember(memberId) } color='blue' labelPosition='left' icon><Icon name='plus' />승인</Button>
    );
}

export default ApproveButton;