import _ from 'lodash';

import alt from '../alt';
import ChatActions from '../actions/ChatActions';
import Radium from 'radium';

import DumpStore from '../utils/DumpStore';

class ChatStore {

    constructor() {
        this.matches = [];
        this.last_activity_date = undefined;

        this.bindListeners({
            handleGetHistory: ChatActions.GET_HISTORY,
            handleAddMessage: ChatActions.addMessage
        });
    }

    handleAddMessage(message) {


        console.log(message);

        this.matches =
            _.map(this.matches, (match) => {

                if (match._id == message.match_id) {
                    console.log(match.person);
                    match.messages = match.messages.concat([message])
                }

                return match;
            });

        console.log(this.matches);
    }

    handleGetHistory(update) {
        this.last_activity_date = update.last_activity_date;
        this.matches = update.matches;

        DumpStore.write();
    }

}
export default alt.createStore(ChatStore, 'ChatStore');
