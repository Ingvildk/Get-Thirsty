import Radium from 'radium';
import React from 'react';
import Router from 'react-router';
import ReactBootstrap from 'react-bootstrap';
import ReactRouterBootstrap from 'react-router-bootstrap';
import Profile from './Profile';
import userStore from '../../stores/UserStore';
import matchAction from '../../actions/MatchAction';
import matchStore from '../../stores/MatchStore';
import userAction from '../../actions/UserActions';
import chatStore from '../../stores/ChatStore';
import _ from 'lodash';

var { Route, DefaultRoute, RouteHandler, Link } = Router;
var { Input, Grid, Row, Col, Button, Thumbnail, Glyphicon } = ReactBootstrap;
var {NavItemLink, ButtonLink, ListGroupItemLink} = ReactRouterBootstrap;

class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state =
			chatStore.getState();
	}

	componentWillMount() {
		var newArray = [];
		var chat = this.state.chat;
		var userId = this.context.router.getCurrentParams().userId;
		console.log('THIS IS THE ID INSIDE Chat');
		console.log(userId);
		var correctUser = _.filter(chat, function(element){
				return userId == element.id;
			});
		newArray = _.sortBy(correctUser, function(num) {
			return num.date;
		});
		this.setState({
			correctArray: newArray
		});
		}

	onSubmit(e) {
		e.preventDefault();
		var message = this.refs.userInput.getValue();
		var user = this.state.correctArray[0];
		console.log(user.name);
        var dict = {};
        dict['name'] = user.name;
        dict['message'] = message;
        dict['id'] = user.id;
		if (message) {
			matchAction.addChat(dict);
			var newDict = this.state.correctArray.concat([dict]);
			this.setState({
				correctArray: newDict
			});
		}

	}

	render() {
		var _class;
		var super_class;
		var count = 0;
		var user = this.state.correctArray;
		var messages = user.map(function(dict, index) {
					count = count + 1;
					if (dict.name == 'Ali') {
						_class = 'messageText';
						super_class = 'bubble';
					}else {
						_class = 'rightText';
						super_class='bubble_alternative';
					}
					return (
						<div>
						  <div>
						  <div className={_class}>
						  	<div className='rightImage'>
						    <p className={super_class}>{dict.message}</p>
						 	</div>
						  </div>
						  </div>
						  </div>
						);
					})


        if (_.isEmpty(user)) {
            return <p>Nothing to see here.</p>
        } else {
            user = user[0];
        }

		return(
		    <div className='message'>
                <Grid>
                    <Row>
                        <Col xs={6} md={3}>
                            <Thumbnail href='#' alt='171x180' src={"./" + user.img}/>
                        </Col>
                    </Row>
                </Grid>
                {messages}
                <br/>
                    <Input ref='userInput' placeholder= 'Type in message ' type='text' className= 'messageInput'/>
                    <div className='buttonMessage'>
                        <Button
                            onClick= {this.onSubmit.bind(this)}
                            bsStyle='success' className='buttonMessage_two'>
                            <Glyphicon glyph='send' />
                        </Button>
                    </div>
				</div>
			);
	}
};
Chat.contextTypes = {
    router: React.PropTypes.func.isRequired
  };
  export default Radium(Chat);
