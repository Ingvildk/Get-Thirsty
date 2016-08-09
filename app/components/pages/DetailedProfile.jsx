import React from 'react';
import Router from 'react-router';
import ReactBootstrap from 'react-bootstrap';
import View from 'react-flexbox';

import Radium from 'radium';
import _ from 'underscore';
import UserStore from '../../stores/UserStore';
import AccountStore from '../../stores/AccountStore';

var { Col, Grid, Row, Button, Thumbnail } = ReactBootstrap;

let styles = {
	back: {
		marginLeft: "100px",
	},
    list: {
        overflowY: "auto",
        height: "75vh",
        minHeight: "75vh",
        maxHeight: "75vh",
        position: "relative",

    },
    main: {
    	height: "55vh",
    	minHeight: "55vh",
    	maxHeight: "55vh",
    },
};


class DetailedProfile extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.setState(UserStore.getState());
		this.setState(AccountStore.getState());
	}

	componentDidMount() {
		var id = this.context.router.getCurrentParams().id;
	}
	backHandler(id) {
		this.context.router.transitionTo(`/users/${id}`);
		
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
		var users = this.state.users;

		var id = this.context.router.getCurrentParams().id;
		var user = 
			_.filter(users, function(dict) {
				return dict._id == id;
			});	
		user = user[0];
        var photos = _.uniq(user.photos, (photo) => {
            return photo.url;
        }).map((photo, i) => {
            return (
            	<div>
	            	<Col xs={6} md={4}>
	            	</Col>
	                <Col xs={6} md={4}>
	                <img style={[styles.main]} key={`${photo.url}`} src={photo.processedFiles[0].url}/>
	                </Col>
                </div>
            );
        });
        if (user.common_friend_count > 0) {
        	var common_friends =
	        	(user.common_friends).map(function(friend) {
	        		return <span>{friend}</span>;
	        	});
        }else {
        	var common_friends = 
        		<span>No common friends</span>;
        }
        if (user.common_like_count > 0) {
        	var common_likes = 
        		(user.common_likes).map(function(like) {
        			return <span>{like},</span>;
        		})
        }else {
        	var common_likes =
        	 <span>No commen likes</span>;
        }

        var bDay = user.birth_date;
		bDay= bDay.substring(0,10);
		var age = this.getAge(bDay);

	  return (
	  	 <View row>
	  	    <View column width="50%">
		  	  <div style={[styles.list]}>
			  	{photos}
			  </div>
		    </View>
		    <View style={{marginLeft: "2px", marginRight: "2px", marginTop:"5px"}} column width="48%">
		    	<div><h2>{user.name}, {age} <button style={[styles.back]} onClick={this.backHandler.bind(this)}>Back</button></h2></div>
		    	<p>{user.bio}</p>
		    	<p><em>{common_friends}</em></p>
		    	<p><em>{common_likes}</em></p>
		    </View>
		 </View>	    
		);
	}
}
DetailedProfile.contextTypes = {router: React.PropTypes.func.isRequired}

export default Radium(DetailedProfile);
