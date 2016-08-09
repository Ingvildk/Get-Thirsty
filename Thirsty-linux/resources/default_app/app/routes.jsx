import React from 'react';
import Router from 'react-router';


var {Link, Route, RouteHandler, DefaultRoute, Redirect} = Router;

import App from './components/Application';
import Setting from './components/pages/Setting';

//import Main from './components/pages/Main';
//import Home from './components/pages/Home';
//import Profile from './components/pages/Profile';
import Matches from './components/pages/Match';


import Users from './components/pages/Users';
import User from './components/pages/User';
import Chat from './components/pages/Chat';
import Accounts from './components/pages/Accounts';

var routes = (
    <Route name="app" path="/" handler={App}>

        <Route name="users" path="users"  handler={Users} >
            <Route name="user" path="/users/:userId" handler={User} />
        </Route>

        <Route name= "matches" path="matches" handler= {Matches}>
            <Route name="chat" path="chat/:userid" handler={Chat} />
        </Route>

        <Route name="settings" path="settings" handler={Setting} >
        </Route>

        <Route name="accounts" path="accounts" handler={Accounts} >
        </Route>

        <Redirect from='/' to='/users'/>
    </Route>

);

export default routes;
