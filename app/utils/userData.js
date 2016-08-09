import React from 'react';
import Router from 'react-router';
import Radium from 'radium';
import mui from 'material-ui';

var {List, MenuItem, IconMenu, Avatar, ListItem, ListDivider} = mui;
var ContentInbox = require('material-ui/lib/svg-icons/content/inbox');
var ContentReply = require('material-ui/lib/svg-icons/content/inbox');
var ContentAddBox = require('material-ui/lib/svg-icons/content/add-box');
var Colors = mui.Styles.Colors;

var { Route, DefaultRoute, RouteHandler, Link } = Router;


class Sidebar extends React.Component {

    inboxHandler(e) {
      this.context.router.transitionTo(`/users`);  
    }
    settingHandler(e) {
      this.context.router.transitionTo(`/settings`);
    }
    matchesHandler(e) {
      this.context.router.transitionTo(`/matches`);
    }

    render() {
       return (
         <List>
            <ListItem onClick={this.inboxHandler.bind(this)} primaryText="Users" leftIcon={<ContentInbox />} />
            <ListDivider />
            <ListItem onClick={this.settingHandler.bind(this)} primaryText="Settings" leftIcon={<ContentReply />} />
            <ListDivider />
            <ListItem onClick={this.matchesHandler.bind(this)} primaryText="Matches" leftIcon={<ContentAddBox />} />
         </List>
        );
    }
}

Sidebar.contextTypes = {router: React.PropTypes.func.isRequired}

export default Radium(Sidebar);