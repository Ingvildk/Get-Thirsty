import alt from '../alt';
import NotificationActions from '../actions/NotificationActions';
import Radium from 'radium';
import _ from 'lodash';

class NotificationStore {
	constructor() {
		this.messages = undefined;
		this.errorMessage = null;
	
        this.bindListeners({
            handleAddMessage: NotificationActions.SEND_MESSAGE
    	});
	}

    handleAddMessage(message) {
        this.message = message;
    }
   
}
export default alt.createStore(NotificationStore, 
    'NotificationStore');