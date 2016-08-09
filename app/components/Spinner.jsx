import React from 'react';
import Radium from 'radium';

require('../css/loaders.min.css');
require('./yo.css');

var Loader = require('react-loaders').Loader;


class Spinner extends React.Component {

    render() {
        return <Loader type="ball-clip-rotate" />;
    }
}

export default Radium(Spinner);
