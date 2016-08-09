import 'babel/polyfill';

import React from 'react';
import Router from 'react-router';
import ReactBootstrap from 'react-bootstrap';
import ReactRouterBootstrap from 'react-router-bootstrap';
import userStore from '../../stores/UserStore';

import Radium from 'radium';
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var { Input, Grid, Row, Col, Button, Thumbnail } = ReactBootstrap;
var {NavItemLink, ButtonLink, ListGroupItemLink} = ReactRouterBootstrap;
var styles = {};

class Profile extends React.Component {
	constructor() {
		super();
		this.state = userStore.getState();
	}
	componentDidMount() {
		var id = this.context.router.getCurrentParams().id;
		this.setState({id: id});
	}
	render() {
		var user = this.state.user;
		var user_id = this.state.id;
		for (var el in user) {
			if (user[el].id == user_id) {
				return (
				<div className='profile'>
				<Link to='home'><Button>Back</Button></Link>
				  <Grid>
				  	<br/>
				    <Row>
				    <Col xs={2} md={3}>
				    </Col>
				    <Col xs={8} md={7}>
				      <Thumbnail src={user[el].img} alt='450x350'>
				        <p className='name'><b>{user[el].name}</b></p>
				        <p>{user[el].bio} </p>
				      </Thumbnail>
				    </Col>
				    <Col xs={2} md={2}>
				    </Col>
				    </Row>
					  <Row>
					  <Col xs={6} md={3}>
					    <Thumbnail href='#' alt='171x180' src={user[el].img} />
					  </Col>
					  <Col xs={6} md={3}>
					    <Thumbnail href='#' alt='171x180' src={user[el].img} />
					  </Col>
					  <Col xs={6} md={3}>
					    <Thumbnail href='#' alt='171x180' src={user[el].img} />
					  </Col>
					  <Col xs={6} md={3}>
					    <Thumbnail href='#' alt='171x180' src={user[el].img} />
					  </Col>
					  </Row>
				  </Grid>
				</div>
				);
				}}
				return (<p> An Error Occured. Please try agaain</p>);
		}
	};

Profile.contextTypes = {
    router: React.PropTypes.func.isRequired
  };
  export default Radium(Profile);
