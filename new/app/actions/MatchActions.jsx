import 'babel/polyfill';
import alt from '../alt';
import Radium from 'radium';
import D from '../../data.js';
var Data = D.person;
class MatchActions {

	fetchUsers() {
	    this.dispatch();
        this.actions.addUsers(Data);
	}

	fetchUser(userId) {
	    this.dispatch();
    }

	addUsers(users) {
		console.log("MatchActions is running");
		console.log(users);
	    this.dispatch(users);
    }

}
export default alt.createActions(MatchActions);