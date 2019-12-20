import React, { Component } from 'react';
import { Modal, Button, Icon, Input, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getLocations, changeKeyword, changeCurrentPage, locationModalOpen, locationModalClose } from '../../../store/actions/locationActions';
import LocationTable from './LocationTable';

class FindLocationModal extends Component {

    // 모달창 오픈 이벤트
    handleOpen = () => {
        this.props.locationModalOpen();
    }

    // 모달창 클로즈 이벤트
    handleClose = () => {
        this.props.locationModalClose();
    }

    // 주소검색 검색창 입력 이벤트
    handleSearchChange = (e) => {
        this.props.changeKeyword(e.target.value);
    }

    // 주소검색 이벤트 (API 호출)
    handleSearch = () => {
        this.props.changeCurrentPage(1);
        this.props.getLocations();
    }

    render() {
        const locationState = this.props.locationState;
        let totalCount = locationState.apiResults.common.totalCount;
        
        if(!totalCount) totalCount = 0;

        return (
            <div>
                <Dimmer active={ this.props.loaderState.isLoading } inverted page>
                    <Loader size='massive'>Loading...</Loader>
                </Dimmer>
                <Button onClick={ this.handleOpen } style={ { marginRight: '2%' } }>주소찾기</Button>
                <Input value={ locationState.selectedZipNo } readOnly={ true } />
                <Modal 
                    open={ locationState.locationModalOpen }
                    onClose={ this.handleClose }
                    size='small'
                    style={ { minHeight: '620px' } }
                >
                    <Modal.Header>주소검색</Modal.Header>
                    <Modal.Content>
                        <Input
                            icon={ <Icon name='search' onClick={ this.handleSearch } link /> }
                            placeholder='도로명주소, 건물명 또는 지번을 입력해보세요.'
                            style={ { marginBottom: '1%', border: '3px solid #186bb9' } }
                            onChange={ this.handleSearchChange }
                            size='large'
                            fluid
                        />
                        <p style={ { color: '#186bb9', paddingLeft: '3%'} }>검색어 예 : 도로명(반포대로 58), 건물명(독립기념관), 지번(삼성동 25)</p>
                        <br/>
                        <p>* 도로명주소 검색결과 <strong>({totalCount + '건'})</strong></p>
                        <LocationTable />
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        locationState: state.location,
        loaderState: state.loader
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLocations: () => dispatch(getLocations()),
        changeKeyword: (keyword) => dispatch(changeKeyword(keyword)),
        changeCurrentPage: (currentPage) => dispatch(changeCurrentPage(currentPage)),
        locationModalOpen: () => dispatch(locationModalOpen()),
        locationModalClose: () => dispatch(locationModalClose())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FindLocationModal);