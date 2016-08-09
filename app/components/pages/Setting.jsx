import _ from 'lodash';

import React from 'react';
import Radium from 'radium';
import mui from 'material-ui';
import View from 'react-flexbox';
import Router from 'react-router';
import Spinner from '../Spinner';

import Login from '../Login';
import AccountList from '../AccountList';
import AccountStore from '../../stores/AccountStore';
import AccountActions from '../../actions/AccountActions';


var {RouteHandler} = Router;
var {FlatButton, TextField, Checkbox, Slider} = mui;

class Settings extends React.Component {

    state = _.merge({}, AccountStore.getState());

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        AccountStore.listen(this.onChange);
    }

    componentWillUnmount() {
        AccountStore.unlisten(this.onChange);
    }

    onChange(state) {
        console.log(state);
        this.setState(state);
    }

    choose(user) {
        AccountActions.setActive(user);
    }

    delete(user) {
        AccountActions.delete(user);
    }

	render() {

	    var login = <Login loading={this.state.loading}/>;
	    //if (this.state.loading) {
        //    login = <Spinner spinnerName='double-bounce' />
        //} else {
        //    login = <Login />
        //}

        return (
            <View column>
                <View row style={{marginTop: "5px"}}>
                    {login}
                </View>
                <View row>
                    <View column width="30%">
                        <AccountList
                            choose={this.choose.bind(this)}
                            delete={this.delete.bind(this)}
                            users={this.state.accounts}/>
                    </View>
                    <View
                        style={{marginLeft: "2px", marginRight: "2px"}}
                        column width="58%">
                        <RouteHandler
                            {...this.props}
                            key={this.props.params.email}
                            account={this.state.account}
                            users={this.state.accounts}/>
                    </View>
                </View>
            </View>
        );
	}
}
export default Radium(Settings);
