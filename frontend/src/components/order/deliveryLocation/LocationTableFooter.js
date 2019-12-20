import React from 'react';
import { Table, Pagination } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getLocations, changeCurrentPage } from '../../../store/actions/locationActions';

const LocationTableFooter = (props) => {
    const rowPerPage = props.locationState.rowPerPage;
    const currentPage = props.locationState.currentPage;
    const totalCount = props.locationState.apiResults.common.totalCount;
    let totalPages = totalCount ? (
        Math.floor(totalCount / rowPerPage)
    ) : 0;
    
    const handlePageChange = (e, data) => {
        props.changeCurrentPage(data.activePage);
        props.getLocation();
    }

    if(totalCount % rowPerPage !== 0) totalPages += 1; 

    return (
        <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan='4'>
                    <Pagination activePage={ currentPage } totalPages={ totalPages } onPageChange={ handlePageChange }/>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    );
};

const mapStateToProps = (state) => {
    return {
        locationState: state.location
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrentPage: (currentPage) => dispatch(changeCurrentPage(currentPage)),
        getLocation: () => dispatch(getLocations())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationTableFooter);