"use strict";

var fs = require('fs');
var _ = require('lodash');
var Promise = require('bluebird');
var login = require('./login');
var TinderClient = require('./tinder_client');
var merge = require('deepmerge')


class TinderAPI extends TinderClient {

    constructor(props) {

        super();

        this.isAuthenticated = false;
        this.authInProgress = false;
        this.loginStale = true;
        this.authenticationStatus = undefined;

        // If we pass in properties such as
        // props = {email: ..., pass: ...}
        // set them here!
        //
        var properties = merge(this, props);
        for (let key in properties) {
            this[key] = properties[key];
        }
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

    getTokens() {

        var accessToken = this.accessToken;
        var facebookId = this.facebookId;

        var that = this;

        if (this.loginStale) {
            this.loginStale = false;
            return login(this.email, this.pass)
                .then((tokens) => {
                    that.accessToken = tokens.accessToken;
                    that.facebookId = tokens.facebookId;

                    return tokens;
                });
        } else {
            return new Promise((resolve, reject) => {
                resolve({accessToken: accessToken,
                         facebookId: facebookId});
            });
        }

    }

    serialize() {
        return JSON.stringify(this);
    }

    authorize(email, pass) {
        var that = this;

        return this.getTokens()
                    .then((response) => {
                        return that._authorize(response);
                    })
                    .then(() => {

                        console.log(`not called`)
                        that.isAuthenticated = true;

                        return that;
                    })
                     .catch((error) => {

                        console.log(`should have failed!`)

                        that.authFailed = true;
                        that.isAuthenticated = false;

                        console.log(error);

                        switch(error) {
                            case "Access Denied":
                                that.loginStale = true;
                                break;
                        };

                        return that;
                    })
                    .finally(() => {
                        that.authInProgress = false;
                    });
    }
}

module.exports = TinderAPI;
