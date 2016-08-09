import _ from 'lodash';

import React from 'react';
import Radium from 'radium'
import mui from 'material-ui';
import Message from './Message';

var {List, MenuItem, IconMenu, Avatar, ListItem, ListDivider} = mui;
var Colors = mui.Styles.Colors;

let styles = {
    list: {
        overflowY: "auto",
        height: "80vh",
        maxHeight: "80vh",
        minHeight: "80vh"
    }
};


class Messages extends React.Component {

    render() {

        var person = this.props.person;

        if (_.isUndefined(person)) {
            return (
                <div id="messages" style={[styles.list]}>
                    <p>Messages!</p>
                </div>
            )
        }


        var messages = person.messages.map((message) => {
            return <Message key={message._id} person={person} message={message}/>
        });


        return (
            <div id="messages" style={[styles.list]}>
                {messages}
            </div>
        );
    }

}

export default Radium(Messages);
