import alt from '../alt';
import Radium from 'radium';

import UserActions from '../actions/UserActions';
import DumpStore from '../utils/DumpStore';

class UserStore {

    constructor() {
        this.users = [];
        this.bindListeners({
            handleFetchUsers: UserActions.FETCH_USERS,
            handleRemove: UserActions.REMOVE_USER
    	});
    }

    handleFetchUsers(users) {
        this.users = this.users.concat(users);
        DumpStore.write();
    }

    handleRemove(user) {
        console.log(user);
    }
}

export default alt.createStore(UserStore, 'UserStore');
