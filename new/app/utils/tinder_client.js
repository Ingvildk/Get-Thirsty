"use strict";


var TINDER_HOST = "https://api.gotinder.com";
var request = require('request-promise');
var Promise = require('bluebird');
var axios = require('axios');

/**
 * Constructs a new instance of the TinderClient class
 *
 * @constructor
 * @this {TinderClient}
 */

class TinderClient {

    constructor() {
        this.xAuthToken = null;
        this.lastActivity = new Date();

        /**
         * The current profile's user id
         */
        this.userId = null;

        //this.tinderPost = this.tinderPost.bind(this);
    }

    /**
     * Helper for getting the request object
     * @param path {String} path the relative URI path
     * @param data {Object} an object of extra values
     */
    getRequestOptions(path, data) {

        var options = {
            url: TINDER_HOST + "/" + path,
            json: data
        };

        var headers = {
            'User-Agent': 'Tinder Android Version 2.2.3',
            'os_version': '16'
        };

        if (this.xAuthToken) {
            headers['X-Auth-Token'] = this.xAuthToken;
        }

        options.headers = headers;

        return options;
    }

    /**
     * Issues a GET request to the tinder API
     * @param {String} path the relative path
     * @param {Object} data an object containing extra values
     * @param {Function} callback the callback to invoke when the request completes
     */
    tinderGet(path, data) {
        var opts = this.getRequestOptions(path, data);
        opts.method = 'GET';
        return request(opts);
    }

    /**
     * Issues a POST request to the tinder API
     * @param {String} path the relative path
     * @param {Object} data an object containing extra values
     * @param {Function} callback the callback to invoke when the request completes
     */
    tinderPost(path, data, callback) {
        var opts = this.getRequestOptions(path, data);
        opts.method = 'POST';
        return request(opts);
    }

    /**
     * Gets a list of profiles nearby
     * @param {Number} limit the maximum number of profiles to fetch
     * @param {Function} callback the callback to invoke when the request completes
     */
    getRecommendations(limit) {

        var that = this;
        return this.tinderGet('user/recs', {
                limit: limit
            })
            .then((response) => {
                console.log(response);
                return response.results;
            });
    }



    updateProfile(options) {
        return this.tinderPost('profile', options)
                .then((response) => {
                return response;
            });
    }


    /**
     * Update search distance
     * @param {Number} distance the maximum distance for new users
     * @param {Function} callback the callback to invoke when the request completes
     */
    setSearchDistance(distance) {
        return this.tinderPost('profile', {
                distance_filter: distance
            })
            .then((response) => {
                console.log(response);
            });
    };


    getProfileInfo(callback) {
        return this.tinderGet('profile');
    };

    /**
     * Sends a message to a user
     * @param {String} userId the id of the user
     * @param {String} message the message to send
     * @param {Function} callback the callback to invoke when the request completes
     */
    sendMessage(userId, message) {
            return this.tinderPost('user/matches/' + userId, {
                message: message
            });
    };

    /**
     * Swipes left for a user
     * @param {String} userId the id of the user
     * @param {Function} callback the callback to invoke when the request completes
     */
    passUser(userId) {
        return this.tinderGet('pass/' + userId, null);
    };

    /**
     * Swipes right for a user
     * @param {String} userId the id of the user
     * @param {Function} callback the callback to invoke when the request completes
     */
    like(userId) {
        return this.tinderGet('like/' + userId, null);
    }


    requestToken(code, number) {
        return this.tinderPost('sendtoken', {
            "phone_number": `+[${code}][${number}]`
        });
    }

    sendCode(code) {
        return this.tinderPost('validate', {
            "token": `${code}`
        });
    }

    /**
     * Authorize this tinder client
     * @param {String} fbToken the Facebook token. This will be obtained when authenticating the user
     * @param {String} fbId the Facebook user id.
     * @param {Function} callback the callback to invoke when the request completes
     */
    _authorize(credentials) {

        var facebookId = credentials.facebookId;
        var accessToken = credentials.accessToken;

        var that = this;

        return that.tinderPost('auth', {
                facebook_token: accessToken,
                facebook_id: facebookId
            })
            .then((body) => {
                if (body.token) {

                    that.xAuthToken = body.token;
                    console.log(that.xAuthToken);
                    that.userId = body.user._id;
                    that.defaults = body;

                    return "OK";
                }
            });
    };

    /**
     * Returns whether this client is authorized
     * @return whether or not this client is authorized
     */
    isAuthorized() {
        return this.xAuthToken != null;
    }


    /**
     * Returns client information and globals
     * Globals are used for interacting with tinder api limits
     */
    getDefaults()  {
        return this.defaults;
    }

    /**
     * Gets a list of new updates. This will be things like new messages, people who liked you, etc.
     * @param {Function} callback the callback to invoke when the request completes
     */
    //this.getUpdates = function(callback) {
    //  tinderPost('updates',
    //    {
    //      last_activity_date: lastActivity.toISOString()
    //    },
    //    makeTinderCallback(function(err, data){
    //      lastActivity = new Date(data.last_activity_date);

    //      if (callback) {
    //        callback(err, data);
    //      }
    //    }));
    //};

    /**
     * Gets the entire history for the user (all matches, messages, blocks, etc.)
     *
     * NOTE: Old messages seem to not be returned after a certain threshold. Not yet
     * sure what exactly that timeout is. The official client seems to get this update
     * once when the app is installed then cache the results and only rely on the
     * incremental updates
     * @param {Function} callback the callback to invoke when the request completes
     */
    getHistory() {
        return this.tinderPost('updates', {
            last_activity_date: ""
        });
    };

    ///**
    // * Updates the position for this user
    // * @param {Number} lon the longitude
    // * @param {Number} lat the latitutde
    // * @param {Function} callback the callback to invoke when the request completes
    // */
    updatePosition(lat, lon) {
        return this.tinderPost('user/ping', {
            lon: lon,
            lat: lat
        });
    };

    ///**
    // * Get user by id
    // * @param {String} userId the id of the user
    // * @param {Function} callback the callback to invoke when the request completes
    // */
    getUser(userId) {
        return this.tinderGet('user/' + userId, null);
    }

}

module.exports = TinderClient;
