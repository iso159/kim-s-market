import React, { Component } from 'react'
import { Modal, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getMembers } from '../../store/actions/memberActions'
import { loadingDatas, loadedDatas } from '../../store/actions/loaderActions'
import axios from 'axios'

// 멤버 밴 버튼 컴포넌트
class CancelBanned extends Component {
    
    state = {
        cancelBannedModalOpen: false
    }

    // 밴 모달창에서 '네' 선택 이벤트
    cancelBannedMember = () => {
        const cancelTargetMemberId = this.props.memberId;

        this.props.loadingDatas();

        // 회원 밴 api 요청
        axios.put('/members/cancel-banned/' + cancelTargetMemberId, {
            memberId: cancelTargetMemberId
        })
        .then((res) => {
            console.log(res.data);

            this.props.getMembers();
        })

        this.setState(() => {
            return {
                cancelBannedModalOpen: false
            }
        })
    }

    // 밴 해제 모달창 열기 이벤트
    openCancelBannedModal = () => {
        this.setState(() => {
            return {
                cancelBannedModalOpen: true
            }
        })
    }

    // 밴 해제 모달창에서 '아니오' 선택 이벤트
    closeCancelBannedModal = () => {
        this.setState(() => {
            return {
                cancelBannedModalOpen: false
            }
        })
    }

    render() {
        return (
            <div>
                <Button onClick={ this.openCancelBannedModal } size='small' color='orange' labelPosition='left' icon><Icon name='ban'/>밴 해제</Button>
                <Modal 
                    open={ this.state.cancelBannedModalOpen }
                    size='mini'
                >
                    <Modal.Header>선택한 회원 밴 해제하기</Modal.Header>
                    <Modal.Content>
                        <p>해당 회원을 밴 해제 하시겠습니까 ?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={ this.cancelBannedMember } positive>네</Button>
                        <Button onClick={ this.closeCancelBannedModal } negative>아니오</Button>
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

export default connect(null, mapDispatchToProps)(CancelBanned);