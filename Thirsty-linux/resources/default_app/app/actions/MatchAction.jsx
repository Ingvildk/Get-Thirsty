import 'babel/polyfill';
import alt from '../alt';
import Radium from 'radium';

class matchAction {
	addMatch(user) {
		this.dispatch(user);
	}
	addChat(user) {
		this.dispatch(user);
	}
}
export default alt.createActions(matchAction);