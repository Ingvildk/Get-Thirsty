import _ from 'lodash';
import Radium from 'radium';

import alt from '../alt';
import AccountActions from './AccountActions';

function delay(time) {
    return new Promise(function (fulfill) {
        setTimeout(fulfill, time);
    });
}

class UserActions {

    constructor() {
        this.generateActions(
            "success",
            "receivedUsers",
            "fetchRemoteUsers",
            "fetchUsersFailed"
        );
    }

    getUsers() {
        this.dispatch();
    }

    clearUsers() {
        this.dispatch();
    }

    likeAll(account, users) {

        var actions = this.actions;
        var size = _.size(users);
        var that = this;

        var likeUser = (user) => {
            return account.like(user._id)
                    .then((response) => {
                        console.log(response);
                        response = JSON.parse(response);
                        if (response.match) {
                            actions.matchUser(account, user);
                        }
                        return response;
                });
        };

        var requests = _.reduce(users, (cur, user) => {
            return cur
                    .then(_.partial(delay, 220))
                    .then(_.partial(likeUser, user));
        }, Promise.resolve());


        return requests;

    }


	removeUser(user) {
	    this.dispatch(user);
    }

    matchUser(account, user) {
        console.log('its a match!');
    }

    passUser(account, user) {

        this.actions.removeUser(user);
	    account.passUser(user).then((response) => {
        });
    }

	likeUser(account, user) {
        this.actions.removeUser(user);
	    account.like(user).then((response) => {

	        response = JSON.parse(response);
	        if (response.match) {
                this.actions.matchUser(account, user);
            }
        });
    }

}
export default alt.createActions(UserActions);
