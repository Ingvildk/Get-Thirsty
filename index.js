var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc = require('ipc');

console.log("htueothu");

var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {

    app.commandLine.appendSwitch('js-flags', '--harmony_arrow_functions');
    mainWindow = new BrowserWindow({
            width: 1300,
            height: 800,
            'min-width': 1000,
            'min-height': 600,
            resizable: false,
            'standard-window': false,
            fullscreen: false,
            frame: true
        });

    //mainWindow.loadUrl('file://' + __dirname + '/index.html');

    mainWindow.webContents.on('did-finish-load', function() {
    });

    mainWindow.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });

});

ipc.on('delete-cookies', function(event, arg) {
    console.log("DELETING COOKIES");
    mainWindow.webContents.session.clearStorageData(
            'http://'
            ['cookies'],
            function (response) {
                console.log(response);
            });

        mainWindow.webContents.session.clearCache(function (response) {
            console.log("cleared cache");
        });

        mainWindow.webContents.session.cookies.get({}, function(error, cookies) {
            if (error) throw error;
            console.log(cookies);
        });


    //event.sender.send('delete-cookies-reply', 'pong');
});


