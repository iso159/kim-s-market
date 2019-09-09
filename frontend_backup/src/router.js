import React from 'react';
import { Route } from 'react-router-dom';
import asyncComponent from './helpers/AsyncFunc';

const PublicRoute = () => {
    return (
        <div>
            <Route 
                exact path = "/login" 
                component = {asyncComponent(() => import('./pages/Login'))}
            />
            <Route 
                exact path = "/signUp" 
                component = {asyncComponent(() => import('./pages/SignUp'))}
            />
        </div>
    );
}

export default PublicRoute;