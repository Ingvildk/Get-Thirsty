import React from 'react';
import Router from 'react-router';
import Radium from 'radium';
import mui from 'material-ui';

let ActionAssignment = require('material-ui/lib/svg-icons/action/assignment');
let ActionGrade = require('material-ui/lib/svg-icons/action/grade');
let ActionInfo = require('material-ui/lib/svg-icons/action/info');
let CommunicationCall = require('material-ui/lib/svg-icons/communication/call');
let CommunicationChatBubble = require('material-ui/lib/svg-icons/communication/chat-bubble');
let CommunicationEmail = require('material-ui/lib/svg-icons/communication/email');
let ContentDrafts = require('material-ui/lib/svg-icons/content/drafts');
let ContentInbox = require('material-ui/lib/svg-icons/content/inbox');
let ContentReply = require('material-ui/lib/svg-icons/content/reply');
let ContentSend = require('material-ui/lib/svg-icons/content/send');
let ContentAddBox = require('material-ui/lib/svg-icons/content/add');
let EditorInsertChart = require('material-ui/lib/svg-icons/editor/insert-chart');
let FileFolder = require('material-ui/lib/svg-icons/file/folder');
let MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
let ToggleStarBorder = require('material-ui/lib/svg-icons/toggle/star-border');

var {List, MenuItem, IconMenu, Avatar, ListItem, ListDivider} = mui;


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

    accountsHandler(e) {
      this.context.router.transitionTo(`/accounts`);
    }

    render() {

       return (
            <List subheader='Menu'>
                <ListItem onClick={this.inboxHandler.bind(this)} primaryText="Users"  leftIcon={<ContentInbox />} />
                <ListItem onClick={this.matchesHandler.bind(this)} primaryText="Matches" leftIcon={<CommunicationChatBubble />} />
                <ListItem onClick={this.settingHandler.bind(this)} primaryText="Settings" leftIcon={<FileFolder />} />
            </List>
        );
    }
}

Sidebar.contextTypes = {router: React.PropTypes.func.isRequired}

export default Radium(Sidebar);
