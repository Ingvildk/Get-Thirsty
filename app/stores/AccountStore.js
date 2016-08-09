import _ from 'lodash';
import Radium from 'radium';
import serialize from 'serialize-javascript';

import alt from '../alt';
import TinderAPI from '../utils/tinder';
import AccountActions from '../actions/AccountActions';

import DumpStore from '../utils/DumpStore';

class AccountStore {

    static config = {

        // dirty hack to avoid the token reauthentication process
        onDeserialize: function(data) {

            var that = this;

            data.accounts = _.map(data.accounts, (account) => {
                var client = new TinderAPI(account);
                return client;
            });

            data.account = _.first(data.accounts);
            data.loading = false;


            return data;
        }
    }

	constructor() {
		this.accounts = [];
        this.account = undefined;
        this.loading = false;

        this.bindListeners({
            createAccount: AccountActions.create,
            setActive: AccountActions.setActive,
            updateProfile: AccountActions.updateProfile,
            loadingAccount: AccountActions.loadingAccount,
            delete: AccountActions.delete
        });

        this.on('unlisten', () => {
            DumpStore.write();
        });

	}


	loadingAccount() {
        this.loading = !this.loading;
    }

	setActive(account) {
	    console.log(`setting ${account.email} as active`);
	    this.account = account;
        DumpStore.write();
    }


    updateProfile(account) {
        this.accounts = _.map(this.accounts, (acc) => {
            if (account.email == acc.email) {
                return account;
            } else {
                return acc;
            }
        });
        DumpStore.write();
    }

    delete(account) {

        console.log(`removing account: ${account.email}`);
	    this.accounts = _.filter(this.accounts, (acc) => {
	        return account.email !==  acc.email;
        });

        // if this was the active account use
        // the first account from now on
        if (account.email === this.account.email) {
            this.account = _.first(this.accounts);
        }

        DumpStore.write();
    }


    createAccount(account) {

        console.info(`Creating account for email: ${account.email} with pass: ${account.pass}`);

        var index = _.findIndex(this.accounts, function(acc) {
              return acc.email === account.email;
        });

        if (index === -1) {

            if (_.isEmpty(this.accounts)) {
                this.account = account
            }

            this.accounts = this.accounts.concat([account])

            DumpStore.write();
        }
    }
}
export default alt.createStore(AccountStore, 'AccountStore');
