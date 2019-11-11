import React, { Component } from 'react'
import { Modal, Button, Icon, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getMembers } from '../../store/actions/memberActions'
import { loadingDatas, loadedDatas } from '../../store/actions/loaderActions'
import axios from 'axios'

// 멤버 밴 버튼 컴포넌트
class BanModal extends Component {
    
    state = {
        banModalOpen: false,
        reasonsToBan: ''
    }

    // 밴 모달창에서 '네' 선택 이벤트
    banMember = () => {
        const banTargetMemberId = this.props.memberId;

        this.props.loadingDatas();

        // 회원 밴 api 요청
        axios.put('/members/ban/' + banTargetMemberId, {
                memberId: banTargetMemberId,
                reasonToBan: this.state.reasonsToBan
        })
        .then((res) => {
            console.log(res.data);

            this.props.getMembers();
        })
        .finally(() => {
            this.props.loadedDatas();
        })

        this.setState(() => {
            return {
                banModalOpen: false
            }
        })
    }

    // 밴 모달창 열기 이벤트
    openBanModal = () => {
        this.setState(() => {
            return {
                banModalOpen: true
            }
        })
    }

    // 밴 모달창에서 '아니오' 선택 이벤트
    closeBanModal = () => {
        this.setState(() => {
            return {
                banModalOpen: false
            }
        })
    }

    handleChangeReasonsToBan = (e) => {
        const reasonsToBan = e.target.value;

        this.setState(() => {
            return {
                reasonsToBan: reasonsToBan
            }
        })
    }

    render() {
        return (
            <div>
                <Button onClick={ this.openBanModal } size='small' color='red' labelPosition='left' icon><Icon name='ban'/>밴</Button>
                <Modal 
                    open={ this.state.banModalOpen }
                    size='mini'
                >
                    <Modal.Header>선택한 회원 밴하기</Modal.Header>
                    <Modal.Content>
                        <p>밴 사유를 적어주세요.</p>
                        <Form>
                            <Form.TextArea onChange={ this.handleChangeReasonsToBan } value={ this.state.reasonsToBan } />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={ this.banMember } positive>네</Button>
                        <Button onClick={ this.closeBanModal } negative>아니오</Button>
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

export default connect(null, mapDispatchToProps)(BanModal);