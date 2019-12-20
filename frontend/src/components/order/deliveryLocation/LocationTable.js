import React from 'react';
import { Table } from 'semantic-ui-react';
import LocationTableHeader from './LocationTableHeader';
import LocationTableBody from './LocationTableBody';
import LocationTableFooter from './LocationTableFooter';

const LocationTable = (props) => {
    return (
        <Table striped selectable>
            <LocationTableHeader />
            <LocationTableBody />
            <LocationTableFooter /> 
        </Table>
    );
}

export default LocationTable;