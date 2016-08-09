import _ from 'lodash';

import React from 'react';
import Radium from 'radium'
import mui from 'material-ui';
import moment from 'moment';
import View from 'react-flexbox';




export default class TimeAgo extends React.Component {


    constructor() {
        super();
        this.update = this.update.bind(this);
    }
    componentDidMount() {
        var {interval} = this.props;
        setInterval(this.update, interval);
    }

    componentWillUnmount() {
        clearInterval(this.update);
    }

    update() {
        this.forceUpdate();
    }

    render() {


        console.log("re-rendering!");

        return (
            <span>
                {moment(this.props.time).fromNow()}
            </span>
        );
  }
};

module.exports = TimeAgo;
