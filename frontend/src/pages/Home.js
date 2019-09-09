import React, {Component} from 'react';
import {ResponsiveContainer, HomepageLayout} from 'components/Main';

class Home extends Component {
    render(){
        return(
            <div>
                <ResponsiveContainer>
                    <HomepageLayout />
                </ResponsiveContainer>
            </div>
        );
    }
}

export default Home;