import _ from 'lodash';

import React from 'react';
import Radium from 'radium';
import Router from 'react-router';
import mui from 'material-ui';

var {Link} = Router;

var {List, MenuItem, IconMenu, Avatar, ListItem, ListDivider} = mui;
var ContentSend = require('material-ui/lib/svg-icons/content/inbox');
var Colors = mui.Styles.Colors;

/* This makes the list scrollable */
let styles = {
   list: {
        overflowY: "auto",
        height: "65vh",
        minHeight: "65vh",
        maxHeight: "65vh",
    }
};



class ChatList extends React.Component {

    constructor(props) {
        //props are an object {users: undefined, children: none}
        super(props);
        this.click = this.click.bind(this);
    }

    componentWillMount() {
    }

    click(matchId) {
        this.context.router.transitionTo(`/match/${matchId}`);
    }

    render() {

        var users = this.props.users;
        var account = this.props.account;

        // users are a list of objects. Objects like the one on the board.
        // _id: string, person (object), participants: array string numer,
        // messages: array of objects which conatins data of each info given
        if (_.isEmpty(users)) {
            return (
                <p> No matches </p>
            );
        }


        var items = users.map((user) => {

            var id = user._id;
            var messages = _.filter(user.messages,
                    message => account.profile._id != message.from);

            var message = _.last(messages);
            var lastMessage, time;

            if (!_.isUndefined(message)) {
                lastMessage = message.message;
                time = moment(message.sent_date).fromNow();
            }

            return (
                <div key={id} >
                    <ListItem
                            leftAvatar={
                                    <Avatar src={user.person.photos[0].url} />
                            }
                            primaryText={user.person.name}
                            onClick={this.click.bind(this, id)}
                            secondaryText={
                                <p>
                                <span style={{color: Colors.darkBlack}}><em> {lastMessage} </em> </span><br/>
                                <span style={{color: Colors.darkBlack}}><em> {time} </em> </span><br/>
                                </p>

                            }
                            secondaryTextLines={2}
                        />
                    <ListDivider inset={true} />
                </div>
            );
        });

        return (
            <List subheader="Your matches" className="MaxChatList">
                <div style={[styles.list]}>
                    {items}
                </div>
            </List>
        );

    }
}
ChatList.contextTypes = {router: React.PropTypes.func.isRequired}
export default Radium(ChatList);
