import alt from '../alt';
import matchAction from '../actions/MatchAction';
import 'babel/polyfill';
import Radium from 'radium';

class chatStore {
	constructor(){
		this.chat = [];

	this.bindListeners({
		handleAddchat: matchAction.ADD_MATCH,
		handleAddM: matchAction.ADD_CHAT
	});
	}
	handleAddchat(user){
		var currentdate = new Date();
		currentdate = currentdate.getTime();
		user['date'] = currentdate;
		user['message'] = "";
		this.chat = this.chat.concat([user]);
	}
	handleAddM(user) {
		var currentdate = new Date();
		currentdate = currentdate.getTime();
		user['date'] = currentdate;
		this.chat = this.chat.concat([user]);
	}
}
export default alt.createStore(chatStore, 'chatStore');
