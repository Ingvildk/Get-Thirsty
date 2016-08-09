import _ from 'lodash';

import alt from '../alt';


class AccountActions {

    constructor() {
        this.generateActions('create');
    }

	connect(account) {

        var result = {accessToken: 'CAAGm0PX4ZCpsBADlVErAOVb5EPAsg8jnrrZAuFQ1lifYVGs6A5gcgizZAeicGGU7RaGyoBudK7QKo7NR2BncZBLTJgEHVtyKlQiGzhqMhmO2p0h1L9bhXAv9XWWdRLJ0D2sp7TMvMjvG0F225RNA2rKAXyOTVNC3I0UFjGANCiXyW3BiuXOZCDktL4Tbz6dLjU9JILyEPMm4QC7QXXLY5',
                      facebookId: '100009098490157'};

        var that = this;
        var client = new TinderAPI(result);

        client.authorize().then((response) => {
            that.dispatch({email: account.email, client: client});
        });
    }
}

export default alt.createActions(TinderActions);
