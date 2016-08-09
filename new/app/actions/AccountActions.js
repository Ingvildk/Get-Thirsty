import _ from 'lodash';

import alt from '../alt';
import login from '../utils/login';
import TinderAPI from '../utils/tinder';
import NotificationActions from './NotificationActions';



class AccountActions {

    constructor() {
        this.generateActions('setActive', 'loadingAccount');
    }

    delete(account) {
        NotificationActions.sendMessage(`Removed account ${account.email}`)
        this.dispatch(account);
    }

    updateProfile(account, data) {
        console.log(data);
        account.updateProfile(data)
            .then(() => {
                console.log(`
                    lat: ${data.lat}
                    lon: ${data.lon}`);
                return account.updatePosition(data.lat, data.lon);
            })
            .then(() => {
                return account.getProfileInfo();
            })
            .then((profile) => {
                profile = JSON.parse(profile);
                account.profile = profile;
                this.dispatch(account);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    create(credentials) {

        console.log(`called once?`)
        var that = this;
        var client = new TinderAPI(credentials);


        this.actions.loadingAccount();
        NotificationActions.sendMessage(`Logging in as ${credentials.email}`);

        client.authorize()
            .catch((error) => {
                console.log(error);

                throw Error(error);
            })
            .then(() => {
                return client.getProfileInfo();
            })
            .then((profile) => {
                profile = JSON.parse(profile);
                client.profile = profile;
                this.dispatch(client);

                NotificationActions.sendMessage(`Successfully added account: ${credentials.email}`);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {

                console.log('should flip it here!');
                this.actions.loadingAccount();
            });

    }
}

export default alt.createActions(AccountActions);
