import _ from 'lodash';
import alt from '../alt';
import Radium from 'radium';

import UserActions from '../actions/UserActions';
import UserSource from '../sources/UserSource';
import DumpStore from '../utils/DumpStore';

class UserStore {

    static config = {
        onDeserialize: function(data) {
            data.loadingUsers = false;
            return data;
        }
    }

    constructor() {
        this.bindActions(UserActions);
        this.registerAsync(UserSource);
        this.state = {users: [],
                      loadingUsers: false}

    }

    onSuccess(state) {
    }

    onReceivedUsers(newUsers) {

        let users = this.state.users;
        this.setState({
                users: users.concat(newUsers)
        })

        DumpStore.write();
    }

    onLoading() {
        this.setState({
            loadingUsers: !this.state.loadingUsers
        });
    }

    onClearUsers() {
        this.setState({users: []});
        DumpStore.write();
    }

    onFetchUsers(newUsers) {
        let users = this.state.users;
        this.setState({
                users: users.concat(newUsers)
        })

        DumpStore.write();
    }

    onRemoveUser(userId) {
        let users = _.filter(this.state.users, (user) => {
            return user._id != userId;
        });
        this.setState({users: users});
        DumpStore.write();

    }
}

export default alt.createStore(UserStore, 'UserStore');
