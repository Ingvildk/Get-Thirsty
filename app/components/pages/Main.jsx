
import React from 'react';
import Radium from 'radium';
import mui from 'material-ui';

import View from 'react-flexbox';
import User from '../User';
import UserList from '../UserList';

var {RaisedButton} = mui;

var styles = {
};


import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';


class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillMount() {
        this.setState(UserStore.getState());
        UserActions.fetchUsers();
    }

    componentWillUnmount() {
    }

    storeChanged(state) {
    }

    render() {
        var users = this.state.users;
        return (
            <View row>
                <View column width="50%">
                    <UserList users={users}/>
                </View>
                <View column width="50%">
                    <User/>
                </View>
            </View>
        );
    }
}

export default Radium(Main);
