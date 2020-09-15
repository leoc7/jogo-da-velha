import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateRoom from './pages/CreateRoom';
import Room from './pages/Room';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route path='/create' component={CreateRoom} />
                <Route path='/room/:id' component={Room} />
            </Switch>
        </BrowserRouter>
    );
}
