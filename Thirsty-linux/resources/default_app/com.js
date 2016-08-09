var ipc = require('ipc');


function eraseCookieFromAllPaths(name) {
    // This function will attempt to remove a cookie from all paths.
    var pathBits = location.pathname.split('/');
    var pathCurrent = ' path=';

    // do a simple pathless delete first.
    document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';

    for (var i = 0; i < pathBits.length; i++) {
        pathCurrent += ((pathCurrent.substr(-1) != '/') ? '/' : '') + pathBits[i];
        document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;' + pathCurrent + ';';
    }
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}



ipc.on('clear-cookies', function () {
    console.log("deleting all cookies");
    console.log(document.cookie);
    document.cookie.split(";").forEach(function(c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    //eraseCookieFromAllPaths("/");
    //deleteAllCookies();
    localStorage.clear();
    console.log(document.cookie);
});

ipc.on('source', function() {
    var markup = document.documentElement.innerHTML;
    ipc.sendToHost('html', markup);
});

ipc.on('login', function() {

    ipc.sendToHost('html', "hteokhoe");

    console.log("LOGIN");

    var email = "kyrre@allekjenneringvild.com"
    var password = "hehheh"

    var email_input = document.getElementById('email');
    var pass_input = document.getElementById('pass');

    email_input.value = email;
    pass_input.value = password;

    var button = document.getElementById('loginbutton');

    button.click();
});

ipc.on('idPage', function() {
    var url = document.querySelector('a[title=Profile]').href
    window.location.href = url;
});

ipc.on('id', function() {
    var markup = document.documentElement.innerHTML;
    var pattern = /\{"profile_id":([0-9]*),.*/;
    var match = pattern.exec(markup);

    if (match !== null) {
        var fb_id = match[1];
        var button = document.querySelector("a[aria-controls=userNavigation]");
        button.click();

        //onload = function () {
        //    document.querySelector("form[action='https://www.facebook.com/logout.php']").click()
        //    console.log('logging out');
        //}

        ipc.sendToHost('id', fb_id);
    }
});


ipc.on('logout', function() {
    document.querySelector("form[action='https://www.facebook.com/logout.php']").click()
    console.log('logging out');
});
