import 'babel/polyfill';

import React from 'react';
import Router from 'react-router';
import ReactBootstrap from 'react-bootstrap';
import ReactRouterBootstrap from 'react-router-bootstrap';
import Profile from './Profile';
import Chat from './Chat';
import matchStore from '../../stores/MatchStore';
import chatStore from '../../stores/ChatStore';
import Radium from 'radium';

var { Route, DefaultRoute, RouteHandler, Link } = Router;
var { Input, Grid, Row, Col, Button, Thumbnail } = ReactBootstrap;
var {NavItemLink, ButtonLink, ListGroupItemLink} = ReactRouterBootstrap;

class Match extends React.Component {
	constructor(props) {
		super(props);
		this.state = matchStore.getState();
	}
	componentWillMount() {
		var TESTING = chatStore.getState();
	}

	render() {
		if( this.state.match.length == 0 ) {
			return (<p>You currently have no matches. Start searching now! </p>);
		} else {
			var count = 0;
			var match = this.state.match.map(function(dict, index) {
				count++;
				console.log('THIS IS THE USER ID');
				console.log(dict.id);
				return(

						<div className='Col'>
							<div><img className='photo' src={"./" + dict.img} /></div>
							<div className='text'><b><p>{dict.name}</p></b>
							<p className='text_two'>{dict.bio}</p>
							<Link to ='chat' params={{userId: dict.id}}><Button bsStyle='success' className='Button'>Chat</Button></Link>
							</div>
						</div>

					);
				})
			return(
				<div>
					{match}
				</div>
				);
			}
		}
	};
  export default Radium(Match);
