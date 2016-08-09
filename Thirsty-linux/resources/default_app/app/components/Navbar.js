import 'babel/polyfill';

import React from 'react';
import Router from 'react-router';
var { Route, DefaultRoute, RouteHandler, Link } = Router;

import ReactBootstrap from 'react-bootstrap';
var { Navbar, NavItem, DropdownButton, MenuItem, Nav } = ReactBootstrap;

import ReactRouterBootstrap from 'react-router-bootstrap';
var {NavItemLink, ButtonLink, ListGroupItemLink} = ReactRouterBootstrap;
import Radium from 'radium';

class NavBar extends React.Component {
	render() {
		return (
              <Navbar brand='tinder'  inverse toggleNavKey={0}>
              	<Nav right eventKey={0}>
              		<NavItemLink to='home' eventKey={1} href='#'>Home</NavItemLink>
              		<NavItemLink to='match' eventKey={2} href='#'>Match</NavItemLink>
              	</Nav>
 			  </Navbar>
			);
	}   
};
  export default Radium(NavBar);