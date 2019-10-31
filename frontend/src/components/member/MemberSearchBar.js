import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMembers, searchMembers, changeCurrentPage } from '../../store/actions/memberActions'
import { Input, Icon, Dropdown } from 'semantic-ui-react'

class MemberSearchBar extends Component {

    state = {
        searchKey: 'memberId',
        searchValue: ''
    }

    // 멤버 검색 - 드롭다운 체인지 메서드
    handleSearchKeyChange = (e, data) => {
        this.setState(() => {
            return {
                ...this.state,
                searchKey: data.value
            };
        })
    }

    // 멤버 검색 - 검색어 입력 이벤트
    handleSearchValueChange = (e) => {
        const searchValue = e.target.value;

        this.setState(() => {
            return {
                ...this.state,
                searchValue: searchValue
            }
        })
    }

    // 멤버 검색 - 검색 버튼 클릭 이벤트
    handleSearch = () => {
        const searchObject = {
            searchKey: this.state.searchKey,
            searchValue: this.state.searchValue
        };

        this.props.searchMembers(searchObject);
        this.props.changeCurrentPage(1);
        this.props.getMembers();
    }

    render() {
        // 멤버 리스트 - 검색 드롭다운 리스트 옵션
        const searchKeyOptions = [
            {key: 'memberId', text: '아이디', value: 'memberId'},
            {key: 'address', text: '주소', value: 'address'},
            {key: 'name', text: '이름', value: 'name'},
            {key: 'phone', text: '연락처', value: 'phone'},
            {key: 'authority', text: '권한', value: 'authority'}
        ]

        return (
            <Input 
                placeholder='검색...' 
                icon={ <Icon name='search' onClick={ this.handleSearch } inverted circular link /> }
                action={ 
                    <Dropdown basic button 
                        options={ searchKeyOptions } 
                        value={ this.state.searchKey }
                        onChange={ this.handleSearchKeyChange }
                    /> 
                }
                actionPosition='left'
                onChange={ this.handleSearchValueChange }
                value={ this.state.searchValue }
                fluid
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        member: state.member
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchMembers: (searchObject) => dispatch(searchMembers(searchObject)),
        changeCurrentPage: (currentPage) => dispatch(changeCurrentPage(currentPage)),
        getMembers: () => dispatch(getMembers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberSearchBar);