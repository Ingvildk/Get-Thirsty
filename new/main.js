/* eslint no-path-concat: 0, func-names:0 */
var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');
var ipc = require('ipc');
var menu;
var template;


require('electron-debug')();
require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit();
});


app.on('ready', function() {
    app.commandLine.appendSwitch('js-flags', '--harmony_arrow_functions');
    mainWindow = new BrowserWindow({
            width: 1300,
            height: 800,
            'min-width': 1300,
            'min-height': 800,
            resizable: false,
            'standard-window': false,
            fullscreen: false,
            frame: true
        });




  //if (process.env.HOT) {
   // mainWindow.loadUrl('file://' + __dirname + '/app/hot-dev-app.html');
  //} else {
    mainWindow.loadUrl('file://' + __dirname + '/app/app.html');
  //}

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  //if (process.env.NODE_ENV === 'development') {
  //mainWindow.openDevTools();
  //}

    template = [];

    console.log('!!')
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  
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


