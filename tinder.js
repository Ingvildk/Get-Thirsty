"use strict";

var fs = require('fs');
var _ = require('underscore');
var Promise = require('bluebird');
var tinder = require('./tinder_client');

class TinderAPI {

    constructor(credentials) {
        this.accessToken = credentials.accessToken;
        this.facebookId = credentials.facebookId;
        this.client = new tinder.TinderClient();
        this.isAuthenticated = false;
        this.authInProgress = false;
    }

    ensureAuthenticated() {
        var that = this;
        return new Promise(function (resolve, reject) {
            (function waitForAuth(){
                console.log("polling");
                if (that.isAuthenticated) {
                    return resolve();
                }
                setTimeout(waitForAuth, 200);
            })();
        });
    }

    authorize() {
        var auth = Promise.promisify(this.client.authorize);
        var that = this;

        this.authInProgress = true;

        auth(this.accessToken, this.facebookId).then(() => {
            that.isAuthenticated = true;
            that.authInProgress = false;
        });
    }

    getRecommendations(n) {
        var getRecommendations = Promise.promisify(this.client.getRecommendations);
        return this.ensureAuthenticated().then(() => getRecommendations(n));
    }

    sendMessage(userId, message) {
        var sendMessage = Promise.promisify(this.client.sendMessage);
        return this.ensureAuthenticated().then(() => getRecommendations(n));
    }

    like(userId) {
        var like = Promise.promisify(this.client.like);
        return this.ensureAuthenticated().then(() => like(userId));
    }

    pass(userId) {
        var pass = Promise.promisify(this.client.pass);
        return this.ensureAuthenticated().then(() => pass(userId));
    }
}

var credentials =  {
    accessToken: "CAAGm0PX4ZCpsBALIiwE4IgnYxV2aScvR61WZCfgoOfkIZAsZAaguP79j8SoKyXzqZBkQbVNTsbG2WMQwvesugH34cZCznzwGU384XlZCZCypPnLsMTef9WJZAeBvITOZACIIyLfQfgQtmC0OsFmd2oKymEDTNDWAhWAx6IYUsnAJrUpKd9xwJtH42ltcIuDtMiap7RS9ZAsoHhOIpKctu1MMmvAZBr9WioGxLOcZD",
    facebookId: "100009098490157"
};

var client = new TinderAPI(credentials);
client.authorize();
