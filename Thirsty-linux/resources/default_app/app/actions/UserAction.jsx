import 'babel/polyfill';
import alt from '../alt';
import Radium from 'radium';

class userAction {
	fetchUsers() {
		this.dispatch();
		var that = this;
		//vent med aa gjore noe med denne. Hvis error slett og lag paa nytt
	}
	addCount(value) {
		this.dispatch(value);
	}
}
export default alt.createActions(userAction);