import _ from 'lodash';

import React from 'react';
import Radium from 'radium';
import mui from 'material-ui';
import View from 'react-flexbox';
import Router from 'react-router';

import ChatStore from '../../stores/ChatStore';
import AccountStore from '../../stores/AccountStore';


import ChatActions from '../../actions/ChatActions';



var {Link, RouteHandler} = Router;

import User from '../User';
import ChatList from '../ChatList';

class MatchUsers extends React.Component {

    state = _.merge({},
                    AccountStore.getState(),
                    ChatStore.getState());

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this)
    }

    getHistory() {
        var account = this.state.account;
        if (!_.isUndefined(account)) {
            ChatActions.getHistory(account);
        }
    }

    componentDidMount() {
        ChatStore.listen(this.onChange);
        AccountStore.listen(this.onChange);

        this.getHistory();
        this.intervalId = setInterval(() => {
            this.getHistory();
        }, 20000);
    }

    componentWillUnmount() {
        ChatStore.unlisten(this.onChange);
        clearInterval(this.intervalId);
    }

    onChange(state) {
        this.setState(state);
    }

    render() {


        //console.log('updating!');
        var users = this.state.matches;

        var userList;
        if (this.state.loading) {
        }

        return (
            <View row>
                <View column width="50%">
                    <ChatList account={this.state.account} users={users}/>
                </View>
                <View column width="50%">
                    <RouteHandler
                        update={this.getHistory.bind(this)}
                        account={this.state.account}
                        accounts={this.state.accounts}
                        users={users}/>
                </View>
            </View>
        );
    }
}

export default Radium(MatchUsers);
