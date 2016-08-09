import alt from '../alt';
import Radium from 'radium';


import moment from 'moment';
import data from '../mock/data';
import persons from '../mock/chatPerson2';
import guid from '../utils/uuid';

class ChatActions {


    addMessage(account, user, messageText) {


        var date = moment();

        this.dispatch(
            {
                "_id": guid(),
                "match_id": "54cdeda79b0d64435a711c2755a88038f79a88b110194e74",
                "to": "55a88038f79a88b110194e74",
                "from": "54cdeda79b0d64435a711c27",
                "message": messageText,
                "sent_date": date.format(),
                "created_date": date.format(),
                "timestamp": date.unix()
            }
        );
    }


    sendMessage(account, user, messageText) {

        this.actions.addMessage(account, user, messageText);

        account.sendMessage(user, messageText)
            .then((response) => {
                this.dispatch(response)
            })
            .catch((error) => {
                console.log(error)
            });
    }


    getHistory(account) {
        account.getHistory()
            .then((response) => {
                this.dispatch(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
export default alt.createActions(ChatActions);
