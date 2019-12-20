import React, { Component } from 'react'
import { Modal, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getMembers } from '../../store/actions/memberActions'
import { loadingDatas, loadedDatas } from '../../store/actions/loaderActions'
import axios from 'axios'

// 멤버 가입신청 승인 버튼 컴포넌트
class ApproveModal extends Component {
    
    state = {
        approveModalOpen: false
    }

    // 가입신청승인 모달창에서 '네' 선택 이벤트
    approveMember = () => {
        const approveTargetId = this.props.memberId;

        this.props.loadingDatas();

        // 회원 가입신청승인 api 요청
        axios.put('/members/approve/' + approveTargetId, {
                memberId: approveTargetId
        })
        .then((res) => {
            this.props.getMembers();
        })
        .finally(() => {
            this.props.loadedDatas();
        })

        this.setState(() => {
            return {
                approveModalOpen: false
            }
        })
    }

    // 가입신청승인 모달창 열기 이벤트
    openApproveModal = () => {
        this.setState(() => {
            return {
                approveModalOpen: true
            }
        })
    }

    // 가입신청승인 모달창에서 '아니오' 선택 이벤트
    closeApproveModal = () => {
        this.setState(() => {
            return {
                approveModalOpen: false
            }
        })
    }

    render() {
        return (
            <div>
                <Button onClick={ this.openApproveModal } size='small' color='blue' labelPosition='left' icon><Icon name='plus'/>신청 승인</Button>
                <Modal 
                    open={ this.state.approveModalOpen }
                    size='mini'
                >
                    <Modal.Header>가입신청 승인하기</Modal.Header>
                    <Modal.Content>
                        <p>가입신청을 승인하시겠습니까 ?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={ this.approveMember } positive>네</Button>
                        <Button onClick={ this.closeApproveModal } negative>아니오</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingDatas: () => dispatch(loadingDatas()),
        loadedDatas: () => dispatch(loadedDatas()),
        getMembers: () => dispatch(getMembers())
    }
}

export default connect(null, mapDispatchToProps)(ApproveModal);