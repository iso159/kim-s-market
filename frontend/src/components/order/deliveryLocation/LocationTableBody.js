import React from 'react';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import LocationRow from './LocationRow';

const LocationTableBody = (props) => {
    const jusoList = props.locationState.apiResults.juso;

    const locationsRows = jusoList != null && jusoList.length !== 0 ? (jusoList.map((juso, index) => {
        return (
            <LocationRow key={ index } juso={ juso } index={ index } />
        );
    })) : (
        <Table.Row>
            <Table.Cell colSpan='4'>검색결과가 존재하지 않습니다.</Table.Cell>
        </Table.Row>
    );

    return (
        <Table.Body>
            { locationsRows }
        </Table.Body>
    );
}

const mapStateToProps = (state) => {
    return {
        locationState: state.location
    };
}

export default connect(mapStateToProps)(LocationTableBody);