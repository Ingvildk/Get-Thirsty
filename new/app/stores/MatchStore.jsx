import alt from '../alt';
import MatchActions from '../actions/MatchActions';
import Radium from 'radium';
import _ from 'lodash';

class MatchStore {
	constructor() {
		this.match = [];
		this.errorMessage = null;

        this.bindListeners({
            handleFetchUsers: MatchActions.FETCH_USERS,
            handleAddUsers: MatchActions.ADD_USERS,
            handleFetchUser: MatchActions.FETCH_USER
    	});
	}


    handleFetchUser(userId) {

    }

    handleFetchUsers() {
    }

    handleAddUsers(users) {
        console.log('MatchStore is running');
        this.users = this.users.concat(users);
    }
}
export default alt.createStore(MatchStore, 'MatchStore');
