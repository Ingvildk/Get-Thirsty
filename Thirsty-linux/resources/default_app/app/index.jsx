import _ from 'lodash';
import React from 'react';
import Router from 'react-router';
import ipc from 'ipc';

import App from './components/Application';
import routes from './routes';
import alt from './alt';
import DumpStore from './utils/DumpStore';

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


var snapshot = DumpStore.read();

if (!_.isNull(snapshot)) {
    console.log(`Restoring alt.js snapshot`);
    alt.bootstrap(JSON.parse(snapshot));
}

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
