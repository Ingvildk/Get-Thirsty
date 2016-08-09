var fs = require('fs');
var url = require('url');
var ipc = require('ipc');

function facebookCredentials(email, pass) {

    var webview = document.getElementById("webview");

    var accessToken;
    var facebookId;

    webview.addEventListener('console-message', function(e) {
        console.log(e.message);
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

    webview.addEventListener('console-message', function(e) {
        console.log('LOG FROM GUEST:', e.message);
    });

    function login() {
        webview.src = "https://www.facebook.com/dialog/oauth?client_id=464891386855067&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=basic_info,email,public_profile,user_about_me,user_activities,user_birthday,user_education_history,user_friends,user_interests,user_likes,user_location,user_photos,user_relationship_details&response_type=token";


        webviewFunction(function () {
            webview.send("login");

            var currentUrl = webview.getUrl();
            var pattern = /.*access_token=(.*)&.*/;
            var match = pattern.exec(currentUrl);

            // is this the right URL?
            if (match !== null) {
                accessToken = match[1];
            }

            getId();
        });
    }

    function getId() {
        webview.src = "https://www.facebook.com";
        webviewFunction(function () {
            webview.send('idPage');
            webviewFunction(function() {
                webview.send('id');
            });
        });
    };

    webviewFunction(login);

    return new function () {
        this.getAccessToken= function () {
            return accessToken;
        }

        this.getFacebookId = function () {
            return facebookId
        }
    }
}

//var c = facebookCredentials();

var credentials = {accessToken: "CAAGm0PX4ZCpsBAPOGVRurMwV94zLZCRjut8KmrTDbCDFMqpHN01VdrC7fmyppSbuf2NYorbPJ0TawEsDVPYW492nwnfaN3VZB50L4NWOsyuavgidmC6QAF4tZA4Me2QOJaVwAs7yluvZBHpWstU8I72S3RorBZAP3vGSG4YZAZBCl6ub8hDIlRhdFMj7tbnwZC2cyncxn6AuZBDzoZCcxpvzZCdPLQnxViNZCB0IZD",
                   facebookId: "100009098490157"}


var tinder = require('tinderjs');
var client = new tinder.TinderClient();


client.authorize(
  credentials.accessToken,
  credentials.facebookId,
  function() {
    client.getRecommendations(10, function(error, data){
      console.log(data.results);
    });
  });
