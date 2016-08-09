import 'babel/polyfill';

import React from 'react';
import Router from 'react-router';
import ReactBootstrap from 'react-bootstrap';
import ReactRouterBootstrap from 'react-router-bootstrap';
import Profile from './Profile';
import userStore from '../../stores/UserStore';
import matchAction from '../../actions/MatchAction';
import matchStore from '../../stores/MatchStore';
import userAction from '../../actions/UserActions';
import Radium from 'radium';

var { Route, DefaultRoute, RouteHandler, Link } = Router;
var { Input, Grid, Row, Col, Button, Thumbnail } = ReactBootstrap;
var {NavItemLink, ButtonLink, ListGroupItemLink} = ReactRouterBootstrap;
var styles = {};

class Home extends React.Component {

	constructor(props){
		super(props);
		this.state = userStore.getState();
	}
	likeHandler(user) {
		matchAction.addMatch(user);
		var count = ((this.state.count) + 1 );
		/*matchAction.addMatch(user);*/
		userAction.addCount(count);
		this.setState({
			count: count,
			match: matchStore.getState()
		});
	}
	sweipHandler() {
		var count = ((this.state.count) + 1 );
		userAction.addCount(count);
		this.setState({
			count: count
		});
	}

	render() {
		var count = this.state.count;
		if( this.state.user.length <= count ) {
			return (<p>LOADING MORE USERS.. </p>);
		} else {
			var user = this.state.user;
			var match = this.state.match.match;
			for( var el in match) {
				if (match[el].img == user[count].img) {
					var count = ((this.state.count) + 1 );
					userAction.addCount(count);
					this.setState({
						count: count
					});
				}}
					return (
					<div className='home'>
					  <Grid>
					  	<br/>
					    <Row>
					    <Col xs={2} md={3}>
					    </Col>
					    <Col xs={8} md={7}>
					      <Thumbnail src={"./" + user[count].img} alt='450x350'>
					        <p className='name'><b>{user[count].name}</b></p>
					        <Link to='profile' params={{id :(user[count].id)}}><p>{user[count].bio}</p></Link>
					        <p>
					          <Button bsStyle='success' onClick={this.likeHandler.bind(this, user[count])}>L i k e  !</Button>
					          <Button bsStyle='warning' onClick={this.sweipHandler.bind(this)}>Sweip</Button>
					        </p>
					      </Thumbnail>
					    </Col>
					    <Col xs={2} md={2}>
					    </Col>
					    </Row>
					  </Grid>
					</div>
			);
	}
	}
};

export default Radium(Home);
