import React from 'react';
import { Table } from 'semantic-ui-react';

const LocationTableHeader = () => {
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>No</Table.HeaderCell>
                <Table.HeaderCell>도로명주소</Table.HeaderCell>
                <Table.HeaderCell>우편번호</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    );
}

export default LocationTableHeader;