import _ from 'lodash';

import React from 'react';
import Radium from 'radium';
import mui from 'material-ui';
import View from 'react-flexbox';
import Router from 'react-router';

import ChatStore from '../../stores/ChatStore';
import AccountStore from '../../stores/AccountStore';
import AccountActions from '../../actions/AccountActions';
import ChatActions from '../../actions/ChatActions';

var {Link, RouteHandler} = Router;
var {FlatButton, TextField, DropDownMenu} = mui;

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

    changeUser(e, selectedIndex, menuItem) {
        var account = menuItem.payload;
        AccountActions.setActive(account);
        this.getHistory();
    }

    render() {


        //console.log('updating!');
        var users = this.state.matches;

        var userList;
        if (this.state.loading) {
        }

          var profilePicture = '';
        var menuItems = [];
        if (!_.isUndefined(this.state.account)) {
            profilePicture = this.state.account.profile.photos[0].url;

            menuItems = _.map(this.state.accounts, (account, i) => {
                return {text: account.email, payload: account};
            });

            var email = this.state.account.email;
            menuItems = _.filter(menuItems, (account) => {
                return account.text !== email && !account.payload.profile.banned;
            });

            menuItems.unshift({text: email, payload: this.state.account});
        }

        return (
            <View column>
            
                <View row style={{marginTop: "0px"}}>
                    <div className="row">
                        <DropDownMenu
                            onChange={this.changeUser.bind(this)}
                            menuItems={menuItems} />
                    </div>
                </View>
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
            </View>
        );
    }
}

export default Radium(MatchUsers);
