import alt from '../alt';
import Radium from 'radium';

class NotificationActions {

    sendMessage(message) {
        this.dispatch(message);
    }
}
export default alt.createActions(NotificationActions);
