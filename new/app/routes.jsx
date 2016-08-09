import React from 'react';
import Router from 'react-router';


var {Link, Route, RouteHandler, DefaultRoute, Redirect} = Router;

import App from './components/Application';

import Matches from './components/pages/MatchUsers';
import MatchUser from './components/pages/MatchUser'

import Users from './components/pages/Users';
import User from './components/pages/User';

import Setting from './components/pages/Setting';
import UserSetting from './components/pages/UserSetting';
import MatchDP from './components/pages/MatchDP';

var routes = (
    <Route name="app" path="/" handler={App}>

        <Route name="users" path="users"  handler={Users} >
            <Route name="user" path="/users/:userId" handler={User} />
        </Route>
        <Route name= "matches" path="matches" handler= {Matches} >
            <Route name="matchuser" path="/match/:matchId" handler={MatchUser} />
        </Route>

        <Route name="settings" path="settings" handler={Setting} >
            <Route name="usersettings" path="/settings/:email"
                handler={UserSetting} >
            </Route>
        </Route>
        <Route name="matchdp" path="matchdp/:id" handler={MatchDP} />
        <Redirect from='/' to='/users'/>
    </Route>

);

export default routes;
