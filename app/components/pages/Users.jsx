import _ from 'lodash';
import React from 'react';
import Radium from 'radium';
import mui from 'material-ui';
import View from 'react-flexbox';
import Router from 'react-router';


import Spinner from '../Spinner';

import AccountStore from '../../stores/AccountStore';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';

var {Link, RouteHandler} = Router;
var {FlatButton, TextField, DropDownMenu} = mui;


import User from '../User';
import UserList from '../UserList';
import Nav from '../Nav';

var {Avatar, DropDownMenu} = mui;

class Users extends React.Component {

    state = _.merge({filter: undefined},
                UserStore.getState(),
                AccountStore.getState());


    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this)
    }


    getMoreUsers() {
        var account = this.state.account;


        if (!_.isUndefined(account) && _.size(this.state.users) < 8 &&
                !UserStore.isLoading()) {

            UserStore.fetchRemoteUsers(account);
        } else {
        }
    }

    componentDidMount() {
        UserStore.listen(this.onChange);
        AccountStore.listen(this.onChange);
        this.getMoreUsers();
    }

    componentWillUnmount() {
        AccountStore.unlisten(this.onChange);
        UserStore.unlisten(this.onChange);
    }

    onChange(state) {


        if (!UserStore.isLoading()) {
            this.setState(state, () => {
                this.getMoreUsers();
            })
        } else {
            this.setState(state);
        }
    }

    clearAll() {
        UserActions.clearUsers();
    }


    likeAll() {
        UserActions.likeAll(this.state.account,
                            this.state.users)
            .then(() => UserActions.clearUsers());
    }

    changeUser(e, selectedIndex, menuItem) {
        console.log(menuItem);
    }

    changeFilter() {


        var value = React.findDOMNode(this.refs.filterInput).children[1];
        console.log(`

                value: ${value.value}
            `);
        this.setState({filterText: value.value});

    }

    render() {

        var users = this.state.users;

        // skifte route til en av brukerne
        if (!_.isEmpty(users)) {
            var currentRouteName = this.context.router.getCurrentPathname();
            if (currentRouteName === "/users") {
                var user = _.first(users);
                if (!_.isUndefined(user)) {
                    this.context.router.transitionTo(`/users/${user._id}`);
                }
            }
        }

        var userList;
        if (UserStore.isLoading()) {
            userList = <Spinner spinnerName='double-bounce' />;
        } else {
            userList = <UserList like={this.likeAll.bind(this)}
                                 clear={this.clearAll.bind(this)}
                                 filter={this.state.filterText}
                                 users={users}/>;
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
            <View column className="MaxUsers2">
                <View row style={{marginTop: "0px"}}>
                    <div className="row">
                        <DropDownMenu
                            onChange={this.changeUser.bind(this)}
                            menuItems={menuItems} />
                        <TextField
                            ref='filterInput'
                            style={{marginTop: "8px"}}
                            hintText="Bio filter: e.g., crossfit gaming"/>
                        <FlatButton
                            onClick={this.changeFilter.bind(this)}
                            label="Apply Filter" primary={true}
                        />
                    </div>
                </View>

                <View row>
                    <View column width="50%">
                        {userList}
                    </View>
                    <View style={{marginLeft: "2px", marginRight: "2px"}} column width="48%">
                        <RouteHandler
                            {...this.props}
                            key={this.props.params.userId}
                            account={_.first(this.state.accounts)}
                            users={this.state.users}/>
                    </View>
                </View>


            </View>
        );
    }
}
Users.contextTypes = {router: React.PropTypes.func.isRequired}
export default Radium(Users);
