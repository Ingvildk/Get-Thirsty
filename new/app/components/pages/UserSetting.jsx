import _ from 'lodash';

import React from 'react';
import Radium from 'radium';
import mui from 'material-ui';
import View from 'react-flexbox';
import Router from 'react-router';


import Login from '../Login';
import AccountList from '../AccountList';
import AccountStore from '../../stores/AccountStore';
import AccountActions from '../../actions/AccountActions';

import Setting from '../Setting';


var {RouteHandler} = Router;
var {FlatButton, TextField, Checkbox, Slider} = mui;

class UserSetting extends React.Component {

    constructor(props) {
        super(props);
    }
	render() {

        var email = this.props.params.email;
        var user = _.first(_.filter(this.props.users, (user) => {
            return user.email === email;
        }));


        if (_.isUndefined(user)) {
            return <div/>;
        }
        else {
            return (
                <Setting user={user}/>
            );
        }
	}
}
export default Radium(UserSetting);
