import React from 'react';
import { Route } from 'react-router-dom';
import asyncComponent from './helpers/AsyncFunc';

const PublicRoute = () => {
    return (
        <div>
            <Route 
                exact path = "/Login" 
                component = {asyncComponent(() => import('./pages/Login'))}
            />
        </div>
    );
}

export default PublicRoute;