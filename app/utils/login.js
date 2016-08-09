var fs = require('fs');
var url = require('url');
var ipc = require('ipc');
var _ = require('underscore');
var request = require('request-promise');
var Promise = require('bluebird');
var ipc = require('ipc');


function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function facebookCredentials(email, pass) {


    ipc.send('delete-cookies');

    //var webview = document.createElement('webview');
    //webview.setAttribute("preload", "./com.js");
    //document.body.appendChild(webview);
    //
    var webview = document.querySelector('webview');
    //console.log(webview);
    //webview.setAttribute("src", "http://www.google.com");

    var accessToken;
    var facebookId;

    webview.addEventListener('console-message', function(e) {
        console.log("LOG FROM WEBVIEW: " + e.message);
    });

    webview.addEventListener('ipc-message', function(event) {

        switch (event.channel) {
            case 'id':
                facebookId = event.args[0];
                break;
        }

    });

    function webviewFunction(func) {
        function wrap() {
            webview.removeEventListener("dom-ready", wrap);
            func();
        }
        webview.addEventListener("dom-ready", wrap);
    }

    function login() {

        console.log(`

                trying to fucken login
        `);

        webview.src = "https://www.facebook.com/dialog/oauth?client_id=464891386855067&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=basic_info,email,public_profile,user_about_me,user_activities,user_birthday,user_education_history,user_friends,user_interests,user_likes,user_location,user_photos,user_relationship_details&response_type=token";

        webviewFunction(function () {

            webview.send("login", {email: email, pass: pass});

            webviewFunction(function () {

                var currentUrl = webview.getUrl();
                var pattern = /.*access_token=(.*)&.*/;
                var match = pattern.exec(currentUrl);

                webview.send("ok");

                // is this the right URL?
                if (match !== null) {
                    accessToken = match[1];
                    console.log(accessToken);

                    webviewFunction(() => {
                        webview.send("confirm");
                    });

                    getId();
                }
            });

        });
    }

    function getId() {
        request({
            method: 'GET',
            uri: 'https://graph.facebook.com/me?access_token=' + accessToken
        }).then((response) => {
            var data = JSON.parse(response);

            facebookId = data.id;
        });
    };

    webviewFunction(function ()  {
        //webview.openDevTools();
        webview.send("clear-cookies");
        login()
    });

    return new function () {

        this.cancel = function () {
            console.log(webview);
        }

        this.getAccessToken= function () {
            return accessToken;
        }

        this.getFacebookId = function () {
            return facebookId
        }
    }
}

module.exports =
    function login(email, pass) {
        return new Promise(function (resolve, reject) {
                var fb = facebookCredentials(email, pass);
                var then = moment(new Date());
                (function waitForAuth() {
                    if (! _.isUndefined(fb.getFacebookId())) {
                        return resolve({accessToken: fb.getAccessToken(),
                                        facebookId: fb.getFacebookId()});
                    }

                    var now = moment(new Date());

                    if (now.diff(then) > 60000) {
                        fb.cancel();
                        return reject("failure");
                    }

                    setTimeout(waitForAuth, 200);
                })();
            });
    };
