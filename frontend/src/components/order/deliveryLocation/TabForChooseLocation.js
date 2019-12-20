import React from 'react';
import { Tab } from 'semantic-ui-react';
import NewLocationForm from './NewLocationForm';

const panes = [
    { menuItem: '새로운 배송지', render: () => <Tab.Pane style={ { paddingTop: '4%', paddingLeft: '3%' } }><NewLocationForm /></Tab.Pane> },
    { menuItem: '최근 배송지', render: () => <Tab.Pane></Tab.Pane> }   
]

const TabForChooseLocation = () => {
    return <Tab panes={ panes }/>;
}

export default TabForChooseLocation;