import _ from 'lodash';

import React from 'react';
import Radium from 'radium'
import mui from 'material-ui';
import ChatStore from '../stores/ChatStore';
import ChatActions from '../actions/ChatActions'

import Messages from './Messages';
import MessageBox from './MessageBox';

var {List, MenuItem, IconMenu, Avatar, ListItem, ListDivider} = mui;
var Colors = mui.Styles.Colors;

let styles = {
    list: {
        overflowY: "auto",
        height: "520px"
    }
};

class MatchProfile extends React.Component {

    constructor(props) {
        super(props);
        this.scrolled = false;
    }

    componentWillUpdate() {
        this.isScrolledToBottom();
    }

    componentDidUpdate() {
        if (this.scrolled) {
            var out = document.getElementById("messages");
            out.scrollTop = out.scrollHeight;
        }
    }

    componentDidMount() {
        var element = document.getElementById("messages");
        element.scrollTop = element.scrollHeight;
    }


    submit(messageText) {


        var account = this.props.account;

        console.log(`
                messageText: ${messageText}
                account: ${account.email}
                `);

        if (!_.isEmpty(messageText) && !_.isUndefined(account)) {
            ChatActions.sendMessage(account,
                                    this.props.user._id,
                                    messageText);
            this.props.update();
        }
    }

    isScrolledToBottom() {
        var out = document.getElementById("messages");
        this.scrolled = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
    }

    render() {
        return (
            <div>
                <Messages person={this.props.user} />
                <MessageBox submit={this.submit.bind(this)}/>
            </div>
        );
    }
}

export default Radium(MatchProfile);
