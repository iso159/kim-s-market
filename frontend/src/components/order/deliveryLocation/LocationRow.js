import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { selectLocation, locationModalClose } from '../../../store/actions/locationActions';

const LocationRow = (props) => {
    const juso = props.juso;
    const jusoIndex = props.index;
    const currentPage = props.locationState.currentPage;
    const rowPerPage = props.locationState.rowPerPage;

    const jusoNo = (currentPage - 1) * rowPerPage + jusoIndex + 1;

    const handleSelectLocation = () => {
        props.selectLocation(juso.roadAddr, juso.zipNo);
        props.locationModalClose();
    };

    return (
        <Table.Row>
            <Table.Cell>{ jusoNo }</Table.Cell>
            <Table.Cell>
                <h4>{ juso.roadAddr }</h4>
                <p>[지번]{ juso.jibunAddr }</p>
            </Table.Cell>
            <Table.Cell>{ juso.zipNo }</Table.Cell>
            <Table.Cell><Button color='linkedin' onClick={ handleSelectLocation }>선택</Button></Table.Cell>
        </Table.Row>
    );
}

const mapStateToProps = (state) => {
    return {
        locationState: state.location
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectLocation: (selectedLocation, selectedZipno) => dispatch(selectLocation(selectedLocation, selectedZipno)),
        locationModalClose: () => dispatch(locationModalClose())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationRow);