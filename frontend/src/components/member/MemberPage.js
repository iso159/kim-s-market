import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Dimmer, Loader } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom' 
import { loadingDatas, loadedDatas } from '../../store/actions/loaderActions'
import { getMembers } from '../../store/actions/memberActions'
import PageHeader from './PageHeader'
import TabByMemberStatus from './TabByMemberStatus'
import axios from 'axios'

const style = {
    container: {
        marginTop: '3em',
        marginBottom: '2em',
        minHeight: '800px'
    }
}

class MemberPage extends Component {
    
    // 회원가입 승인 이벤트
    handleApproveMember = (memberId) => {
        axios.put('/members/approve', {
            memberId: memberId
        })
        .then((res) => {
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.axiosGetMembers();
        })
    }

    // 멤버 밴 이벤트
    handleBanMember = (memberId) => {
        axios.put('/members/ban', {
            memberId: memberId
        })
        .then((res) => {
            
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.axiosGetMembers();
        })
    }

    componentDidMount = () => {
        this.props.getMembers();
    }

    render() {
        const { auth } = this.props;

        if(auth.authority !== 'ADMIN') return <Redirect to='/'/>

        return (
            <Container>
                <Dimmer active={ this.props.loader.isLoading } inverted page>
                    <Loader size='massive'>Loading...</Loader>
                </Dimmer>
                <PageHeader />
                <TabByMemberStatus 
                    handlePageChange={ this.handlePageChange }
                    handleBanMember={ this.handleBanMember }
                    handleApproveMember={ this.handleApproveMember }
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        auth: state.auth,
        loader: state.loader,
        member: state.member
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingDatas: () => dispatch(loadingDatas()),
        loadedDatas: () => dispatch(loadedDatas()),
        getMembers: () => dispatch(getMembers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberPage);