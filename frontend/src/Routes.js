import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route to='/' exact component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
}
