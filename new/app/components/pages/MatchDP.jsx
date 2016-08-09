import React from 'react';
import Router from 'react-router';
import ReactBootstrap from 'react-bootstrap';
import View from 'react-flexbox';

import Radium from 'radium';
import _ from 'lodash';
import AccountStore from '../../stores/AccountStore';
import ChatStore from '../../stores/ChatStore';



class MatchDP extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
	//	this.setState(AccountStore.getState());
		this.setState(ChatStore.getState());
	}

	componentDidMount() {
		var id = this.context.router.getCurrentParams().id;
	}
	backHandler(id) {
		this.context.router.transitionTo(`/match/${id}`);
	}

	getAge(dateString) {
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		    age--; }
		return age;
	}

	render() {
		var users = this.state.matches;
		console.log('The matches');
		console.log(users);
		var id = this.context.router.getCurrentParams().id;
		console.log('The id we will filter from');
		console.log(id);
		var user =
			_.filter(users, function(dict) {
				return dict.person._id == id;
			});
		user = user[0];
		console.log('The user');
		console.log(user);
        var photos = _.uniq(user.person.photos, (photo) => {
            return photo.url;
        }).map((photo, i) => {
            return (
            	<div>
                </div>
            );
        });
        if (user.common_friend_count > 0) {
        	var common_friends =
	        	(user.person.common_friends).map(function(friend) {
	        		return <span>{friend}</span>;
	        	});
        }else {
        	var common_friends =
        		<span>No common friends</span>;
        }
        if (user.common_like_count > 0) {
        	var common_likes =
        		(user.person.common_likes).map(function(like) {
        			return <span>{like},</span>;
        		})
        }else {
        	var common_likes =
        	 <span>No commen likes</span>;
        }

        var bDay = user.person.birth_date;
		bDay= bDay.substring(0,10);
		var age = this.getAge(bDay);
		var last_activity_date = (user.last_activity_date).substring(0,10)

	  return (
	      <div> </div>
		);
	}
}
MatchDP.contextTypes = {router: React.PropTypes.func.isRequired}

export default Radium(MatchDP);
