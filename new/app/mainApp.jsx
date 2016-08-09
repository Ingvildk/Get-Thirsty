import _ from 'lodash';
import React from 'react';
import Router from 'react-router';
import ipc from 'ipc';

import App from './components/Application';
import router from './routes/router';
import alt from './alt';
import DumpStore from './utils/DumpStore';
import debug from './utils/debug';


let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var dd = debug('mainApp');

var snapshot = DumpStore.read();

if (!_.isNull(snapshot)) {
    console.log(`Restoring alt.js snapshot`);
    alt.bootstrap(JSON.parse(snapshot));
}

window.location.hash = '/';

router.run(Handler => {
    dd('router.run', Handler);
    React.render( < Handler / > , document.getElementById('app'));
});
