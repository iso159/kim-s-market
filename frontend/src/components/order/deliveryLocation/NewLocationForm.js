import React from 'react';
import { Select, Grid, Input, Form } from 'semantic-ui-react';
import FindLocationModal from './FindLocationModal';
import { connect } from 'react-redux';

const NewLocationForm = (props) => {
    const locationState = props.locationState;

    const firstPhoneNumbers = [
        { key: '010', value: '010', text: '010' },
        { key: '011', value: '011', text: '011' },
        { key: '016', value: '016', text: '016' },
        { key: '017', value: '017', text: '017' },
        { key: '018', value: '018', text: '018' },
        { key: '019', value: '018', text: '018' }
    ];

    return (
        <Form>
            <Grid>
                <Grid.Row>
                    <Grid.Column width='2'>이름</Grid.Column>
                    <Grid.Column width='14'>
                        <Input />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width='2'>주소</Grid.Column>
                    <Grid.Column width='14'>
                        <FindLocationModal />
                        <br />
                        <Input value={ locationState.selectedLocation } style={ { width: '50%' } } readOnly={ true } />
                        <br /><br />
                        <Input style={ { width: '50%' } } />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width='2'>연락처</Grid.Column>
                    <Grid.Column width='14'>
                        <Form.Group inline>
                            <Form.Field>
                                <Select options={ firstPhoneNumbers } defaultValue='010' />
                            </Form.Field>
                            <Form.Field>
                                <Input />
                            </Form.Field>
                            <Form.Field>
                                <Input />
                            </Form.Field>
                        </Form.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Form>
    );
}

const mapStateToProps = (state) => {
    return {
        locationState: state.location
    };
}

export default connect(mapStateToProps)(NewLocationForm);