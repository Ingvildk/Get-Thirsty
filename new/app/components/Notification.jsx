import React from 'react';
import Radium from 'radium'
import mui from 'material-ui';
import _ from 'lodash';

import NotificationStore from '../stores/NotificationStore';
import NotificationActions from '../actions/NotificationActions';

var {Snackbar} = mui;

class Notification extends React.Component {

	state =  _.merge(
			{autoHideDuration: 3000, message: undefined},
			 NotificationStore.getState());

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.dismiss = this.dismiss.bind(this);
	}

	componentDidMount() {
		NotificationStore.listen(this.onChange);
	}

	 componentWillUnmount() {
        NotificationStore.unlisten(this.onChange);
    }

	handleClick() {
		NotificationActions.sendMessage(Math.random());
	}

	onChange(state) {
		this.setState(state,  () => {
			this.refs.snackbar.show();
		});
	}

	dismiss() {
		this.refs.snackbar.dismiss();
	}

	render() {

		return (
                <Snackbar
                    ref="snackbar"
                    action="Dismiss"
                    onActionTouchTap={this.dismiss}
                    message={this.state.message}
                    autoHideDuration={this.state.autoHideDuration}
                    />
			);
	}
}
export default Radium(Notification);
