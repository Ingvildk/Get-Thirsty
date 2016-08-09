import alt from '../alt';
import matchAction from '../actions/MatchAction';
import 'babel/polyfill';
import Radium from 'radium';

class matchStore {
	constructor() {
		this.match = [];
		this.errorMessage = null;
	
	this.bindListeners({
		handleAdduser: matchAction.ADD_MATCH
	});
	}

	handleAdduser(user) {
		this.match = this.match.concat(user);
		this.errorMessage = null;
	}

}
export default alt.createStore(matchStore, 'matchStore')